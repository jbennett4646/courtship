import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "./ImageUpload";

const SKILLS_OPTIONS = [
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

const TRADITIONAL_VALUES_OPTIONS = [
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

interface PatriarchFormData {
  first_name: string;
  last_name: string;
  location: string;
  church: string;
  denomination: string | undefined;
  bio: string;
  hair_color: string | undefined;
  eye_color: string | undefined;
  type: "patriarch";
  race: string | undefined;
  age: string;
  college_education: string | undefined;
  traditional_values: string[];
  skills: string[];
  interests: string[];
  profile_image?: string;
  dowry?: string;
  desired_qualities?: string;
  preferred_age_range?: string;
  career_preference?: string;
  education_preference?: string;
  denomination_preference?: string;
  courtship_involvement?: string;
}

interface PatriarchQuestionnaireProps {
  onSubmit: (data: PatriarchFormData) => void;
}

export function PatriarchQuestionnaire({ onSubmit }: PatriarchQuestionnaireProps) {
  const [formData, setFormData] = useState<PatriarchFormData>({
    first_name: "",
    last_name: "",
    location: "",
    church: "",
    denomination: undefined,
    bio: "",
    hair_color: undefined,
    eye_color: undefined,
    type: "patriarch",
    race: undefined,
    age: "",
    college_education: undefined,
    traditional_values: [],
    skills: [],
    interests: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    checkAndSubmit(updatedData);
  };

  const handleDenominationChange = (value: string) => {
    const updatedData = {
      ...formData,
      denomination: value,
    };
    setFormData(updatedData);
    checkAndSubmit(updatedData);
  };

  const handleChurchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = {
      ...formData,
      church: e.target.value,
    };
    setFormData(updatedData);
    checkAndSubmit(updatedData);
  };

  const checkAndSubmit = (data: PatriarchFormData) => {
    // Only submit if all required fields are filled
    if (data.first_name && 
        data.last_name && 
        data.location && 
        data.church && 
        data.denomination &&
        data.race &&
        data.age &&
        data.college_education) {
      onSubmit(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="first_name">Patriarch Name</Label>
          <Input
            id="first_name"
            name="first_name"
            placeholder="Enter thy name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="last_name">Family Name</Label>
          <Input
            id="last_name"
            name="last_name"
            placeholder="Enter thy family name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Where is thy family located (City, State)?</Label>
        <Input
          id="location"
          name="location"
          placeholder="e.g., Dallas, TX"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="church">What is the name of thy family's church?</Label>
        <Input
          id="church"
          name="church"
          placeholder="Enter the name of thy family's church"
          value={formData.church}
          onChange={handleChurchChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="denomination">What is thy family's religious denomination?</Label>
        <Select onValueChange={handleDenominationChange} value={formData.denomination}>
          <SelectTrigger>
            <SelectValue placeholder="Select thy family's denomination" />
          </SelectTrigger>
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
      </div>

      <h2 className="text-2xl font-bold mb-6">Daughter</h2>

      <div className="space-y-2">
        <Label htmlFor="race">What is thy daughter's race?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            race: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.race} required>
          <SelectTrigger>
            <SelectValue placeholder="Select thy daughter's race" />
          </SelectTrigger>
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">What is thy daughter's age?</Label>
        <Input
          id="age"
          name="age"
          type="number"
          placeholder="Enter thy daughter's age"
          min="18"
          max="100"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hair_color">What is thy daughter's hair color?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            hair_color: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.hair_color} required>
          <SelectTrigger>
            <SelectValue placeholder="Select thy daughter's hair color" />
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
        <Label htmlFor="eye_color">What is thy daughter's eye color?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            eye_color: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.eye_color} required>
          <SelectTrigger>
            <SelectValue placeholder="Select thy daughter's eye color" />
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

      <div className="space-y-2">
        <Label htmlFor="college_education">Has thy daughter attended college, or does she plan to do so?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            college_education: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.college_education}>
          <SelectTrigger>
            <SelectValue placeholder="Select thy daughter's college education status" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Yes, she has completed college",
              "Yes, she is currently attending college",
              "No, but she plans to attend college",
              "No, and she does not plan to attend college"
            ].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>What are thy daughter's top 3 traditional values? ({formData.traditional_values.length}/3)</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {TRADITIONAL_VALUES_OPTIONS.map((value) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.traditional_values.includes(value)}
                disabled={!formData.traditional_values.includes(value) && formData.traditional_values.length >= 3}
                onCheckedChange={(checked) => {
                  const updatedValues = checked
                    ? [...formData.traditional_values, value]
                    : formData.traditional_values.filter((v) => v !== value);
                  const updatedData = {
                    ...formData,
                    traditional_values: updatedValues,
                  };
                  setFormData(updatedData);
                  checkAndSubmit(updatedData);
                }}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>What are thy daughter's top 3 skills? ({formData.skills.length}/3)</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {SKILLS_OPTIONS.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.skills.includes(skill)}
                disabled={!formData.skills.includes(skill) && formData.skills.length >= 3}
                onCheckedChange={(checked) => {
                  const updatedSkills = checked
                    ? [...formData.skills, skill]
                    : formData.skills.filter((s) => s !== skill);
                  const updatedData = {
                    ...formData,
                    skills: updatedSkills,
                  };
                  setFormData(updatedData);
                  checkAndSubmit(updatedData);
                }}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>What are thy daughter's top 3 interests? ({formData.interests.length}/3)</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {INTERESTS_OPTIONS.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.interests.includes(interest)}
                disabled={!formData.interests.includes(interest) && formData.interests.length >= 3}
                onCheckedChange={(checked) => {
                  const updatedInterests = checked
                    ? [...formData.interests, interest]
                    : formData.interests.filter((i) => i !== interest);
                  const updatedData = {
                    ...formData,
                    interests: updatedInterests,
                  };
                  setFormData(updatedData);
                  checkAndSubmit(updatedData);
                }}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-8">Marriage</h2>

      <div className="space-y-2">
        <Label htmlFor="dowry">Does thy family plan to provide a dowry or financial support for thy daughter's future marriage?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            dowry: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.dowry}>
          <SelectTrigger>
            <SelectValue placeholder="Select thy dowry provision" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A substantial dowry, including financial assets or land">A substantial dowry, including financial assets or land</SelectItem>
            <SelectItem value="Financial provisions will be included">Financial provisions will be included</SelectItem>
            <SelectItem value="Dowry not included">Dowry not included</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-8">Suitor</h2>

      <div className="space-y-2">
        <Label htmlFor="desired_qualities">What qualities dost thou seek in a husband for thy daughter?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            desired_qualities: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.desired_qualities}>
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

      <div className="space-y-2">
        <Label htmlFor="preferred_age_range">What be the preferred age range for a suitor most worthy of thy daughter?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            preferred_age_range: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.preferred_age_range}>
          <SelectTrigger>
            <SelectValue placeholder="Select preferred age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20-29 years old">20-29 years old</SelectItem>
            <SelectItem value="30-35 years old">30-35 years old</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="career_preference">What be thy preference for a potential suitor's job or career stability?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            career_preference: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.career_preference}>
          <SelectTrigger>
            <SelectValue placeholder="Select career preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Suitor must excel in a prestigious career">Suitor must excel in a prestigious career (e.g., law, medicine, finance)</SelectItem>
            <SelectItem value="A stable job or career is essential">A stable job or career is essential</SelectItem>
            <SelectItem value="A willingness to work hard and provide">A willingness to work hard and provide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="education_preference">What level of learning or training dost thou prefer in a suitor for thy daughter?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            education_preference: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.education_preference}>
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

      <div className="space-y-2">
        <Label htmlFor="denomination_preference">Should the suitor's faith and denomination be in accord with thy family's creed?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            denomination_preference: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.denomination_preference}>
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

      <div className="space-y-2">
        <Label htmlFor="courtship_involvement">How greatly dost thou intend to be involved in thy daughter's courtship journey?</Label>
        <Select onValueChange={(value) => {
          const updatedData = {
            ...formData,
            courtship_involvement: value,
          };
          setFormData(updatedData);
          checkAndSubmit(updatedData);
        }} value={formData.courtship_involvement}>
          <SelectTrigger>
            <SelectValue placeholder="Select thy level of involvement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Direct oversight and approval of every stage of the courtship, including the suitor's initial intentions, family background, and adherence to our family's values">Direct oversight and approval of every stage of the courtship, including the suitor's initial intentions, family background, and adherence to our family's values</SelectItem>
            <SelectItem value="Active involvement, including meetings with the suitor and his family">Active involvement, including meetings with the suitor and his family</SelectItem>
            <SelectItem value="Moderate involvement, with regular updates and discussions">Moderate involvement, with regular updates and discussions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Describe thy family to prospective suitors (max 2 sentences)</Label>
        <Input
          id="bio"
          name="bio"
          placeholder="Share a brief summary about thy family's values, legacy, or heritage..."
          value={formData.bio}
          onChange={handleChange}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label>Profile Image</Label>
        <ImageUpload
          onUploadComplete={(url) => {
            const updatedData = {
              ...formData,
              profile_image: url,
            };
            setFormData(updatedData);
            checkAndSubmit(updatedData);
          }}
          onError={(error) => console.error('Upload error:', error)}
        />
      </div>
    </div>
  );
}