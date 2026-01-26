import { Profile, KnightProfile } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { 
  User, 
  Heart, 
  Book, 
  Home,
  Activity,
  Star,
  Settings
} from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
}

interface TabItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const tabs: TabItem[] = [
  { id: "basic", icon: <User className="h-4 w-4" />, label: "Basic Info" },
  { id: "spiritual", icon: <Book className="h-4 w-4" />, label: "Spiritual" },
  { id: "lifestyle", icon: <Home className="h-4 w-4" />, label: "Lifestyle" },
  { id: "physical", icon: <Activity className="h-4 w-4" />, label: "Physical" },
  { id: "interests", icon: <Star className="h-4 w-4" />, label: "Interests" },
  { id: "preferences", icon: <Heart className="h-4 w-4" />, label: "Preferences" },
];

export function ProfileCard({ profile }: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const isKnight = profile.type === 'knight';
  const knightProfile = profile as KnightProfile;

  return (
    <Card className="w-full max-w-4xl border-2 border-slate-200 shadow-lg pb-28 md:pb-0">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-medieval">{profile.name}</CardTitle>
            <CardDescription>
              {profile.race} • {profile.age} years • {profile.location}
            </CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {profile.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="fixed bottom-16 left-0 right-0 z-10 bg-white border-t md:relative md:bottom-auto md:border-t-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex justify-center px-4 sm:px-0">
                <TabsList className="inline-flex h-14 items-center justify-center space-x-2 rounded-none bg-transparent p-0">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="inline-flex items-center justify-center space-x-2 rounded-lg px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {tab.icon}
                      <span className="hidden md:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>

          <div className="mt-6">
            <TabsContent value="basic" className="mt-0">
              <div className="space-y-4">
                {/* Profile Image */}
                {profile.profile_image && (
                  <>
                    {/* Mobile circular image */}
                    <div className="block md:hidden w-full mb-4">
                      <div className="mx-auto w-32 h-32 rounded-full border-2 border-border relative">
                        <Image
                          src={profile.profile_image}
                          alt={`${profile.name}'s profile`}
                          fill
                          className="rounded-full object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                    </div>
                    {/* Desktop full image */}
                    <div className="hidden md:block relative w-full h-[400px] mb-4 transition-all duration-300">
                      <Image
                        src={profile.profile_image}
                        alt={`${profile.name}'s profile`}
                        fill
                        className="object-cover rounded-lg"
                        priority
                        unoptimized
                      />
                    </div>
                  </>
                )}
                {/* Bio */}
                {profile.bio && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">About Me</h4>
                    <p className="text-sm text-slate-600">{profile.bio}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="spiritual" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Church</h4>
                    <p className="text-sm text-slate-600">{profile.church}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Denomination</h4>
                    <p className="text-sm text-slate-600">{profile.denomination}</p>
                  </div>
                </div>
                {profile.traditional_values && (
                  <div>
                    <h4 className="font-semibold mb-2">Traditional Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.traditional_values.map((value, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="physical" className="mt-0">
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Physical Attributes</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    {[profile.height, profile.body_type].filter(Boolean).join(" • ")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.eye_color && (
                      <Badge variant="secondary" className="text-xs">
                        {profile.eye_color} eyes
                      </Badge>
                    )}
                    {profile.hair_color && (
                      <Badge variant="secondary" className="text-xs">
                        {profile.hair_color} hair
                      </Badge>
                    )}
                    {profile.distinctive_features && (
                      <Badge variant="secondary" className="text-xs">
                        {profile.distinctive_features}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interests" className="mt-0">
              <div className="space-y-6">
                {profile.interests && (
                  <div>
                    <h4 className="font-semibold mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {profile.skills && (
                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lifestyle" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isKnight && (
                  <>
                    {knightProfile.alcohol_consumption && (
                      <div>
                        <h4 className="font-semibold mb-2">Alcohol Consumption</h4>
                        <p className="text-sm text-slate-600">{knightProfile.alcohol_consumption}</p>
                      </div>
                    )}
                    {knightProfile.drug_usage && (
                      <div>
                        <h4 className="font-semibold mb-2">Drug Usage</h4>
                        <p className="text-sm text-slate-600">{knightProfile.drug_usage}</p>
                      </div>
                    )}
                  </>
                )}
                {profile.family_goals && (
                  <div>
                    <h4 className="font-semibold mb-2">Family Goals</h4>
                    <p className="text-sm text-slate-600">{profile.family_goals}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add preferences content here */}
                <div className="text-sm text-slate-600">
                  Preferences section coming soon...
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}