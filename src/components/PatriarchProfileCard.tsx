import { Profile } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaChildren, FaCrown } from "react-icons/fa6";
import { GiBroadsword, GiBookshelf, GiScales, GiTemplarShield, GiLaurels, GiGriffinSymbol, GiShepherdsCrook, GiOpenTreasureChest, GiStarsStack, GiCalendar, GiChurch, GiScrollQuill } from "react-icons/gi";
import { LiaCrossSolid } from "react-icons/lia";
import { IoIosBriefcase } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface PatriarchProfileCardProps {
  profile: Profile;
  showMessageButton?: boolean;
}

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: FaUser,
  },
  {
    id: "values",
    label: "Marriage",
    icon: GiTemplarShield,
  },
  {
    id: "suitor",
    label: "Suitor",
    icon: GiBroadsword,
  },
];

export function PatriarchProfileCard({ profile, showMessageButton = false }: PatriarchProfileCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 sm:pb-0">
      <div className="sticky top-0 z-10 bg-white border-b mb-4">
        <div className="flex justify-center overflow-x-auto py-2 px-4 scrollbar-none">
          <ToggleGroup
            type="single"
            value={activeTab}
            onValueChange={(value) => value && setActiveTab(value)}
            className="border rounded-lg p-1 flex-nowrap mx-auto"
          >
            {TABS.map((tab) => (
              <ToggleGroupItem 
                key={tab.id} 
                value={tab.id} 
                aria-label={tab.label}
                className="whitespace-nowrap px-3 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <Card className="w-full border-2 border-slate-200 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image section - Full width on mobile, half on desktop */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              {profile.profile_image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative w-full aspect-[4/3] sm:aspect-square lg:h-[400px] bg-slate-100 rounded-lg cursor-pointer transition-transform hover:scale-[1.02]">
                      <Image
                        src={profile.profile_image}
                        alt={`${profile.first_name}'s profile`}
                        fill
                        className="object-contain rounded-lg"
                        priority
                        unoptimized
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
                    <div className="relative w-full h-[80vh]">
                      <Image
                        src={profile.profile_image}
                        alt={`${profile.first_name}'s profile`}
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {/* Content section */}
            <div className="flex-grow">
              {/* Family name header */}
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-medieval font-bold text-slate-600 mb-4">
                <GiLaurels className="h-6 w-6 sm:h-8 sm:w-8" />
                <h1>The {profile.last_name} Family</h1>
                <GiLaurels className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              
              {showMessageButton && (
                <Button 
                  className="w-full mb-4"
                  onClick={() => router.push(`/messages/${profile.id}`)}
                >
                  Send Message
                </Button>
              )}

              {/* Tabbed content */}
              <div className="min-h-[200px]">
                {activeTab === "overview" && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-semibold mb-1">Family Details</h4>
                          <div className="mb-4">
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <GiGriffinSymbol className="h-5 w-5 mt-0.5 flex-shrink-0" />
                              <span>
                                <span className="font-semibold">Patriarch: </span>
                                {profile.first_name}
                              </span>
                            </p>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-slate-600 flex items-start gap-2">
                              <LiaCrossSolid className="h-5 w-5 mt-0.5 flex-shrink-0" />
                              <span>
                                <span className="font-semibold">Church: </span>
                                {profile.church} • {profile.denomination}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {profile.bio && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiScrollQuill className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Family Summary: </span>
                              {profile.bio}
                            </span>
                          </p>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-1">Daughter Details</h4>
                        <p className="text-slate-600 text-sm">
                          {profile.race} • {profile.age} years • {profile.location}
                        </p>
                      </div>
                    </div>

                    <div>
                      {profile.marital_headship && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <FaCrown className="h-5 w-5" />
                            <span>{profile.marital_headship}</span>
                          </p>
                        </div>
                      )}

                      {profile.homeschooling_preference && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <GiBookshelf className="h-5 w-5" />
                            <span>{profile.homeschooling_preference}</span>
                          </p>
                        </div>
                      )}

                      {profile.divorce_beliefs && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <GiScales className="h-5 w-5" />
                            <span>{profile.divorce_beliefs}</span>
                          </p>
                        </div>
                      )}

                      {profile.traditional_values && profile.traditional_values.length > 0 && (
                        <div>
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
                  </div>
                )}

                {activeTab === "values" && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 className="font-semibold mb-2">Marriage Preferences</h3>
                      
                      {profile.courtship_involvement && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiShepherdsCrook className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Courtship: </span>
                              {profile.courtship_involvement}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.dowry && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiOpenTreasureChest className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Dowry: </span>
                              {profile.dowry}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "suitor" && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <div>
                      <h3 className="font-semibold mb-2">Suitor Requirements</h3>

                      {profile.preferred_age_range && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiCalendar className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Preferred Age: </span>
                              {profile.preferred_age_range}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.career_preference && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <IoIosBriefcase className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Career: </span>
                              {profile.career_preference}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.education_preference && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <IoSchool className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Education: </span>
                              {profile.education_preference}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.desired_qualities && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiStarsStack className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Desired Qualities: </span>
                              {profile.desired_qualities}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.denomination_preference && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 flex items-start gap-2">
                            <GiChurch className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>
                              <span className="font-semibold">Denomination: </span>
                              {profile.denomination_preference}
                            </span>
                          </p>
                        </div>
                      )}

                      {profile.suitor_requirements && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600">{profile.suitor_requirements}</p>
                        </div>
                      )}

                      {profile.suitor_values && profile.suitor_values.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-1">Expected Values</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.suitor_values.map((value, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}