import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { LadyProfileCard } from "@/components/LadyProfileCard";
import { PatriarchProfileCard } from "@/components/PatriarchProfileCard";
import { KnightProfileCard } from "@/components/KnightProfileCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GiLockedHeart } from "react-icons/gi";
import { getProfiles, type Profile } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ProfileFilters,
  EMPTY_FILTERS,
  matchesFilters,
  type ProfileFilterState,
  type TargetType,
} from "@/components/ProfileFilters";

type FilterType = "knight" | "lady" | "patriarch" | "my-profile";

export default function Profiles() {
  const [filter, setFilter] = useState<FilterType | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<FilterType | null>(null);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProfileFilterState>(EMPTY_FILTERS);

  useEffect(() => {
    const fetchUserAndProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError("Please sign in to view profiles");
          return;
        }

        setCurrentUserId(user.id);

        // Get user's profile type
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('type')
          .eq('id', user.id)
          .single();

        if (!userProfile) {
          setError("Please complete your profile to view others");
          return;
        }

        if (userProfile) {
          setUserType(userProfile.type as FilterType);
          
          // Set initial filter based on user type
          if (!filter) {
            if (userProfile.type === 'knight') {
              setFilter('lady');
            } else if (userProfile.type === 'lady') {
              setFilter('knight');
            } else if (userProfile.type === 'patriarch') {
              setFilter('knight');
            }
          }
        }

        // Fetch all profiles
        const data = await getProfiles();
        if (data) {
          setProfiles(data);
        }
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProfiles();

    // Add visibility change listener
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUserAndProfiles();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [filter]);

  // The profile type currently being browsed (drives which filters apply).
  const targetType: TargetType | null =
    filter === 'my-profile' || !filter
      ? null
      : userType === 'knight'
      ? (filter as TargetType)
      : 'knight';

  // Filter profiles based on user type and selected filter
  const filteredProfiles = profiles.filter(profile => {
    if (!userType || !filter || !currentUserId) return false;

    // Show only current user's profile when "my-profile" is selected
    if (filter === 'my-profile') {
      return profile.id === currentUserId;
    }

    // Role-based visibility
    let visible = false;
    if (userType === 'knight') {
      // Knights can view ladies and patriarchs
      visible = profile.type === filter && (filter === 'lady' || filter === 'patriarch');
    } else if (userType === 'lady') {
      // Ladies can only view knights
      visible = profile.type === 'knight';
    } else if (userType === 'patriarch') {
      // Patriarchs can only view knights
      visible = profile.type === 'knight';
    }
    if (!visible) return false;

    // Apply the basics filters (age, location, race, height, body type)
    return matchesFilters(profile, filters);
  });

  // Reset current profile index when filtered profiles change
  useEffect(() => {
    if (currentProfileIndex >= filteredProfiles.length) {
      setCurrentProfileIndex(0);
    }
  }, [filteredProfiles.length, currentProfileIndex]);

  // Clear filters when the toggle changes, since some options (e.g. body type)
  // are specific to the type of profile being viewed.
  useEffect(() => {
    setFilters(EMPTY_FILTERS);
  }, [filter]);

  const renderToggleGroup = () => {
    if (!userType) return null;

    // Base toggle items that all users see
    const baseItems = [
      <ToggleGroupItem key="my-profile" value="my-profile" aria-label="Show my profile">
        My Profile
      </ToggleGroupItem>
    ];

    // Add role-specific toggle items
    if (userType === 'knight') {
      baseItems.push(
        <ToggleGroupItem key="lady" value="lady" aria-label="Show ladies only">
          Fair Ladies
        </ToggleGroupItem>,
        <ToggleGroupItem key="patriarch" value="patriarch" aria-label="Show patriarchs only">
          Patriarchs
        </ToggleGroupItem>
      );
    } else {
      // Ladies and Patriarchs only see knights
      baseItems.push(
        <ToggleGroupItem key="knight" value="knight" aria-label="Show knights only">
          Honorable Knights
        </ToggleGroupItem>
      );
    }

    return (
      <ToggleGroup
        type="single"
        value={filter || undefined}
        onValueChange={(value) => {
          if (value) setFilter(value as FilterType);
        }}
        className="border rounded-lg p-1 inline-flex justify-center"
      >
        {baseItems}
      </ToggleGroup>
    );
  };

  const handlePrevProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentProfileIndex((prev) => 
      prev > 0 ? prev - 1 : filteredProfiles.length - 1
    );
  };

  const handleNextProfile = () => {
    if (filteredProfiles.length === 0) return;
    setCurrentProfileIndex((prev) => 
      prev < filteredProfiles.length - 1 ? prev + 1 : 0
    );
  };

  const renderProfile = (profile: Profile, isOwnProfile: boolean) => {
    if (!profile) return null;

    switch (profile.type) {
      case 'lady':
        return <LadyProfileCard key={profile.id} profile={profile} showMessageButton={!isOwnProfile} />;
      case 'patriarch':
        return <PatriarchProfileCard key={profile.id} profile={profile} showMessageButton={!isOwnProfile} />;
      case 'knight':
        return <KnightProfileCard key={profile.id} profile={profile} showMessageButton={!isOwnProfile} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Courtingly</title>
        <meta name="description" content="Browse noble knights and fair ladies seeking traditional relationships" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Noble Souls Seeking Connection</h1>
          
          {userType && (
            <div className="flex justify-center mb-8">
              {renderToggleGroup()}
            </div>
          )}

          {userType && targetType && !loading && !error && (
            <ProfileFilters
              targetType={targetType}
              filters={filters}
              onChange={setFilters}
            />
          )}

          {loading && (
            <div className="text-center py-8">
              <p className="text-lg">Loading profiles...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <GiLockedHeart className="w-32 h-32 text-rose-500" />
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && filteredProfiles.length === 0 && userType && (
            <div className="text-center py-8">
              <p className="text-lg">No profiles found</p>
            </div>
          )}

          {!loading && !error && filteredProfiles.length > 0 && (
            <>
              {/* Desktop View */}
              <div className="hidden md:flex flex-col gap-8">
                <div className="grid gap-8">
                  {renderProfile(
                    filteredProfiles[currentProfileIndex],
                    filteredProfiles[currentProfileIndex]?.id === currentUserId
                  )}
                </div>
                
                {/* Desktop Navigation */}
                <div className="flex justify-center items-center gap-4 py-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevProfile}
                    className="h-10 w-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <span className="text-sm font-medium">
                    {currentProfileIndex + 1} / {filteredProfiles.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextProfile}
                    className="h-10 w-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="relative pb-32">
                  {renderProfile(
                    filteredProfiles[currentProfileIndex],
                    filteredProfiles[currentProfileIndex]?.id === currentUserId
                  )}

                  {/* Fixed Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4">
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevProfile}
                        className="h-10 w-10"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <span className="text-sm font-medium">
                        {currentProfileIndex + 1} / {filteredProfiles.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextProfile}
                        className="h-10 w-10"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
