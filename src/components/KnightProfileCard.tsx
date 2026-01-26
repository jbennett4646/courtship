import { Profile } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { FaUser, FaHome, FaPills } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { FiSunrise } from "react-icons/fi";
import { GiWineBottle, GiLinkedRings, GiWaterSplash, GiCigarette, GiBigDiamondRing, GiPeaceDove, GiStairsCake, GiStrong, GiScales, GiBookshelf, GiVacuumCleaner, GiFemaleLegs, GiBookCover } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { GiKeyLock } from "react-icons/gi";
import { IoIosLock, IoMdFemale, IoIosBriefcase } from "react-icons/io";
import { FaShieldHeart, FaUsers, FaChildren, FaCrown } from "react-icons/fa6";
import { MdOutlineMale, MdOutlineCrib, MdOutlinePets } from "react-icons/md";
import { RiInkBottleFill } from "react-icons/ri";

import { FaRunning } from "react-icons/fa";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface KnightProfileCardProps {
  profile: Profile;
  showMessageButton?: boolean;
}

const TABS = [
  {
    id: "basics",
    label: "Overview",
    icon: FaUser,
  },
  {
    id: "values",
    label: "Values",
    icon: FaShieldHeart,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    icon: FiSunrise,
  },
  {
    id: "family",
    label: "Family",
    icon: FaHome,
  },
  {
    id: "marriage",
    label: "Marriage",
    icon: GiBigDiamondRing,
  },
];

export function KnightProfileCard({ profile, showMessageButton = false }: KnightProfileCardProps) {
  const [activeTab, setActiveTab] = useState("basics");
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

      <Card className="w-full border-2 border-slate-200 shadow-lg mt-4">
        <CardContent className="p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-6">
            {/* Left column with constant info */}
            <div className="space-y-4">
              {profile.profile_image && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative md:aspect-[4/3] lg:aspect-[3/4] lg:h-[400px] cursor-pointer transition-transform hover:scale-[1.02]">
                      {/* Mobile circular container */}
                      <div className="md:hidden w-32 h-32 mx-auto relative border-2 border-border rounded-full overflow-hidden">
                        <Image
                          src={profile.profile_image}
                          alt={`${profile.name}'s profile`}
                          fill
                          className="object-cover"
                          priority
                          unoptimized
                        />
                      </div>
                      {/* Desktop rectangular container */}
                      <div className="hidden md:block relative w-full h-full">
                        <Image
                          src={profile.profile_image}
                          alt={`${profile.name}'s profile`}
                          fill
                          className="object-cover rounded-lg"
                          priority
                          unoptimized
                        />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
                    <DialogTitle className="sr-only">Profile Image</DialogTitle>
                    <div className="relative w-full h-[80vh]">
                      <Image
                        src={profile.profile_image}
                        alt={`${profile.name}'s profile`}
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div>
                <h2 className="text-xl font-medieval mb-1">
                  <span>{profile.first_name}</span>{" "}
                  <span>{profile.last_name}</span>
                </h2>
                <p className="text-slate-600 text-sm">
                  {profile.race} • {profile.age} years • {profile.location}
                </p>
              </div>
              {profile.bio && (
                <p className="text-sm text-slate-600 italic">{profile.bio}</p>
              )}
              {showMessageButton && (
                <Button 
                  className="w-full"
                  onClick={() => router.push(`/messages/${profile.id}`)}
                >
                  Send Message
                </Button>
              )}
            </div>

            {/* Right column with tabbed content */}
            <div className="min-h-[400px]">
              {activeTab === "basics" && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Church Details</h4>
                      <p className="text-sm text-slate-600">{profile.church} • {profile.denomination}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Physical Attributes</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        {profile.height} • {profile.body_type}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.hair_color && (
                          <Badge variant="outline" className="text-xs">{profile.hair_color} hair</Badge>
                        )}
                        {profile.eye_color && (
                          <Badge variant="outline" className="text-xs">{profile.eye_color} eyes</Badge>
                        )}
                        {profile.distinctive_features && (
                          <Badge variant="outline" className="text-xs">{profile.distinctive_features}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {profile.knight_career && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-1">Occupation and Career</h4>
                        <p className="text-sm text-slate-600">{profile.knight_career}</p>
                      </div>
                    )}
                    {profile.college_education && (
                      <div>
                        <h4 className="font-semibold mb-1">College Education</h4>
                        <p className="text-sm text-slate-600">{profile.college_education}</p>
                      </div>
                    )}
                  </div>

                  {profile.traditional_values && profile.traditional_values.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-1">Traditional Values</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.traditional_values.map((value, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.skills && profile.skills.length > 0 && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.interests && profile.interests.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-1">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "values" && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="font-semibold mb-1">Values</h3>
                    
                    {profile.baptized === "I have been baptized" && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiWaterSplash className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Baptized Status: </span>
                            {profile.baptized}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.virtue_status === "My virtue is unclaimed" && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiKeyLock className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Virtue Status: </span>
                            {profile.virtue_status}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.chastity_preference && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <IoIosLock className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Chastity Commitment: </span>
                            {profile.chastity_preference}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.provider_importance && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiStrong className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Provider Role: </span>
                            {profile.provider_importance}
                          </div>
                        </div>
                      </div>
                    )}

                    {profile.homeschooling_preference && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiBookshelf className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Homeschooling View: </span>
                            {profile.homeschooling_preference}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "lifestyle" && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="font-semibold mb-1">Personal Lifestyle</h3>

                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <FaRunning className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Physique: </span>
                          {profile.physical_appearance_importance || "Not provided"}
                        </div>
                      </div>
                    </div>
                    {profile.piercings && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiLinkedRings className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Piercings: </span>
                            {profile.piercings}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.alcohol_consumption && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiWineBottle className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Alcohol: </span>
                            {profile.alcohol_consumption}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.smoking_status && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiCigarette className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Cigarettes: </span>
                            {profile.smoking_status}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.drug_usage && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <FaPills className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Drugs: </span>
                            {profile.drug_usage}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.tattoos && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <RiInkBottleFill className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Tattoos: </span>
                            {profile.tattoos}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.pornography_consumption && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <GiFemaleLegs className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Pornography: </span>
                            {profile.pornography_consumption}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "family" && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="font-semibold mb-1">Current Family</h3>
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <MdOutlineMale className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Father Relationship: </span>
                          {profile.father_relationship || "Not specified"}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <IoMdFemale className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Mother Relationship: </span>
                          {profile.mother_relationship || "Not specified"}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <FaUsers className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Siblings: </span>
                          {profile.brothers_count ?? "No"} {profile.brothers_count === 1 ? "brother" : "brothers"} • {profile.sisters_count ?? "No"} {profile.sisters_count === 1 ? "sister" : "sisters"}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <FaChildren className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Children: </span>
                          {profile.sons_count ?? "0"} {profile.sons_count === 1 ? "son" : "sons"} • {profile.daughters_count ?? "0"} {profile.daughters_count === 1 ? "daughter" : "daughters"}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <MdOutlinePets className="h-6 w-6 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold">Pets: </span>
                          {profile.pets || "Not provided"}
                        </div>
                      </div>
                    </div>

                    {profile.family_goals && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-1">Family Goals</h4>
                        <div className="flex items-start gap-2">
                          <MdFamilyRestroom className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Family Size: </span>
                            {profile.family_goals}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.daycare_preference && (
                      <div className="mb-4">
                        <div className="flex items-start gap-2">
                          <MdOutlineCrib className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Daycare View: </span>
                            {profile.daycare_preference}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "marriage" && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Marriage Views</h3>
                      <div className="space-y-4">
                        {profile.wedding_ceremony_preference && (
                          <div className="flex items-start gap-2">
                            <GiStairsCake className="h-6 w-6 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-600">
                              <span className="font-semibold">Ceremony Preference: </span>
                              {profile.wedding_ceremony_preference}
                            </div>
                          </div>
                        )}
                        {profile.wife_lastname_preference && (
                          <div className="flex items-start gap-2">
                            <GiBookCover className="h-6 w-6 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-600">
                              <span className="font-semibold">Last Name Preference: </span>
                              {profile.wife_lastname_preference}
                            </div>
                          </div>
                        )}
                        {profile.marital_headship && (
                          <div className="flex items-start gap-2">
                            <FaCrown className="h-6 w-6 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-slate-600">
                              <span className="font-semibold">Headship: </span>
                              {profile.marital_headship}
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <IoIosBriefcase className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Work Preference: </span>
                            {profile.work_preference || "Not provided"}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <GiScales className="h-6 w-6 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-600">
                            <span className="font-semibold">Divorce Beliefs: </span>
                            {profile.divorce_beliefs || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}