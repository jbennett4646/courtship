import React from 'react'
import { ImageUpload } from "./ImageUpload"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const SKILLS_OPTIONS = [
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

const INTERESTS_OPTIONS = [
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

const formSchema = z.object({
  wife_lastname_preference: z.string().min(1, "Please select your preference about wife's last name"),
  knight_career: z.string().min(1, "Please tell us about your career"),
  pornography_consumption: z.string().min(1, "Please select your answer about pornography consumption"),
  bio: z.string()
    .min(1, "Bio is required")
    .max(200, "Bio should not exceed 200 characters"),
  profile_image: z.string().optional(),
  father_relationship: z.string().min(1, "Please select your relationship with your father"),
  mother_relationship: z.string().min(1, "Please select your relationship with your mother"),
  brothers_count: z.string().transform((val) => parseInt(val) || 0),
  sisters_count: z.string().transform((val) => parseInt(val) || 0),
  sons_count: z.string().transform((val) => parseInt(val) || 0),
  daughters_count: z.string().transform((val) => parseInt(val) || 0),
  pets: z.string().min(1, "Please select your pet ownership status"),
  family_goals: z.string().min(1, "Family goals are required"),
  drug_usage: z.string().min(1, "Drug usage information is required"),
  tattoos: z.string().min(1, "Tattoos information is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  type: z.literal("knight").default("knight"),
  race: z.string().min(1, "Race is required"),
  age: z.string().min(1, "Age is required"),
  location: z.string().min(1, "Location is required"),
  church: z.string().min(1, "Church is required"),
  denomination: z.string().min(1, "Denomination is required"),
  height: z.string().min(1, "Height is required"),
  body_type: z.string().min(1, "Body type is required"),
  hair_color: z.string().min(1, "Hair color is required"),
  eye_color: z.string().min(1, "Eye color is required"),
  distinctive_features: z.string().min(1, "Distinctive features are required"),
  college_education: z.string().min(1, "Please select your college education status"),
  traditional_values: z.array(z.string())
    .min(3, "Please select exactly 3 traditional values")
    .max(3, "Please select exactly 3 traditional values"),
  skills: z.array(z.string())
    .min(3, "Please select exactly 3 skills")
    .max(3, "Please select exactly 3 skills"),
  interests: z.array(z.string())
    .min(3, "Please select exactly 3 interests")
    .max(3, "Please select exactly 3 interests"),
  baptized: z.string().min(1, "Please select your baptism status"),
  virtue_status: z.string().min(1, "Please select your virtue status"),
  physical_appearance_importance: z.string().min(1, "Please select how important physical appearance is to you"),
  piercings: z.string().min(1, "Piercings information is required"),
  alcohol_consumption: z.string().min(1, "Please select your alcohol consumption frequency"),
  smoking_status: z.string().min(1, "Please select your smoking status"),
  wedding_ceremony_preference: z.string().min(1, "Please select your wedding ceremony preference"),
  divorce_beliefs: z.string().min(1, "Please select your beliefs about divorce"),
  work_preference: z.string().min(1, "Please select your view on working outside the home"),
  marital_headship: z.string().min(1, "Please select your belief about marital headship"),
})

type QuestionnaireData = z.infer<typeof formSchema>

interface KnightQuestionnaireProps {
  onSubmit: (data: QuestionnaireData) => void;
}

export default function KnightQuestionnaire({ onSubmit }: KnightQuestionnaireProps) {
  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: undefined,
      last_name: undefined,
      type: "knight",
      race: undefined,
      age: undefined,
      location: undefined,
      church: undefined,
      denomination: undefined,
      height: undefined,
      body_type: undefined,
      hair_color: undefined,
      eye_color: undefined,
      distinctive_features: undefined,
      college_education: undefined,
      traditional_values: [],
      skills: [],
      interests: [],
      baptized: undefined,
      virtue_status: undefined,
      physical_appearance_importance: undefined,
      piercings: undefined,
      alcohol_consumption: undefined,
      smoking_status: undefined,
      drug_usage: undefined,
      tattoos: undefined,
      father_relationship: undefined,
      mother_relationship: undefined,
      brothers_count: "0",
      sisters_count: "0",
      sons_count: "0",
      daughters_count: "0"
    }
  })

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (onSubmit) {
        onSubmit(value as QuestionnaireData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <h2 className="text-2xl font-semibold mb-6">Overview</h2>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="race"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your race?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue="" placeholder="Select your race" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "White",
                    "Black",
                    "Hispanic",
                    "Asian",
                    "Mixed"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your age" 
                  min="18" 
                  max="100"
                  {...field} 
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (City, State)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dallas, TX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="church"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your church name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="denomination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your religious denomination?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your denomination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Baptist",
                    "Catholic",
                    "Lutheran",
                    "Presbyterian",
                    "Eastern Orthodox",
                    "Pentecostal",
                    "Non-Denominational",
                    "Methodist"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your height?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your height" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How would you describe your body type?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your body type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Athletic and strong",
                    "Broad-shouldered and fit",
                    "Tall and athletic",
                    "Average build",
                    "Obese"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hair_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your hair color?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your hair color" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eye_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your eye color?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your eye color" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="distinctive_features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your most distinctive feature?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your distinctive feature" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Beard",
                    "Chiseled jawline",
                    "Broad shoulders",
                    "Strong brow ridge",
                    "Square chin",
                    "Defined cheekbones",
                    "Muscular build",
                    "Veined forearms",
                    "Tapered torso (v-shaped)",
                    "6-pack",
                    "Strong grip"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="college_education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you attended college, or do you plan to attend college?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your college education status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Yes, I have completed college",
                    "Yes, I am currently attending college",
                    "No, but I plan to attend college",
                    "No, and I do not plan to attend college"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="knight_career"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What career or occupation have you chosen to establish your legacy?</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Share your career or occupation..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="traditional_values"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your top 3 traditional values ({field.value.length}/3)</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {TRADITIONAL_VALUES_OPTIONS.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(value)}
                      disabled={!field.value?.includes(value) && field.value?.length >= 3}
                      onCheckedChange={(checked) => {
                        const updatedValues = checked
                          ? [...field.value, value]
                          : field.value?.filter((v: string) => v !== value);
                        field.onChange(updatedValues);
                      }}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {value}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your top 3 skills ({field.value.length}/3)</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {SKILLS_OPTIONS.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(skill)}
                      disabled={!field.value?.includes(skill) && field.value?.length >= 3}
                      onCheckedChange={(checked) => {
                        const updatedSkills = checked
                          ? [...field.value, skill]
                          : field.value?.filter((value: string) => value !== skill);
                        field.onChange(updatedSkills);
                      }}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your top 3 interests ({field.value.length}/3)</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {INTERESTS_OPTIONS.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value?.includes(interest)}
                      disabled={!field.value?.includes(interest) && field.value?.length >= 3}
                      onCheckedChange={(checked) => {
                        const updatedInterests = checked
                          ? [...field.value, interest]
                          : field.value?.filter((value: string) => value !== interest);
                        field.onChange(updatedInterests);
                      }}
                    />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl font-semibold mb-4">Values</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            Your profile will only display the values you possess. Any values you do not possess will not be displayed on your profile.
          </p>
        </div>

        <FormField
          control={form.control}
          name="baptized"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you been baptized?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your baptism status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "I have been baptized",
                    "I have not been baptized"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="virtue_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has your virtue been claimed?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your virtue status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "My virtue is unclaimed",
                    "My virtue has been claimed"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pornography_consumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you currently consume pornography?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your consumption status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "I have, but no longer do",
                    "No, never",
                    "Yes, occasionally",
                    "Yes, frequently"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl font-semibold mb-6">Lifestyle</h2>
        <FormField
          control={form.control}
          name="physical_appearance_importance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How important is physical appearance and fitness in your life?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select importance level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Physical appearance and fitness are top priorities for me",
                    "I value staying fit and healthy",
                    "Physical appearance and fitness are not major priorities in my life"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="piercings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have any piercings?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your piercings status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Ears pierced only",
                    "Multiple piercings",
                    "No piercings"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alcohol_consumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How often do you drink alcohol?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your alcohol consumption frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Never drank alcohol",
                    "Drank alcohol in the past",
                    "Drink alcohol socially",
                    "Drink alcohol regularly"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="smoking_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you ever smoked cigarettes?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your smoking status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Never smoked cigarettes",
                    "Smoked cigarettes in the past",
                    "Smoke cigarettes"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drug_usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you ever used drugs?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your drug usage status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Never used drugs",
                    "Used drugs in the past",
                    "Use drugs occasionally",
                    "Use drugs regularly"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tattoos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have any tattoos?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your tattoos status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Yes, visible tattoos",
                    "Yes, hidden tattoos",
                    "No tattoos"
                  ].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl font-semibold mb-6">Family</h2>
        
        <div className="space-y-2 mb-6">
          <FormLabel>How is your relationship with your father and mother today?</FormLabel>
          <div className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name="father_relationship"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-1">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-1">
                          <SelectValue placeholder="Father relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Good and supportive",
                          "Difficult or distant"
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-black whitespace-nowrap">with father</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mother_relationship"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-1">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-1">
                          <SelectValue placeholder="Mother relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Good and loving",
                          "Challenging or strained"
                        ].map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-black whitespace-nowrap">with mother</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <FormLabel>How many siblings do you have?</FormLabel>
            <div className="flex items-center gap-8 mt-2">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="brothers_count"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0 w-24">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-sm">brothers</span>
              </div>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="sisters_count"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0 w-24">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-sm">sisters</span>
              </div>
            </div>
          </div>

          <div>
            <FormLabel>How many children do you have?</FormLabel>
            <div className="flex items-center gap-8 mt-2">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="sons_count"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0 w-24">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-sm">sons</span>
              </div>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="daughters_count"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0 w-24">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          step="1"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-sm">daughters</span>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="pets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have any pets?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your pet ownership status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "I have dogs",
                      "I have cats",
                      "I have dogs and cats",
                      "I don't have pets"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="family_goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your family goals?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your family goals" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Large family (4+ children)",
                      "Medium family (2-3 children)",
                      "Small family (1-2 children)",
                      "Open to God's plan"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-2xl font-semibold mb-6">Marriage</h2>

          <FormField
            control={form.control}
            name="wedding_ceremony_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your intentions for your wedding ceremony?</FormLabel>
                <div className="text-sm text-gray-500 mb-4">
                  Marriage is a sacred covenant witnessed and ordained by God, as Malachi 2:14 reminds us: "The Lord was witness between you and the wife of your youth." A wedding ceremony is an opportunity to honor this divine union in the presence of God, recognizing His central role in joining husband and wife. As Matthew 19:6 affirms, it is "what God has joined together" that creates the bond of marriage. By choosing to marry in a church, the couple acknowledges the importance of gathering in a Holy space where God's presence is promised, as Jesus says in Matthew 18:20: "For where two or three gather in my name, there am I with them." A church wedding not only brings family and community together under God's guidance but also serves as a reverent declaration of faith and commitment to His design for marriage.
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your wedding ceremony preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "I intend to have a religious wedding ceremony in a church before God",
                      "I prefer a civil ceremony without religious elements"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wife_lastname_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you expect your wife to take your last name upon marriage?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preference about last name" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "I expect my wife to take my last name",
                      "I am open to hyphenation"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marital_headship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your belief about marital headship and decision-making?</FormLabel>
                <div className="text-sm text-gray-500 mb-4">
                  Marriage is a sacred covenant modeled after Christ's relationship with the Church, as written in Ephesians 5:24-25: 'Now as the church submits to Christ, so also wives should submit to their husbands in everything. Husbands, love your wives, just as Christ loved the church.'
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your belief about marital headship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "I believe in God's ordained hierarchy: Christ as the head of man, man as the head of woman, and together submitting to Christ's will (1 Corinthians 11:3)",
                      "Partnership (husband and wife make decisions equally)",
                      "Matriarchal Leadership (wife as decision-maker)"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="work_preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your views on your wife working outside the home?</FormLabel>
                <div className="text-sm text-gray-500 mb-4">
                  The Bible teaches that a woman's primary calling is to care for her home and family, reflecting God's design for order and nurture within the household. In Titus 2:4-5, Paul instructs that women should "love their husbands and children, to be self-controlled and pure, to be busy at home, to be kind, and to be subject to their husbands, so that no one will malign the word of God." Similarly, Proverbs 31:27 praises the virtuous wife who "watches over the affairs of her household and does not eat the bread of idleness." In 1 Timothy 5:14, Paul advises younger women to "marry, to have children, to manage their homes."
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your view on your wife working outside the home" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "I believe a woman's primary calling is to care for her home and family, and I prefer my wife not to work outside the home",
                      "I am open to my wife working outside the home if it supports our family or my leadership",
                      "I believe women should have the freedom to pursue a career or work outside the home as they choose"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="divorce_beliefs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are your beliefs about divorce?</FormLabel>
                <div className="text-sm text-gray-500 mb-4">
                  The Bible teaches that marriage is a sacred and eternal covenant ordained by God. As Jesus teaches in Matthew 19:6, "What God has joined together, let no one separate." Divorce is only acknowledged in the case of adultery, as stated in Matthew 19:9: "I tell you that anyone who divorces his wife, except for sexual immorality, and marries another woman commits adultery." Outside of this, Scripture makes it clear that remarriage after divorce is considered adultery (Mark 10:11-12). Even in cases where separation occurs, reconciliation is preferred, as Paul writes in 1 Corinthians 7:10-11: "A wife must not separate from her husband. But if she does, she must remain unmarried or else be reconciled to her husband." God's design for marriage is lifelong, and He declares in Malachi 2:16: "I hate divorce."
                </div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your beliefs about divorce" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Marriage is eternal; divorce is only acceptable in cases of adultery",
                      "Divorce can be justified if the relationship is no longer fulfilling to me"
                    ].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell us about yourself (max 2 sentences)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Share a brief summary about yourself..."
                    {...field}
                    maxLength={200}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onUploadComplete={(url) => field.onChange(url)}
                    onError={(error) => console.error('Upload error:', error)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}