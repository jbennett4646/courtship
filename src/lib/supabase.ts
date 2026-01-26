import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: 'https://www.courtingly.love/auth/confirm'
  }
});

export type BaseProfile = {
  id: string;
  created_at: string;
  type: 'knight' | 'lady' | 'patriarch';
};

export type LadyProfile = BaseProfile & {
  type: 'lady';
  bio?: string;
  profile_image?: string;
  height?: string;
  body_type?: string;
  eye_color?: string;
  hair_color?: string;
  brothers_count?: number;
  sisters_count?: number;
  sons_count?: number;
  daughters_count?: number;
  pets?: string;
  father_relationship?: string;
  mother_relationship?: string;
  smoking_status?: 'Never smoked cigarettes' | 'Smoked cigarettes in the past' | 'Smoke cigarettes';
  chastity_preference?: string;
  baptized?: 'Yes' | 'No';
  wears_dresses?: 'I like wearing dresses and skirts' | 'I don\'t like wearing dresses and skirts';
  modesty_importance?: 'Modesty is central to my clothing choices' | 'Modesty doesn\'t significantly influence how I dress';
  enjoys_cooking_cleaning?: 'Yes' | 'No' | 'I am willing to learn';
  physical_appearance_importance?: 'Very important' | 'Important' | 'Somewhat important' | 'Not important';
  homemaker_importance?: 'Very important' | 'Somewhat important' | 'Not important';
  homeschooling_preference?: 'Yes' | 'No' | 'I am willing to learn';
  marital_headship?: string;
  work_preference?: "I believe a woman's primary calling is to care for her home and family, and I prefer not to work outside the home" | "I am open to working outside the home if it supports my family or husband's leadership" | "I believe women should have the freedom to pursue a career or work outside the home as they choose";
  divorce_beliefs?: string;
  piercings?: 'Yes, ears only' | 'Yes, multiple' | 'No';
  tattoos?: 'Yes, visible' | 'Yes, hidden' | 'No';
  drug_usage?: 'No, never' | 'No, but I have in the past' | 'Yes, occasionally' | 'Yes, frequently';
  alcohol_consumption?: 'No, never' | 'No, but I have in the past' | 'Yes, socially' | 'Yes, regularly';
  virtue_status?: 'Yes, my virtue is unclaimed' | 'My virtue has been shared with 1–2 others' | 'My virtue has been shared with more than 3 others';
  wife_lastname_preference?: "Taking husband's last name" | "Hyphenating last name with husband's last name";

  family_goals?: 'Large family (4+ children)' | 'Medium family (2-3 children)' | 'Small family (1-2 children)' | 'Open to God\'s plan';
  daycare_preference?: "No, I believe a mother should personally care for her children at home, as this is her primary calling, with trusted family members stepping in to assist occasionally as needed." | "Yes, I believe daycare can be used in moderation to balance my career, as long as my children's needs remain my top priority.";
  pregnancy?: 'Yes' | 'No';
  wedding_ceremony_preference?: "I intend to have a religious wedding ceremony in a church before God" | "I prefer a civil ceremony without religious elements";
  provider_importance?: 'Very important' | 'Important' | 'Somewhat important' | 'Not important';
  college_education?: "Yes, I have completed college" | "Yes, I am currently attending college" | "No, but I plan to attend college" | "No, and I do not plan to attend college";
  skills?: string[];
  interests?: string[];
  traditional_values?: string[];
};

export type KnightProfile = BaseProfile & {
  type: 'knight';
  bio?: string;
  profile_image?: string;
  skills?: string[];
  interests?: string[];
  traditional_values?: string[];
  height: string;
  body_type?: string;
  eye_color?: string;
  hair_color?: string;
  distinctive_features?: string;
  family_goals?: string;
  pets?: string;
  virtue_status?: 'Yes, my virtue is unclaimed' | 'My virtue has been shared with 1–2 others' | 'My virtue has been shared with more than 3 others';
  baptized?: 'Yes' | 'No';
  alcohol_consumption?: 'No, never' | 'No, but I have in the past' | 'Yes, socially' | 'Yes, regularly';
  smoking_status?: 'Never smoked cigarettes' | 'Smoked cigarettes in the past' | 'Smoke cigarettes';
  piercings?: 'Yes, ears only' | 'Yes, multiple' | 'No';
  physical_appearance_importance?: 'Very important' | 'Important' | 'Somewhat important' | 'Not important';
  race: string;
  age: string;
  drug_usage?: 'No, never' | 'No, but I have in the past' | 'Yes, occasionally' | 'Yes, frequently';
  tattoos?: 'Yes, visible' | 'Yes, hidden' | 'No';
  pornography_consumption?: 'No, I have never consumed pornography' | 'No, but I have in the past and repented' | 'Yes, but I am actively working to stop' | 'Yes, I currently struggle with pornography';
  sons_count?: number;
  daughters_count?: number;
  father_relationship?: string;
  mother_relationship?: string;
  location: string;
  church: string;
  denomination: string;
  college_education?: "Yes, I have completed college" | "Yes, I am currently attending college" | "No, but I plan to attend college" | "No, and I do not plan to attend college";
  wedding_ceremony_preference?: "I intend to have a religious wedding ceremony in a church before God" | "I prefer a civil ceremony without religious elements";
  divorce_beliefs?: string;
  marital_headship?: string;
  work_preference?: "I believe in being the primary provider for my family" | "I support shared financial responsibilities with my wife working outside the home" | "I am open to my wife being the primary breadwinner";
  knight_career?: string;
  wife_lastname_preference?: "Yes, I expect my wife to take my last name" | "I am open to hyphenation";
};

export type PatriarchProfile = BaseProfile & {
  type: 'patriarch';
  first_name: string;
  last_name: string;
  location: string;
  church: string;
  denomination: string;
  denomination_preference?: "Strict denomination alignment required" | "Prefer denomination alignment but open to other Christian denominations" | "No denominational alignment requirement";
  bio?: string;
  hair_color: string;
  eye_color: string;
  race: string;
  age: string;
  college_education?: "Yes, I have completed college" | "Yes, I am currently attending college" | "No, but I plan to attend college" | "No, and I do not plan to attend college";
  traditional_values?: string[];
  skills?: string[];
  interests?: string[];
  profile_image?: string;
  dowry?: string;
  desired_qualities?: string;
  preferred_age_range?: string;
  career_preference?: "Suitor must excel in a prestigious career" | "A stable job or career is essential" | "A willingness to work hard and provide";
  education_preference?: "College education is required for potential suitors" | "College education is preferred but not required" | "College education is not a determining factor";
  courtship_involvement?: "Direct oversight of every courtship stage" | "Active involvement with meetings" | "Moderate involvement with regular updates";
};

export type Profile = LadyProfile | KnightProfile | PatriarchProfile;

// Profile management functions
export const createProfile = async (profile: any) => {
  try {
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User must be authenticated to create a profile');
    }

    // Use the authenticated user's ID as the profile ID
    const profileWithUserId = {
      ...profile,
      id: user.id
    };
    // Handle patriarch profiles
    if (profile.type === 'patriarch') {
      console.log('Creating patriarch profile:', profile);
      
      if (!profile.first_name || !profile.last_name || !profile.location) {
        throw new Error('Missing required patriarch fields');
      }

      const patriarchProfile = {
        id: user.id,
        type: profile.type,
        first_name: profile.first_name,
        last_name: profile.last_name,
        location: profile.location,
        church: profile.church,
        denomination: profile.denomination,
        denomination_preference: profile.denomination_preference || null,
        bio: profile.bio || '',
        hair_color: profile.hair_color,
        eye_color: profile.eye_color,
        race: profile.race,
        age: profile.age,
        college_education: profile.college_education || null,
        traditional_values: Array.isArray(profile.traditional_values) ? profile.traditional_values : [],
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        interests: Array.isArray(profile.interests) ? profile.interests : [],
        profile_image: profile.profile_image || null,
        dowry: profile.dowry || null,
        desired_qualities: profile.desired_qualities || null,
        preferred_age_range: profile.preferred_age_range || null,
        career_preference: profile.career_preference || null,
        education_preference: profile.education_preference || null,
        courtship_involvement: profile.courtship_involvement || null
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert([patriarchProfile])
        .select('*');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return data?.[0];
    }

    // Handle different profile types
    let formattedProfile;
    
    if (profile.type === 'knight') {
      if (!profile.first_name || !profile.last_name || !profile.race || !profile.age || !profile.denomination || !profile.height) {
        throw new Error('Missing required knight fields: first name, last name, race, age, denomination, and height are required');
      }

      const knightProfile = {
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        race: profile.race,
        age: profile.age,
        type: profile.type,
        location: profile.location || '',
        church: profile.church || '',
        denomination: profile.denomination,
        height: profile.height,
        profile_image: profile.profile_image || null,
        bio: profile.bio || '',
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        interests: Array.isArray(profile.interests) ? profile.interests : [],
        traditional_values: Array.isArray(profile.traditional_values) ? profile.traditional_values : [],
        body_type: profile.body_type || null,
        hair_color: profile.hair_color || null,
        eye_color: profile.eye_color || null,
        distinctive_features: profile.distinctive_features || null,
        family_goals: profile.family_goals || null,
        pets: profile.pets || null,
        virtue_status: profile.virtue_status || null,
        baptized: profile.baptized || null,
        alcohol_consumption: profile.alcohol_consumption || null,
        smoking_status: profile.smoking_status || null,
        piercings: profile.piercings || null,
        drug_usage: profile.drug_usage || null,
        tattoos: profile.tattoos || null,
        pornography_consumption: profile.pornography_consumption || null,
        sons_count: typeof profile.sons_count === 'string' ? parseInt(profile.sons_count, 10) : profile.sons_count || 0,
        daughters_count: typeof profile.daughters_count === 'string' ? parseInt(profile.daughters_count, 10) : profile.daughters_count || 0,
        brothers_count: typeof profile.brothers_count === 'string' ? parseInt(profile.brothers_count, 10) : profile.brothers_count || 0,
        sisters_count: typeof profile.sisters_count === 'string' ? parseInt(profile.sisters_count, 10) : profile.sisters_count || 0,
        father_relationship: profile.father_relationship || null,
        mother_relationship: profile.mother_relationship || null,
        college_education: profile.college_education || null,
        physical_appearance_importance: profile.physical_appearance_importance || null,
        wedding_ceremony_preference: profile.wedding_ceremony_preference || null,
        divorce_beliefs: profile.divorce_beliefs || null,
        marital_headship: profile.marital_headship || null,
        work_preference: profile.work_preference || null,
        knight_career: profile.knight_career || null,
        wife_lastname_preference: profile.wife_lastname_preference || null
      };

      return await supabase
        .from('profiles')
        .insert([knightProfile])
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase error:', error);
            throw error;
          }
          return data?.[0];
        });
    } else {
      // For other profile types, include all the necessary fields
      const baseProfile = {
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        race: profile.race,
        age: profile.age,
        church: profile.church,
        denomination: profile.denomination,
        location: profile.location,
        type: profile.type,
        height: profile.height || null,
        body_type: profile.bodyType || null,
        eye_color: profile.eyeColor || null,
        hair_color: profile.hair_color || null,
        drug_usage: profile.drug_usage || null,
        profile_image: profile.profile_image || null
      };

      formattedProfile = {
        ...baseProfile,
        body_type: profile.body_type || profile.bodyType || '',
        eye_color: profile.eye_color || profile.eyeColor || '',
        piercings: profile.piercings || 'No',
        tattoos: profile.tattoos || 'No',
        drug_usage: profile.drug_usage || 'No, never',
        alcohol_consumption: profile.alcohol_consumption || 'No, never',
        virtue_status: profile.virtue_status || 'Yes, my virtue is unclaimed',
        family_goals: profile.family_goals || '',
        distinctive_features: profile.distinctive_features || '',
        bio: profile.bio || '',
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        interests: Array.isArray(profile.interests) ? profile.interests : [],
        traditional_values: Array.isArray(profile.traditional_values) ? profile.traditional_values : [],
        ...(profile.type === 'lady' ? {
          baptized: (profile as LadyProfile).baptized,
          wears_dresses: (profile as LadyProfile).wears_dresses,
          modesty_importance: (profile as LadyProfile).modesty_importance,
          enjoys_cooking_cleaning: (profile as LadyProfile).enjoys_cooking_cleaning,
          physical_appearance_importance: (profile as LadyProfile).physical_appearance_importance,
          homemaker_importance: (profile as LadyProfile).homemaker_importance,
          homeschooling_preference: (profile as LadyProfile).homeschooling_preference,
          marital_headship: (profile as LadyProfile).marital_headship,
          work_preference: (profile as LadyProfile).work_preference,
          divorce_beliefs: (profile as LadyProfile).divorce_beliefs,
          daycare_preference: (profile as LadyProfile).daycare_preference,
          pregnancy: (profile as LadyProfile).pregnancy,
          wedding_ceremony_preference: (profile as LadyProfile).wedding_ceremony_preference,
          provider_importance: (profile as LadyProfile).provider_importance,
          college_education: (profile as LadyProfile).college_education,
          smoking_status: (profile as LadyProfile).smoking_status,
          chastity_preference: (profile as LadyProfile).chastity_preference,
          brothers_count: profile.brothers_count !== undefined && profile.brothers_count !== '' ? parseInt(String(profile.brothers_count), 10) : null,
          sisters_count: profile.sisters_count !== undefined && profile.sisters_count !== '' ? parseInt(String(profile.sisters_count), 10) : null,
          sons_count: profile.sons_count !== undefined && profile.sons_count !== '' ? parseInt(String(profile.sons_count), 10) : null,
          daughters_count: profile.daughters_count !== undefined && profile.daughters_count !== '' ? parseInt(String(profile.daughters_count), 10) : null,
          father_relationship: (profile as any).father_relationship || null,
          mother_relationship: (profile as any).mother_relationship || null,
          pets: (profile as any).pets || null,
          wife_lastname_preference: (profile as LadyProfile).wife_lastname_preference || null,
        } : {})
      };
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([formattedProfile])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    return data?.[0];
  } catch (error) {
    console.error('Error in createProfile:', error);
    throw error;
  }
};

export const getProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
  return data as Profile[];
};

export const getProfilesByType = async (type: 'knight' | 'lady') => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('type', type);

  if (error) {
    console.error('Error fetching profiles by type:', error);
    throw error;
  }
  return data as Profile[];
};

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProfile = async (id: string) => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};