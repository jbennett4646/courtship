import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ImageUpload } from '@/components/ImageUpload';
import { DeleteProfileDialog } from '@/components/DeleteProfileDialog';

const TRADITIONAL_VALUES_OPTIONS = [
  "Male leadership in household",
  "Protection of feminine virtue",
  "Provider for the family",
  "Defender of faith and home",
  "Upholding biblical hierarchy",
  "Honor through integrity",
  "Sacrificial love for wife and children",
  "Commitment to legacy",
  "Courage in decision-making",
  "Stewardship of resources",
  "Discipline and self-control",
  "Mentorship of sons",
  "Guidance of household in faith",
  "Dedication to hard work",
  "Strength through humility",
  "Responsibility for family's spiritual growth",
  "Fidelity in marriage",
  "Readiness to defend",
  "Respect for tradition",
  "Visionary leadership",
  "Respect for elders",
  "Accountability to God"
] as const;

const LADY_DISTINCTIVE_FEATURES = [
  "Gentle smile",
  "Soft voice",
  "Clear skin",
  "Slender neckline",
  "Full lips",
  "Delicate hands",
  "Long legs",
  "Smooth contours"
] as const;

const KNIGHT_DISTINCTIVE_FEATURES = [
  "Beard",
  "Chiseled jawline",
  "Broad shoulders",
  "Strong brow ridge",
  "Square chin",
  "Defined cheekbones",
  "Muscular build",
  "Veined forearms",
  "Tapered torso (V-shaped)",
  "6-pack",
  "Strong grip"
] as const;

const LADY_TRADITIONAL_VALUES_OPTIONS = [
  "Chastity and purity",
  "Commitment to legacy building",
  "Community service",
  "Dedication to moral integrity",
  "Devotion to faith and family",
  "Diligence in household management",
  "Focus on raising children",
  "Family-centered lifestyle",
  "Graceful demeanor",
  "Homemaking as a vocation",
  "Hospitality",
  "Modest dress",
  "Nurturing and caregiving",
  "Obedience to biblical principles",
  "Quiet spirit",
  "Respect for hierarchy",
  "Sacrificial love",
  "Submission with faith",
  "Support for a husband's leadership",
  "Traditional marriage roles"
] as const;

const KNIGHT_SKILLS_OPTIONS = [
  "Leadership",
  "Strategic thinking",
  "Physical strength",
  "Craftsmanship",
  "Musical ability",
  "Public speaking",
  "Teaching",
  "Problem-solving",
  "Mentoring",
  "Athletic prowess"
] as const;

const KNIGHT_INTERESTS_OPTIONS = [
  "Bible study",
  "Church ministry",
  "Outdoor activities",
  "Sports",
  "Reading",
  "Music",
  "Travel",
  "Community service",
  "Family activities",
  "Fitness"
] as const;

const LADY_SKILLS_OPTIONS = [
  "Animal Husbandry",
  "Basic Nursing Care",
  "Beekeeping",
  "Candle Making",
  "Caregiving for Elders",
  "Childcare",
  "Cooking and Baking",
  "Floral Arrangement",
  "Gardening and Cultivation",
  "Homemaking",
  "Homeschooling",
  "Household Budgeting",
  "Interior Decoration",
  "Pottery and Ceramics",
  "Preservation and Canning",
  "Quilting",
  "Sewing and Embroidery",
  "Singing",
  "Soap Making"
] as const;

const INTERESTS_OPTIONS = [
  "Bible Study",
  "Coffee",
  "Cooking and Baking",
  "Dancing",
  "Family Traditions",
  "Gardening and Cultivation",
  "Home Decorating",
  "Homemaking",
  "Hosting Gatherings",
  "Journaling",
  "Motherhood",
  "Reading",
  "Seasonal Decorating",
  "Shopping",
  "Singing",
  "Tea"
] as const;

export default function SettingsNew() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
            <div className="mt-4">
              <Label className="text-sm font-medium">Profile Type</Label>
              <div 
                className="mt-1.5 px-3 py-2 bg-muted rounded-md text-muted-foreground cursor-not-allowed select-none capitalize"
                title="Profile type cannot be changed"
              >
                {profile?.type || 'Unknown'}
              </div>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={profile?.first_name || ''}
                      placeholder="Your first name"
                      onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={profile?.last_name || ''}
                      placeholder="Your last name"
                      onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="race">Race</Label>
                    <Select
                      value={profile?.race || ''}
                      onValueChange={(value) => setProfile({ ...profile, race: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select race" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Hispanic">Hispanic</SelectItem>
                        <SelectItem value="Asian">Asian</SelectItem>
                        <SelectItem value="Mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={profile?.age || ''}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      placeholder="Your age"
                      type="number"
                      min="18"
                      max="99"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2 mb-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile?.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Your location (e.g., City, State)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="church">Church</Label>
                  <Input
                    id="church"
                    value={profile?.church || ''}
                    onChange={(e) => setProfile({ ...profile, church: e.target.value })}
                    placeholder="Your church"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="denomination">Denomination</Label>
                  <Select
                    value={profile?.denomination || ''}
                    onValueChange={(value) => setProfile({ ...profile, denomination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select denomination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baptist">Baptist</SelectItem>
                      <SelectItem value="Catholic">Catholic</SelectItem>
                      <SelectItem value="Lutheran">Lutheran</SelectItem>
                      <SelectItem value="Presbyterian">Presbyterian</SelectItem>
                      <SelectItem value="Eastern Orthodox">Eastern Orthodox</SelectItem>
                      <SelectItem value="Pentecostal">Pentecostal</SelectItem>
                      <SelectItem value="Non-Denominational">Non-Denominational</SelectItem>
                      <SelectItem value="Methodist">Methodist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {profile?.type === 'patriarch' && (
                <>
                  <h2 className="text-2xl font-bold mt-6 mb-4">Daughter</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="race">Race</Label>
                      <Select
                        value={profile?.race || ''}
                        onValueChange={(value) => setProfile({ ...profile, race: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select race" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="White">White</SelectItem>
                          <SelectItem value="Black">Black</SelectItem>
                          <SelectItem value="Hispanic">Hispanic</SelectItem>
                          <SelectItem value="Asian">Asian</SelectItem>
                          <SelectItem value="Mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={profile?.age || ''}
                        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                        placeholder="Your daughter's age"
                        type="number"
                        min="18"
                        max="99"
                      />
                    </div>
                  </div>
                </>
              )}

              {(profile?.type === 'knight' || profile?.type === 'lady') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Select
                      value={profile?.height || ''}
                      onValueChange={(value) => setProfile({ ...profile, height: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your height" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Below 5'0",
                          "5'0",
                          "5'1",
                          "5'2",
                          "5'3",
                          "5'4",
                          "5'5",
                          "5'6",
                          "5'7",
                          "5'8",
                          "5'9",
                          "5'10",
                          "5'11",
                          "6'0",
                          "Above 6'0"
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body_type">Body Type</Label>
                    <Select
                      value={profile?.body_type || ''}
                      onValueChange={(value) => setProfile({ ...profile, body_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Athletic and strong">Athletic and strong</SelectItem>
                        <SelectItem value="Broad-shouldered and fit">Broad-shouldered and fit</SelectItem>
                        <SelectItem value="Graceful and feminine">Graceful and feminine</SelectItem>
                        <SelectItem value="Petite and elegant">Petite and elegant</SelectItem>
                        <SelectItem value="Tall and athletic">Tall and athletic</SelectItem>
                        <SelectItem value="Average build">Average build</SelectItem>
                        <SelectItem value="Obese">Obese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(profile?.type === 'knight' || profile?.type === 'lady' || profile?.type === 'patriarch') && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="hair_color">Hair Color</Label>
                    <Select
                      value={profile?.hair_color || ''}
                      onValueChange={(value) => setProfile({ ...profile, hair_color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your hair color" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Black",
                          "Brown",
                          "Blonde",
                          "Red",
                          "Gray"
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eye_color">Eye Color</Label>
                    <Select
                      value={profile?.eye_color || ''}
                      onValueChange={(value) => setProfile({ ...profile, eye_color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your eye color" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Amber",
                          "Blue",
                          "Brown",
                          "Gray",
                          "Green",
                          "Hazel"
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(profile?.type === 'knight' || profile?.type === 'lady') && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="distinctive_features">Distinctive Features</Label>
                    <Select
                      value={profile?.distinctive_features || ''}
                      onValueChange={(value) => setProfile({ ...profile, distinctive_features: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your distinctive feature" />
                      </SelectTrigger>
                      <SelectContent>
                        {(profile?.type === 'lady' ? LADY_DISTINCTIVE_FEATURES : KNIGHT_DISTINCTIVE_FEATURES).map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college_education">College Education</Label>
                    <Select
                      value={profile?.college_education || ''}
                      onValueChange={(value) => setProfile({ ...profile, college_education: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your college education status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes, I have completed college">Yes, I have completed college</SelectItem>
                        <SelectItem value="Yes, I am currently attending college">Yes, I am currently attending college</SelectItem>
                        <SelectItem value="No, but I plan to attend college">No, but I plan to attend college</SelectItem>
                        <SelectItem value="No, and I do not plan to attend college">No, and I do not plan to attend college</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {profile?.type === 'patriarch' && (
                <>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="college_education">College Education</Label>
                    <Select
                      value={profile?.college_education || ''}
                      onValueChange={(value) => setProfile({ ...profile, college_education: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your daughter's college education status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes, she has completed college">Yes, she has completed college</SelectItem>
                        <SelectItem value="Yes, she is currently attending college">Yes, she is currently attending college</SelectItem>
                        <SelectItem value="No, but she plans to attend college">No, but she plans to attend college</SelectItem>
                        <SelectItem value="No, and she does not plan to attend college">No, and she does not plan to attend college</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 mt-8">Marriage</h2>
                  <div className="space-y-2">
                    <Label htmlFor="dowry">Dowry</Label>
                    <Select
                      value={profile?.dowry || ''}
                      onValueChange={(value) => setProfile({ ...profile, dowry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dowry arrangement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A substantial dowry, including financial assets or land">A substantial dowry, including financial assets or land</SelectItem>
                        <SelectItem value="Financial provisions will be included">Financial provisions will be included</SelectItem>
                        <SelectItem value="Dowry not included">Dowry not included</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 mt-8">Suitor</h2>
                  <div className="space-y-2">
                    <Label htmlFor="desired_qualities">Desired Qualities in Suitors</Label>
                    <Select
                      value={profile?.desired_qualities || ''}
                      onValueChange={(value) => setProfile({ ...profile, desired_qualities: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select desired qualities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Proven leadership, exceptional character, and the ability to fulfill the role of head of the household">Proven leadership, exceptional character, and the ability to fulfill the role of head of the household</SelectItem>
                        <SelectItem value="Stable career, family-oriented, and tireless work ethic">Stable career, family-oriented, and tireless work ethic</SelectItem>
                        <SelectItem value="Respect for traditional values and commitment to biblical principles">Respect for traditional values and commitment to biblical principles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="preferred_age_range">Preferred Age Range for Suitors</Label>
                    <Select
                      value={profile?.preferred_age_range || ''}
                      onValueChange={(value) => setProfile({ ...profile, preferred_age_range: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20-29 years old">20-29 years old</SelectItem>
                        <SelectItem value="30-35 years old">30-35 years old</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="career_preference">Career Preference for Suitors</Label>
                    <Select
                      value={profile?.career_preference || ''}
                      onValueChange={(value) => setProfile({ ...profile, career_preference: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select career preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Suitor must excel in a prestigious career (e.g., law, medicine, finance)">Suitor must excel in a prestigious career (e.g., law, medicine, finance)</SelectItem>
                        <SelectItem value="A stable job or career is essential">A stable job or career is essential</SelectItem>
                        <SelectItem value="A willingness to work hard and provide">A willingness to work hard and provide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="education_preference">Education Preference for Suitors</Label>
                    <Select
                      value={profile?.education_preference || ''}
                      onValueChange={(value) => setProfile({ ...profile, education_preference: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Advanced degree from a respected institution">Advanced degree from a respected institution</SelectItem>
                        <SelectItem value="College degree is preferred">College degree is preferred</SelectItem>
                        <SelectItem value="No educational requirements">No educational requirements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="denomination_preference">Denomination Preference for Suitors</Label>
                    <Select
                      value={profile?.denomination_preference || ''}
                      onValueChange={(value) => setProfile({ ...profile, denomination_preference: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select denomination preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alignment with our denomination is required">Alignment with our denomination is required</SelectItem>
                        <SelectItem value="Preferable, but other Christian denominations are acceptable">Preferable, but other Christian denominations are acceptable</SelectItem>
                        <SelectItem value="Denomination alignment is not a requirement">Denomination alignment is not a requirement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="courtship_involvement">Courtship Involvement Level</Label>
                    <Select
                      value={profile?.courtship_involvement || ''}
                      onValueChange={(value) => setProfile({ ...profile, courtship_involvement: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your level of involvement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct oversight and approval of every stage of the courtship, including the suitor's initial intentions, family background, and adherence to our family's values">Direct oversight and approval of every stage of the courtship, including the suitor's initial intentions, family background, and adherence to our family's values</SelectItem>
                        <SelectItem value="Active involvement, including meetings with the suitor and his family">Active involvement, including meetings with the suitor and his family</SelectItem>
                        <SelectItem value="Moderate involvement, with regular updates and discussions">Moderate involvement, with regular updates and discussions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile?.bio || ''}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Profile Image</Label>
                    <div className="flex items-center space-x-4">
                      {profile?.profile_image ? (
                        <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-border">
                          <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <ImageUpload
                          onUploadComplete={(url) => {
                            setProfile({ ...profile, profile_image: url });
                            toast({
                              title: 'Success',
                              description: 'Profile image uploaded successfully',
                            });
                          }}
                          onError={(error) => {
                            toast({
                              title: 'Error',
                              description: error.message,
                              variant: 'destructive',
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {profile?.type === 'knight' && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="knight_career">Career</Label>
                  <Input
                    id="knight_career"
                    value={profile?.knight_career || ''}
                    onChange={(e) => setProfile({ ...profile, knight_career: e.target.value })}
                    placeholder="Your career"
                  />
                </div>
              )}

              {(profile?.type === 'knight' || profile?.type === 'lady') && (
                <>
                  <div className="space-y-4 mt-4">
                    <Label>Select your top 3 traditional values ({(profile?.traditional_values || []).length}/3)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {(profile?.type === 'lady' ? LADY_TRADITIONAL_VALUES_OPTIONS : TRADITIONAL_VALUES_OPTIONS).map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <Checkbox
                            checked={(profile?.traditional_values || []).includes(value)}
                            disabled={!(profile?.traditional_values || []).includes(value) && (profile?.traditional_values || []).length >= 3}
                            onCheckedChange={(checked) => {
                              const currentValues = profile?.traditional_values || [];
                              const updatedValues = checked
                                ? [...currentValues, value]
                                : currentValues.filter((v) => v !== value);
                              setProfile({ ...profile, traditional_values: updatedValues });
                            }}
                          />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <Label>Select your top 3 skills ({(profile?.skills || []).length}/3)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {(profile?.type === 'lady' ? LADY_SKILLS_OPTIONS : KNIGHT_SKILLS_OPTIONS).map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            checked={(profile?.skills || []).includes(skill)}
                            disabled={!(profile?.skills || []).includes(skill) && (profile?.skills || []).length >= 3}
                            onCheckedChange={(checked) => {
                              const currentSkills = profile?.skills || [];
                              const updatedSkills = checked
                                ? [...currentSkills, skill]
                                : currentSkills.filter((s) => s !== skill);
                              setProfile({ ...profile, skills: updatedSkills });
                            }}
                          />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <Label>Select your top 3 interests ({(profile?.interests || []).length}/3)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {(profile?.type === 'lady' ? INTERESTS_OPTIONS : KNIGHT_INTERESTS_OPTIONS).map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            checked={(profile?.interests || []).includes(interest)}
                            disabled={!(profile?.interests || []).includes(interest) && (profile?.interests || []).length >= 3}
                            onCheckedChange={(checked) => {
                              const currentInterests = profile?.interests || [];
                              const updatedInterests = checked
                                ? [...currentInterests, interest]
                                : currentInterests.filter((i) => i !== interest);
                              setProfile({ ...profile, interests: updatedInterests });
                            }}
                          />
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {interest}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 mt-8">Values</h2>
                  <div className="space-y-2">
                    <Label htmlFor="baptized">Baptism Status</Label>
                    <Select
                      value={profile?.baptized || ''}
                      onValueChange={(value) => setProfile({ ...profile, baptized: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your baptism status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I have been baptized">I have been baptized</SelectItem>
                        <SelectItem value="I have not been baptized">I have not been baptized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="virtue_status">Virtue Status</Label>
                    <Select
                      value={profile?.virtue_status || ''}
                      onValueChange={(value) => setProfile({ ...profile, virtue_status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your virtue status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="My virtue is unclaimed">My virtue is unclaimed</SelectItem>
                        <SelectItem value="My virtue has been claimed">My virtue has been claimed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {profile?.type === 'lady' && (
                    <>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="chastity_preference">Chastity Preference</Label>
                        <Select
                          value={profile?.chastity_preference || ''}
                          onValueChange={(value) => setProfile({ ...profile, chastity_preference: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your chastity preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Committed to chastity until marriage">Committed to chastity until marriage</SelectItem>
                            <SelectItem value="Sex can be appropriate when committed to marriage">Sex can be appropriate when committed to marriage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="modesty_importance">Modesty Importance</Label>
                        <Select
                          value={profile?.modesty_importance || ''}
                          onValueChange={(value) => setProfile({ ...profile, modesty_importance: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your view on modesty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Modesty is central to my clothing choices">Modesty is central to my clothing choices</SelectItem>
                            <SelectItem value="Modesty doesn't significantly influence how I dress">Modesty doesn't significantly influence how I dress</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="wears_dresses">Dresses/Skirts</Label>
                        <Select
                          value={profile?.wears_dresses || ''}
                          onValueChange={(value) => setProfile({ ...profile, wears_dresses: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I like wearing dresses and skirts">I like wearing dresses and skirts</SelectItem>
                            <SelectItem value="I don't like wearing dresses and skirts">I don't like wearing dresses and skirts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="enjoys_cooking_cleaning">Cooking</Label>
                        <Select
                          value={profile?.enjoys_cooking_cleaning || ''}
                          onValueChange={(value) => setProfile({ ...profile, enjoys_cooking_cleaning: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I like cooking and preparing meals">I like cooking and preparing meals</SelectItem>
                            <SelectItem value="I don't like cooking and preparing meals">I don't like cooking and preparing meals</SelectItem>
                            <SelectItem value="I am willing to learn to cook and prepare meals">I am willing to learn to cook and prepare meals</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="homeschooling_preference">Homeschooling Preference</Label>
                        <Select
                          value={profile?.homeschooling_preference || ''}
                          onValueChange={(value) => setProfile({ ...profile, homeschooling_preference: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your homeschooling preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Very comfortable homeschooling our children">Very comfortable homeschooling our children</SelectItem>
                            <SelectItem value="Not comfortable homeschooling our children">Not comfortable homeschooling our children</SelectItem>
                            <SelectItem value="I'm willing to learn how to homeschool our children">I'm willing to learn how to homeschool our children</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="homemaker_importance">Homemaker Role</Label>
                        <Select
                          value={profile?.homemaker_importance || ''}
                          onValueChange={(value) => setProfile({ ...profile, homemaker_importance: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your view on being a homemaker" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I value being a homemaker and caring for our family">I value being a homemaker and caring for our family</SelectItem>
                            <SelectItem value="I don't see myself in the homemaker role">I don't see myself in the homemaker role</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="provider_importance">Provider Role</Label>
                        <Select
                          value={profile?.provider_importance || ''}
                          onValueChange={(value) => setProfile({ ...profile, provider_importance: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your view on having a provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I value having a provider for our family">I value having a provider for our family</SelectItem>
                            <SelectItem value="I don't see a provider role as necessary">I don't see a provider role as necessary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="pregnancy">Pregnancy History</Label>
                        <Select
                          value={profile?.pregnancy || ''}
                          onValueChange={(value) => setProfile({ ...profile, pregnancy: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your pregnancy history" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Never intentionally ended a pregnancy">Never intentionally ended a pregnancy</SelectItem>
                            <SelectItem value="Have intentionally ended a pregnancy">Have intentionally ended a pregnancy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {profile?.type === 'knight' && (
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="pornography_consumption">Pornography Consumption</Label>
                      <Select
                        value={profile?.pornography_consumption || ''}
                        onValueChange={(value) => setProfile({ ...profile, pornography_consumption: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="I have, but no longer do">I have, but no longer do</SelectItem>
                          <SelectItem value="No, never">No, never</SelectItem>
                          <SelectItem value="Yes, occasionally">Yes, occasionally</SelectItem>
                          <SelectItem value="Yes, frequently">Yes, frequently</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {(profile?.type === 'knight' || profile?.type === 'lady') && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 mt-8">Lifestyle</h2>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="physical_appearance_importance">Physical Appearance Importance</Label>
                          <Select
                            value={profile?.physical_appearance_importance || ''}
                            onValueChange={(value) => setProfile({ ...profile, physical_appearance_importance: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select importance level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Physical appearance and fitness are top priorities for me">Physical appearance and fitness are top priorities for me</SelectItem>
                              <SelectItem value="I value staying fit and healthy">I value staying fit and healthy</SelectItem>
                              <SelectItem value="Physical appearance and fitness are not major priorities in my life">Physical appearance and fitness are not major priorities in my life</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="piercings">Piercings</Label>
                          <Select
                            value={profile?.piercings || ''}
                            onValueChange={(value) => setProfile({ ...profile, piercings: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your piercings status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ears pierced only">Ears pierced only</SelectItem>
                              <SelectItem value="Multiple piercings">Multiple piercings</SelectItem>
                              <SelectItem value="No piercings">No piercings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="alcohol_consumption">Alcohol Consumption</Label>
                          <Select
                            value={profile?.alcohol_consumption || ''}
                            onValueChange={(value) => setProfile({ ...profile, alcohol_consumption: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your alcohol consumption status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Never drank alcohol">Never drank alcohol</SelectItem>
                              <SelectItem value="Drank alcohol in the past">Drank alcohol in the past</SelectItem>
                              <SelectItem value="Drink alcohol socially">Drink alcohol socially</SelectItem>
                              <SelectItem value="Drink alcohol regularly">Drink alcohol regularly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smoking_status">Smoking Status</Label>
                          <Select
                            value={profile?.smoking_status || ''}
                            onValueChange={(value) => setProfile({ ...profile, smoking_status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your smoking status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Never smoked cigarettes">Never smoked cigarettes</SelectItem>
                              <SelectItem value="Smoked cigarettes in the past">Smoked cigarettes in the past</SelectItem>
                              <SelectItem value="Smoke cigarettes">Smoke cigarettes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="drug_usage">Drug Usage</Label>
                          <Select
                            value={profile?.drug_usage || ''}
                            onValueChange={(value) => setProfile({ ...profile, drug_usage: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your drug usage status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Never used drugs">Never used drugs</SelectItem>
                              <SelectItem value="Used drugs in the past">Used drugs in the past</SelectItem>
                              <SelectItem value="Use drugs occasionally">Use drugs occasionally</SelectItem>
                              <SelectItem value="Use drugs regularly">Use drugs regularly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tattoos">Tattoos</Label>
                          <Select
                            value={profile?.tattoos || ''}
                            onValueChange={(value) => setProfile({ ...profile, tattoos: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your tattoo status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes, visible tattoos">Yes, visible tattoos</SelectItem>
                              <SelectItem value="Yes, hidden tattoos">Yes, hidden tattoos</SelectItem>
                              <SelectItem value="No tattoos">No tattoos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold mb-4">Family</h2>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="father_relationship">Relationship with Father</Label>
                          <Select
                            value={profile?.father_relationship || ''}
                            onValueChange={(value) => setProfile({ ...profile, father_relationship: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship with father" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Good and supportive">Good and supportive</SelectItem>
                              <SelectItem value="Difficult or distant">Difficult or distant</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mother_relationship">Relationship with Mother</Label>
                          <Select
                            value={profile?.mother_relationship || ''}
                            onValueChange={(value) => setProfile({ ...profile, mother_relationship: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship with mother" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Good and loving">Good and loving</SelectItem>
                              <SelectItem value="Challenging or strained">Challenging or strained</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="brothers_count">Number of Brothers</Label>
                          <Input
                            id="brothers_count"
                            type="number"
                            min="0"
                            value={profile?.brothers_count || '0'}
                            onChange={(e) => setProfile({ ...profile, brothers_count: e.target.value })}
                            placeholder="Number of brothers"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sisters_count">Number of Sisters</Label>
                          <Input
                            id="sisters_count"
                            type="number"
                            min="0"
                            value={profile?.sisters_count || '0'}
                            onChange={(e) => setProfile({ ...profile, sisters_count: e.target.value })}
                            placeholder="Number of sisters"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="sons_count">Number of Sons</Label>
                          <Input
                            id="sons_count"
                            type="number"
                            min="0"
                            value={profile?.sons_count || '0'}
                            onChange={(e) => setProfile({ ...profile, sons_count: e.target.value })}
                            placeholder="Number of sons"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="daughters_count">Number of Daughters</Label>
                          <Input
                            id="daughters_count"
                            type="number"
                            min="0"
                            value={profile?.daughters_count || '0'}
                            onChange={(e) => setProfile({ ...profile, daughters_count: e.target.value })}
                            placeholder="Number of daughters"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="pets">Pets</Label>
                        <Select
                          value={profile?.pets || ''}
                          onValueChange={(value) => setProfile({ ...profile, pets: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your pet status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I have dogs">I have dogs</SelectItem>
                            <SelectItem value="I have cats">I have cats</SelectItem>
                            <SelectItem value="I have dogs and cats">I have dogs and cats</SelectItem>
                            <SelectItem value="I don't have pets">I don't have pets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="family_goals">Family Goals</Label>
                        <Select
                          value={profile?.family_goals || ''}
                          onValueChange={(value) => setProfile({ ...profile, family_goals: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your family goals" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Large family (4+ children)">Large family (4+ children)</SelectItem>
                            <SelectItem value="Medium family (2-3 children)">Medium family (2-3 children)</SelectItem>
                            <SelectItem value="Small family (1-2 children)">Small family (1-2 children)</SelectItem>
                            <SelectItem value="Open to God's plan">Open to God's plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {profile?.type === 'lady' && (
                        <div className="space-y-2 mb-4">
                          <Label htmlFor="daycare_preference">Daycare Preference</Label>
                          <Select
                            value={profile?.daycare_preference || ''}
                            onValueChange={(value) => setProfile({ ...profile, daycare_preference: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your daycare preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I won't use a daycare and I will personally care for my children at home, as this is a woman's primary calling, with trusted family members stepping in to assist occasionally as needed">I won't use a daycare and I will personally care for my children at home, as this is a woman's primary calling, with trusted family members stepping in to assist occasionally as needed</SelectItem>
                              <SelectItem value="I believe daycare can be used in moderation to balance my career, as long as my children's needs remain my top priority">I believe daycare can be used in moderation to balance my career, as long as my children's needs remain my top priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <h2 className="text-2xl font-bold mb-4">Marriage</h2>
                      <div className="space-y-2">
                        <Label htmlFor="wedding_ceremony_preference">Wedding Ceremony Preference</Label>
                        <Select
                          value={profile?.wedding_ceremony_preference || ''}
                          onValueChange={(value) => setProfile({ ...profile, wedding_ceremony_preference: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your wedding ceremony preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I intend to have a religious wedding ceremony in a church before God">I intend to have a religious wedding ceremony in a church before God</SelectItem>
                            <SelectItem value="I prefer a civil ceremony without religious elements">I prefer a civil ceremony without religious elements</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {profile?.type === 'knight' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="wife_lastname_preference">Wife's Last Name Preference</Label>
                          <Select
                            value={profile?.wife_lastname_preference || ''}
                            onValueChange={(value) => setProfile({ ...profile, wife_lastname_preference: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preference for wife's last name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I expect my wife to take my last name">I expect my wife to take my last name</SelectItem>
                              <SelectItem value="I am open to hyphenation">I am open to hyphenation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {profile?.type === 'lady' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="wife_lastname_preference">Last Name After Marriage</Label>
                          <Select
                            value={profile?.wife_lastname_preference || ''}
                            onValueChange={(value) => setProfile({ ...profile, wife_lastname_preference: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preference for last name after marriage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I will take my husband's last name">I will take my husband's last name</SelectItem>
                              <SelectItem value="I plan to hyphenate my last name with my husband's">I plan to hyphenate my last name with my husband's</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="divorce_beliefs">Views on Divorce</Label>
                        <Select
                          value={profile?.divorce_beliefs || ''}
                          onValueChange={(value) => setProfile({ ...profile, divorce_beliefs: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your view on divorce" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Marriage is eternal; divorce is only acceptable in cases of adultery">Marriage is eternal; divorce is only acceptable in cases of adultery</SelectItem>
                            <SelectItem value="Divorce can be justified if the relationship is no longer fulfilling to me">Divorce can be justified if the relationship is no longer fulfilling to me</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {profile?.type === 'lady' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="work_preference">Views on Working</Label>
                          <Select
                            value={profile?.work_preference || ''}
                            onValueChange={(value) => setProfile({ ...profile, work_preference: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your view on working" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I believe a woman's primary calling is to care for her home and family, and I prefer not to work outside the home">I believe a woman's primary calling is to care for her home and family, and I prefer not to work outside the home</SelectItem>
                              <SelectItem value="I am open to working outside the home if it supports my family or husband's leadership">I am open to working outside the home if it supports my family or husband's leadership</SelectItem>
                              <SelectItem value="I believe women should have the freedom to pursue a career or work outside the home as they choose">I believe women should have the freedom to pursue a career or work outside the home as they choose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {profile?.type === 'knight' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="work_preference">Views on Women Working</Label>
                          <Select
                            value={profile?.work_preference || ''}
                            onValueChange={(value) => setProfile({ ...profile, work_preference: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your view on women working" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I believe a woman's primary calling is to care for her home and family, and I prefer my wife not to work outside the home">I believe a woman's primary calling is to care for her home and family, and I prefer my wife not to work outside the home</SelectItem>
                              <SelectItem value="I am open to my wife working outside the home if it supports our family or my leadership">I am open to my wife working outside the home if it supports our family or my leadership</SelectItem>
                              <SelectItem value="I believe women should have the freedom to pursue a career or work outside the home as they choose">I believe women should have the freedom to pursue a career or work outside the home as they choose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="marital_headship">Views on Marital Headship</Label>
                        <Select
                          value={profile?.marital_headship || ''}
                          onValueChange={(value) => setProfile({ ...profile, marital_headship: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your view on marital headship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="I believe in God's ordained hierarchy: Christ as the head of man, man as the head of woman, and together submitting to Christ's will (1 Corinthians 11:3)">I believe in God's ordained hierarchy: Christ as the head of man, man as the head of woman, and together submitting to Christ's will (1 Corinthians 11:3)</SelectItem>
                            <SelectItem value="Partnership (husband and wife make decisions equally)">Partnership (husband and wife make decisions equally)</SelectItem>
                            <SelectItem value="Matriarchal Leadership (wife as decision-maker)">Matriarchal Leadership (wife as decision-maker)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile?.bio || ''}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label>Profile Image</Label>
                        <div className="flex items-center space-x-4">
                          {profile?.profile_image ? (
                            <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-border">
                              <img
                                src={profile.profile_image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                              <span className="text-muted-foreground">No image</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <ImageUpload
                              onUploadComplete={(url) => {
                                setProfile({ ...profile, profile_image: url });
                                toast({
                                  title: 'Success',
                                  description: 'Profile image uploaded successfully',
                                });
                              }}
                              onError={(error) => {
                                toast({
                                  title: 'Error',
                                  description: error.message,
                                  variant: 'destructive',
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="mt-6">
                <Button 
                  type="submit" 
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const { data: { session } } = await supabase.auth.getSession();
                      if (!session) {
                        throw new Error('No session found');
                      }

                      const { error } = await supabase
                        .from('profiles')
                        .update(profile)
                        .eq('id', session.user.id);

                      if (error) throw error;

                      toast({
                        title: 'Success',
                        description: 'Profile updated successfully',
                      });
                    } catch (error) {
                      console.error('Error updating profile:', error);
                      toast({
                        title: 'Error',
                        description: 'Failed to update profile',
                        variant: 'destructive',
                      });
                    }
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </form>
            <DeleteProfileDialog />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}