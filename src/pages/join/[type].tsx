import React, { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { createProfile } from "@/lib/supabase";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiGriffinShield, GiBroadsword, GiTiara } from "react-icons/gi";
import KnightQuestionnaire from "@/components/KnightQuestionnaire";
import { LadyQuestionnaire } from "@/components/LadyQuestionnaire";
import { PatriarchQuestionnaire } from "@/components/PatriarchQuestionnaire";

export default function JoinType() {
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not authenticated, redirect to auth page
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);
  const { type } = router.query;
  const [knightData, setKnightData] = useState<any>(null);
  const [patriarchData, setPatriarchData] = useState<any>(null);

  const getProfileInfo = () => {
    switch (type) {
      case "lady":
        return {
          title: "Lady",
          icon: <GiTiara className="w-8 h-8" />,
          description: "Create your profile and let noble knights pursue you"
        };
      case "knight":
        return {
          title: "Knight",
          icon: <GiBroadsword className="w-8 h-8" />,
          description: "Create your profile and pursue noble ladies with honor"
        };
      case "patriarch":
        return {
          title: "Patriarch",
          icon: <GiGriffinShield className="w-8 h-8" />,
          description: "Create a profile to guide your kin toward noble unions"
        };
      default:
        return {
          title: "",
          icon: null,
          description: ""
        };
    }
  };

  const { title, icon, description } = getProfileInfo();

  const knightFormRef = useRef<any>(null);

  const [ladyData, setLadyData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Form submission started");
    console.log("Type:", type);
    console.log("Lady Data:", ladyData);
    console.log("Knight Data:", knightData);
    
    try {
      let profileData;
      
      if (type === 'knight' && knightData) {
        // Validate required fields for knight profile
        if (!knightData.first_name || !knightData.last_name || !knightData.race || !knightData.age || 
            !knightData.location || !knightData.church || !knightData.denomination || !knightData.height ||
            !knightData.baptized || !knightData.virtue_status || !knightData.physical_appearance_importance || 
            !knightData.piercings || !knightData.marital_headship || !knightData.work_preference ||
            !knightData.pornography_consumption || !knightData.knight_career) {
          alert('Please fill in all required fields including first name, last name, race, age, location, church, denomination, height, baptism status, virtue status, physical appearance importance, piercings status, marital headship beliefs, work preference, pornography consumption status, and career');
          return;
        }

        // Include all required fields for knight profiles
        profileData = {
          first_name: knightData.first_name,
          last_name: knightData.last_name,
          race: knightData.race,
          age: knightData.age,
          location: knightData.location,
          church: knightData.church,
          denomination: knightData.denomination,
          height: knightData.height,
          profile_image: knightData.profile_image || '',
          body_type: knightData.body_type || '',
          hair_color: knightData.hair_color || '',
          eye_color: knightData.eye_color || '',
          distinctive_features: knightData.distinctive_features || '',
          type: 'knight',
          bio: knightData.bio || '',
          college_education: knightData.college_education || false,
          skills: Array.isArray(knightData.skills) ? knightData.skills : [],
          interests: Array.isArray(knightData.interests) ? knightData.interests : [],
          traditional_values: Array.isArray(knightData.traditional_values) ? knightData.traditional_values : [],
          baptized: knightData.baptized,
          virtue_status: knightData.virtue_status,
          physical_appearance_importance: knightData.physical_appearance_importance,
          piercings: knightData.piercings,
          tattoos: knightData.tattoos || 'No',
          drug_usage: knightData.drug_usage || 'No, never',
          alcohol_consumption: knightData.alcohol_consumption,
          smoking_status: knightData.smoking_status,
          father_relationship: knightData.father_relationship || '',
          mother_relationship: knightData.mother_relationship || '',
          sons_count: knightData.sons_count || 0,
          daughters_count: knightData.daughters_count || 0,
          brothers_count: knightData.brothers_count || 0,
          sisters_count: knightData.sisters_count || 0,
          pets: knightData.pets || '',
          family_goals: knightData.family_goals || '',
          wedding_ceremony_preference: knightData.wedding_ceremony_preference || '',
          divorce_beliefs: knightData.divorce_beliefs || '',
          marital_headship: knightData.marital_headship,
          work_preference: knightData.work_preference,
          pornography_consumption: knightData.pornography_consumption,
          knight_career: knightData.knight_career,
          wife_lastname_preference: knightData.wife_lastname_preference
        };
      } else if (type === 'patriarch' && patriarchData) {
        // For patriarch, validate required fields
        if (!patriarchData.first_name || !patriarchData.last_name || !patriarchData.location || 
            !patriarchData.church || !patriarchData.denomination || !patriarchData.hair_color || !patriarchData.eye_color ||
            !patriarchData.race || !patriarchData.age || !patriarchData.college_education || !patriarchData.profile_image) {
          alert('Please fill in all required fields including race, age, hair color, eye color, college education status, and profile image');
          return;
        }
        
        profileData = {
          first_name: patriarchData.first_name,
          last_name: patriarchData.last_name,
          location: patriarchData.location,
          church: patriarchData.church,
          denomination: patriarchData.denomination,
          denomination_preference: patriarchData.denomination_preference,
          bio: patriarchData.bio || '',
          hair_color: patriarchData.hair_color,
          eye_color: patriarchData.eye_color,
          race: patriarchData.race,
          age: patriarchData.age,
          college_education: patriarchData.college_education,
          type: 'patriarch' as const,
          traditional_values: Array.isArray(patriarchData.traditional_values) ? patriarchData.traditional_values : [],
          skills: Array.isArray(patriarchData.skills) ? patriarchData.skills : [],
          interests: Array.isArray(patriarchData.interests) ? patriarchData.interests : [],
          profile_image: patriarchData.profile_image,
          dowry: patriarchData.dowry || 'none',
          desired_qualities: patriarchData.desired_qualities || null,
          preferred_age_range: patriarchData.preferred_age_range || null,
          career_preference: patriarchData.career_preference || null,
          education_preference: patriarchData.education_preference || null,
          courtship_involvement: patriarchData.courtship_involvement || null
        };
      } else if (type === 'lady' && ladyData) {
        // Ensure all required fields are present
        if (!ladyData.first_name || !ladyData.last_name || !ladyData.race || !ladyData.age || !ladyData.church || 
            !ladyData.denomination || !ladyData.location || !ladyData.wears_dresses ||
            !ladyData.physical_appearance_importance || !ladyData.homemaker_importance ||
            !ladyData.homeschooling_preference || !ladyData.baptized || !ladyData.marital_headship ||
            !ladyData.work_preference || !ladyData.daycare_preference || !ladyData.chastity_preference) {
          alert('Please fill in all required fields');
          return;
        }
        
        profileData = {
          ...ladyData,
          type: 'lady',
          profile_image: ladyData.profile_image,
          skills: Array.isArray(ladyData.skills) ? ladyData.skills : [],
          interests: Array.isArray(ladyData.interests) ? ladyData.interests : [],
          traditional_values: Array.isArray(ladyData.traditional_values) ? ladyData.traditional_values : [],
          // Lady-specific fields
          brothers_count: parseInt(ladyData.brothers_count, 10),
          sisters_count: parseInt(ladyData.sisters_count, 10),
          sons_count: parseInt(ladyData.sons_count, 10),
          daughters_count: parseInt(ladyData.daughters_count, 10),
          wears_dresses: ladyData.wears_dresses,
          enjoys_cooking_cleaning: ladyData.enjoys_cooking_cleaning,
          physical_appearance_importance: ladyData.physical_appearance_importance,
          homemaker_importance: ladyData.homemaker_importance,
          homeschooling_preference: ladyData.homeschooling_preference,
          baptized: ladyData.baptized,
          marital_headship: ladyData.marital_headship,
          work_preference: ladyData.work_preference,
          modesty_importance: ladyData.modesty_importance,
          divorce_beliefs: ladyData.divorce_beliefs,
          daycare_preference: ladyData.daycare_preference,
          provider_importance: ladyData.provider_importance,
          smoking_status: ladyData.smoking_status,
          chastity_preference: ladyData.chastity_preference,
          // Common fields that might be present
          bio: ladyData.bio || '',
          height: ladyData.height || '',
          body_type: ladyData.body_type || '',
          eye_color: ladyData.eye_color || '',
          hair_color: ladyData.hair_color || '',
          piercings: ladyData.piercings || 'No',
          tattoos: ladyData.tattoos || 'No',
          drug_usage: ladyData.drug_usage || 'No, never',
          alcohol_consumption: ladyData.alcohol_consumption || 'No, never',
          virtue_status: ladyData.virtue_status || 'Yes, my virtue is unclaimed',
          family_goals: ladyData.family_goals || ''
        };
      }

      if (!profileData) {
        alert('Please fill in all required fields');
        return;
      }

      console.log('Submitting profile data:', profileData);
      
      const newProfile = await createProfile(profileData);
      if (newProfile) {
        router.push('/profiles');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('There was an error creating your profile. Please try again.');
    }
  };



  if (!title) return null;

  return (
    <>
      <Head>
        <title>{title} Registration | Courtingly</title>
        <meta name="description" content={`Register as a ${title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                {icon}
              </div>
              <h1 className="text-2xl font-bold mb-2">Join as a {title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {type === 'lady' ? (
                  <LadyQuestionnaire onSubmit={setLadyData} />
                ) : type === 'knight' ? (
                  <KnightQuestionnaire onSubmit={setKnightData} />
                ) : type === 'patriarch' ? (
                  <PatriarchQuestionnaire onSubmit={setPatriarchData} />
                ) : null}
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Join the Realm
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </>
  );
}