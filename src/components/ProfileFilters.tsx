import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

export type TargetType = "knight" | "lady" | "patriarch";

// An option: `value` is the exact string stored on the profile; `label` is the
// (often shorter) text shown in the UI.
type Opt = { value: string; label: string };
const opt = (value: string, label?: string): Opt => ({
  value,
  label: label ?? value,
});

// ---------------------------------------------------------------------------
// Option lists. These mirror the exact strings used in the join questionnaires
// so filtering matches what is actually stored on each profile.
// ---------------------------------------------------------------------------

export const RACE_OPTIONS = ["White", "Black", "Hispanic", "Asian", "Mixed"];

// Heights ordered low -> high so the min/max range filter works by index.
export const HEIGHT_OPTIONS = [
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
  "Above 6'0",
];

const KNIGHT_BODY_TYPES = [
  "Athletic and strong",
  "Broad-shouldered and fit",
  "Tall and athletic",
  "Average build",
  "Obese",
];
const LADY_BODY_TYPES = [
  "Graceful and feminine",
  "Petite and elegant",
  "Average build",
  "Obese",
];

const DENOMINATIONS = [
  "Baptist",
  "Catholic",
  "Lutheran",
  "Presbyterian",
  "Eastern Orthodox",
  "Pentecostal",
  "Non-Denominational",
  "Methodist",
];
const HAIR_COLORS = ["Black", "Brown", "Blonde", "Red", "Gray"];
const EYE_COLORS = ["Amber", "Blue", "Brown", "Gray", "Green", "Hazel"];

const KNIGHT_DISTINCTIVE = [
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
  "Strong grip",
];
const LADY_DISTINCTIVE = [
  "Gentle smile",
  "Soft voice",
  "Clear skin",
  "Slender neckline",
  "Full lips",
  "Delicate hands",
  "Long legs",
  "Smooth contours",
];

const KNIGHT_TRADITIONAL_VALUES = [
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
  "Accountability to God",
];
const LADY_TRADITIONAL_VALUES = [
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
  "Traditional marriage roles",
];

const KNIGHT_SKILLS = [
  "Leadership",
  "Strategic thinking",
  "Physical strength",
  "Craftsmanship",
  "Musical ability",
  "Public speaking",
  "Teaching",
  "Problem-solving",
  "Mentoring",
  "Athletic prowess",
];
const LADY_SKILLS = [
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
  "Soap Making",
];

const KNIGHT_INTERESTS = [
  "Bible study",
  "Church ministry",
  "Outdoor activities",
  "Sports",
  "Reading",
  "Music",
  "Travel",
  "Community service",
  "Family activities",
  "Fitness",
];
const LADY_INTERESTS = [
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
  "Tea",
];

// Shared single-select option sets (identical strings across knight & lady).
const BAPTIZED = [
  opt("I have been baptized", "Baptized"),
  opt("I have not been baptized", "Not baptized"),
];
const VIRTUE = [
  opt("My virtue is unclaimed", "Unclaimed"),
  opt("My virtue has been claimed", "Claimed"),
];
const ALCOHOL = [
  opt("Never drank alcohol", "Never"),
  opt("Drank alcohol in the past", "In the past"),
  opt("Drink alcohol socially", "Socially"),
  opt("Drink alcohol regularly", "Regularly"),
];
const SMOKING = [
  opt("Never smoked cigarettes", "Never"),
  opt("Smoked cigarettes in the past", "In the past"),
  opt("Smoke cigarettes", "Currently"),
];
const DRUGS = [
  opt("Never used drugs", "Never"),
  opt("Used drugs in the past", "In the past"),
  opt("Use drugs occasionally", "Occasionally"),
  opt("Use drugs regularly", "Regularly"),
];
const TATTOOS = [
  opt("Yes, visible tattoos", "Visible"),
  opt("Yes, hidden tattoos", "Hidden"),
  opt("No tattoos", "None"),
];
const PIERCINGS = [
  opt("Ears pierced only", "Ears only"),
  opt("Multiple piercings", "Multiple"),
  opt("No piercings", "None"),
];
const APPEARANCE_IMPORTANCE = [
  opt("Physical appearance and fitness are top priorities for me", "Top priority"),
  opt("I value staying fit and healthy", "Values fitness"),
  opt(
    "Physical appearance and fitness are not major priorities in my life",
    "Not a priority"
  ),
];
const MARITAL_HEADSHIP = [
  opt(
    "I believe in God's ordained hierarchy: Christ as the head of man, man as the head of woman, and together submitting to Christ's will (1 Corinthians 11:3)",
    "Biblical hierarchy (male headship)"
  ),
  opt(
    "Partnership (husband and wife make decisions equally)",
    "Equal partnership"
  ),
  opt(
    "Matriarchal Leadership (wife as decision-maker)",
    "Matriarchal leadership"
  ),
];
const DIVORCE = [
  opt(
    "Marriage is eternal; divorce is only acceptable in cases of adultery",
    "Only for adultery"
  ),
  opt(
    "Divorce can be justified if the relationship is no longer fulfilling to me",
    "If unfulfilling"
  ),
];
const FAMILY_GOALS = [
  opt("Large family (4+ children)"),
  opt("Medium family (2-3 children)"),
  opt("Small family (1-2 children)"),
  opt("Open to God's plan"),
];
const WEDDING = [
  opt(
    "I intend to have a religious wedding ceremony in a church before God",
    "Religious ceremony"
  ),
  opt(
    "I prefer a civil ceremony without religious elements",
    "Civil ceremony"
  ),
];

const collegeOptions = (t: TargetType): Opt[] => {
  if (t === "patriarch") {
    return [
      opt("Yes, she has completed college", "Completed college"),
      opt("Yes, she is currently attending college", "Currently in college"),
      opt("No, but she plans to attend college", "Plans to attend"),
      opt("No, and she does not plan to attend college", "Not planning to"),
    ];
  }
  return [
    opt("Yes, I have completed college", "Completed college"),
    opt("Yes, I am currently attending college", "Currently in college"),
    opt("No, but I plan to attend college", "Plans to attend"),
    opt("No, and I do not plan to attend college", "Not planning to"),
  ];
};

const workPreferenceOptions = (t: TargetType): Opt[] => {
  if (t === "lady") {
    return [
      opt(
        "I believe a woman's primary calling is to care for her home and family, and I prefer not to work outside the home",
        "Prefers to stay home"
      ),
      opt(
        "I am open to working outside the home if it supports my family or husband's leadership",
        "Open to working"
      ),
      opt(
        "I believe women should have the freedom to pursue a career or work outside the home as they choose",
        "Wants freedom to work"
      ),
    ];
  }
  return [
    opt(
      "I believe a woman's primary calling is to care for her home and family, and I prefer my wife not to work outside the home",
      "Prefers wife at home"
    ),
    opt(
      "I am open to my wife working outside the home if it supports our family or my leadership",
      "Open to wife working"
    ),
    opt(
      "I believe women should have the freedom to pursue a career or work outside the home as they choose",
      "Supports wife's career"
    ),
  ];
};

const lastNameOptions = (t: TargetType): Opt[] => {
  if (t === "lady") {
    return [
      opt("I will take my husband's last name", "Will take his name"),
      opt(
        "I plan to hyphenate my last name with my husband's",
        "Plans to hyphenate"
      ),
    ];
  }
  return [
    opt("I expect my wife to take my last name", "Expects wife to take his name"),
    opt("I am open to hyphenation", "Open to hyphenation"),
  ];
};

// Lady-only domestic fields
const CHASTITY = [
  opt("Committed to chastity until marriage", "Chaste until marriage"),
  opt(
    "Sex can be appropriate when committed to marriage",
    "OK when committed"
  ),
];
const WEARS_DRESSES = [
  opt("I like wearing dresses and skirts", "Likes dresses/skirts"),
  opt("I don't like wearing dresses and skirts", "Doesn't like dresses"),
];
const MODESTY = [
  opt("Modesty is central to my clothing choices", "Central to dress"),
  opt(
    "Modesty doesn't significantly influence how I dress",
    "Not a focus"
  ),
];
const COOKING = [
  opt("I like cooking and preparing meals", "Enjoys cooking"),
  opt("I don't like cooking and preparing meals", "Doesn't enjoy cooking"),
  opt("I am willing to learn to cook and prepare meals", "Willing to learn"),
];
const HOMEMAKER = [
  opt(
    "I value being a homemaker and caring for our family",
    "Values homemaking"
  ),
  opt("I don't see myself in the homemaker role", "Not a homemaker"),
];
const PROVIDER = [
  opt("I value having a provider for our family", "Values a provider"),
  opt("I don't see a provider role as necessary", "Provider not necessary"),
];
const HOMESCHOOL = [
  opt("Very comfortable homeschooling our children", "Comfortable"),
  opt("Not comfortable homeschooling our children", "Not comfortable"),
  opt(
    "I'm willing to learn how to homeschool our children",
    "Willing to learn"
  ),
];
const PREGNANCY = [
  opt("Never intentionally ended a pregnancy", "No prior abortion"),
  opt("Have intentionally ended a pregnancy", "Has ended a pregnancy"),
];
const DAYCARE = [
  opt(
    "I won't use a daycare and I will personally care for my children at home, as this is a woman's primary calling, with trusted family members stepping in to assist occasionally as needed",
    "Will care for kids at home"
  ),
  opt(
    "I believe daycare can be used in moderation to balance my career, as long as my children's needs remain my top priority",
    "Open to daycare in moderation"
  ),
];

// Patriarch-only suitor / daughter preference fields
const DENOM_PREF = [
  opt("Alignment with our denomination is required", "Same denomination required"),
  opt(
    "Preferable, but other Christian denominations are acceptable",
    "Prefers same, flexible"
  ),
  opt("Denomination alignment is not a requirement", "No requirement"),
];
const PREFERRED_AGE = [opt("20-29 years old"), opt("30-35 years old")];
const CAREER_PREF = [
  opt(
    "Suitor must excel in a prestigious career (e.g., law, medicine, finance)",
    "Prestigious career"
  ),
  opt("A stable job or career is essential", "Stable career"),
  opt("A willingness to work hard and provide", "Hardworking provider"),
];
const EDUCATION_PREF = [
  opt("Advanced degree from a respected institution", "Advanced degree"),
  opt("College degree is preferred", "College preferred"),
  opt("No educational requirements", "No requirement"),
];
const DESIRED_QUALITIES = [
  opt(
    "Proven leadership, exceptional character, and the ability to fulfill the role of head of the household",
    "Proven leadership & character"
  ),
  opt(
    "Stable career, family-oriented, and tireless work ethic",
    "Stable career & work ethic"
  ),
  opt(
    "Respect for traditional values and commitment to biblical principles",
    "Traditional/biblical values"
  ),
];
const DOWRY = [
  opt(
    "A substantial dowry, including financial assets or land",
    "Substantial dowry"
  ),
  opt("Financial provisions will be included", "Some financial provisions"),
  opt("Dowry not included", "No dowry"),
];
const COURTSHIP = [
  opt(
    "Direct oversight and approval of every stage of the courtship, including the suitor's initial intentions, family background, and adherence to our family's values",
    "Direct oversight of every stage"
  ),
  opt(
    "Active involvement, including meetings with the suitor and his family",
    "Active involvement & meetings"
  ),
  opt(
    "Moderate involvement, with regular updates and discussions",
    "Moderate involvement & updates"
  ),
];

const asOpts = (vals: string[]): Opt[] => vals.map((v) => opt(v));

// ---------------------------------------------------------------------------
// Field configuration. Each field maps to a profile property; `types` controls
// which profile types it appears for; `options` can vary by type.
// ---------------------------------------------------------------------------

type FieldDef = {
  key: string; // also the profile property name
  label: string;
  types: TargetType[];
  isArray?: boolean;
  options: (t: TargetType) => Opt[];
};

const ALL: TargetType[] = ["knight", "lady", "patriarch"];
const KL: TargetType[] = ["knight", "lady"];

const SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Appearance",
    fields: [
      { key: "hair_color", label: "Hair color", types: ALL, options: () => asOpts(HAIR_COLORS) },
      { key: "eye_color", label: "Eye color", types: ALL, options: () => asOpts(EYE_COLORS) },
      {
        key: "distinctive_features",
        label: "Distinctive features",
        types: KL,
        options: (t) => asOpts(t === "knight" ? KNIGHT_DISTINCTIVE : LADY_DISTINCTIVE),
      },
    ],
  },
  {
    title: "Faith & Values",
    fields: [
      { key: "denomination", label: "Denomination", types: ALL, options: () => asOpts(DENOMINATIONS) },
      { key: "baptized", label: "Baptism", types: KL, options: () => BAPTIZED },
      { key: "virtue_status", label: "Virtue", types: KL, options: () => VIRTUE },
      { key: "college_education", label: "College education", types: ALL, options: collegeOptions },
      { key: "marital_headship", label: "Marital headship", types: KL, options: () => MARITAL_HEADSHIP },
      { key: "divorce_beliefs", label: "Divorce beliefs", types: KL, options: () => DIVORCE },
    ],
  },
  {
    title: "Lifestyle",
    fields: [
      { key: "alcohol_consumption", label: "Alcohol", types: KL, options: () => ALCOHOL },
      { key: "smoking_status", label: "Smoking", types: KL, options: () => SMOKING },
      { key: "drug_usage", label: "Drug use", types: KL, options: () => DRUGS },
      { key: "tattoos", label: "Tattoos", types: KL, options: () => TATTOOS },
      { key: "piercings", label: "Piercings", types: KL, options: () => PIERCINGS },
      {
        key: "pornography_consumption",
        label: "Pornography",
        types: ["knight"],
        options: () => [
          opt("No, never", "Never"),
          opt("I have, but no longer do", "In the past, no longer"),
          opt("Yes, occasionally", "Occasionally"),
          opt("Yes, frequently", "Frequently"),
        ],
      },
      {
        key: "physical_appearance_importance",
        label: "Appearance importance",
        types: KL,
        options: () => APPEARANCE_IMPORTANCE,
      },
    ],
  },
  {
    title: "Marriage & Family",
    fields: [
      { key: "family_goals", label: "Family goals", types: KL, options: () => FAMILY_GOALS },
      { key: "wedding_ceremony_preference", label: "Wedding ceremony", types: KL, options: () => WEDDING },
      { key: "work_preference", label: "Work preference", types: KL, options: workPreferenceOptions },
      { key: "wife_lastname_preference", label: "Last name", types: KL, options: lastNameOptions },
    ],
  },
  {
    title: "Homemaking & Domestic",
    fields: [
      { key: "chastity_preference", label: "Chastity", types: ["lady"], options: () => CHASTITY },
      { key: "wears_dresses", label: "Dresses & skirts", types: ["lady"], options: () => WEARS_DRESSES },
      { key: "modesty_importance", label: "Modesty", types: ["lady"], options: () => MODESTY },
      { key: "enjoys_cooking_cleaning", label: "Cooking", types: ["lady"], options: () => COOKING },
      { key: "homemaker_importance", label: "Homemaking", types: ["lady"], options: () => HOMEMAKER },
      { key: "provider_importance", label: "Provider importance", types: ["lady"], options: () => PROVIDER },
      { key: "homeschooling_preference", label: "Homeschooling", types: ["lady"], options: () => HOMESCHOOL },
      { key: "pregnancy", label: "Pregnancy history", types: ["lady"], options: () => PREGNANCY },
      { key: "daycare_preference", label: "Daycare", types: ["lady"], options: () => DAYCARE },
    ],
  },
  {
    title: "Suitor & Daughter Preferences",
    fields: [
      { key: "denomination_preference", label: "Denomination requirement", types: ["patriarch"], options: () => DENOM_PREF },
      { key: "preferred_age_range", label: "Preferred suitor age", types: ["patriarch"], options: () => PREFERRED_AGE },
      { key: "career_preference", label: "Career expectation", types: ["patriarch"], options: () => CAREER_PREF },
      { key: "education_preference", label: "Education expectation", types: ["patriarch"], options: () => EDUCATION_PREF },
      { key: "desired_qualities", label: "Desired qualities", types: ["patriarch"], options: () => DESIRED_QUALITIES },
      { key: "dowry", label: "Dowry", types: ["patriarch"], options: () => DOWRY },
      { key: "courtship_involvement", label: "Courtship involvement", types: ["patriarch"], options: () => COURTSHIP },
    ],
  },
  {
    title: "Interests & Skills",
    fields: [
      {
        key: "traditional_values",
        label: "Traditional values",
        types: ALL,
        isArray: true,
        options: (t) => asOpts(t === "knight" ? KNIGHT_TRADITIONAL_VALUES : LADY_TRADITIONAL_VALUES),
      },
      {
        key: "skills",
        label: "Skills",
        types: ALL,
        isArray: true,
        options: (t) => asOpts(t === "knight" ? KNIGHT_SKILLS : LADY_SKILLS),
      },
      {
        key: "interests",
        label: "Interests",
        types: ALL,
        isArray: true,
        options: (t) => asOpts(t === "knight" ? KNIGHT_INTERESTS : LADY_INTERESTS),
      },
    ],
  },
];

const ARRAY_FIELDS = new Set(
  SECTIONS.flatMap((s) => s.fields).filter((f) => f.isArray).map((f) => f.key)
);

const bodyTypeOptionsFor = (t: TargetType): string[] =>
  t === "knight" ? KNIGHT_BODY_TYPES : t === "lady" ? LADY_BODY_TYPES : [];

// ---------------------------------------------------------------------------
// State + matching
// ---------------------------------------------------------------------------

export type ProfileFilterState = {
  ageMin: string;
  ageMax: string;
  location: string;
  heightMin: string;
  heightMax: string;
  // keyed by profile property name -> set of acceptable values
  selections: Record<string, string[]>;
};

export const EMPTY_FILTERS: ProfileFilterState = {
  ageMin: "",
  ageMax: "",
  location: "",
  heightMin: "",
  heightMax: "",
  selections: {},
};

export const hasActiveFilters = (f: ProfileFilterState): boolean =>
  f.ageMin !== "" ||
  f.ageMax !== "" ||
  f.location.trim() !== "" ||
  f.heightMin !== "" ||
  f.heightMax !== "" ||
  Object.values(f.selections).some((v) => v && v.length > 0);

// Returns true when `profile` satisfies every active filter. A profile missing
// a field being filtered on is excluded, so filters narrow results.
export const matchesFilters = (
  profile: any,
  f: ProfileFilterState
): boolean => {
  // Age (stored as a numeric string)
  const age = parseInt(profile?.age, 10);
  if (f.ageMin !== "" && (Number.isNaN(age) || age < parseInt(f.ageMin, 10)))
    return false;
  if (f.ageMax !== "" && (Number.isNaN(age) || age > parseInt(f.ageMax, 10)))
    return false;

  // Location (case-insensitive substring match)
  if (f.location.trim() !== "") {
    const loc = (profile?.location ?? "").toLowerCase();
    if (!loc.includes(f.location.trim().toLowerCase())) return false;
  }

  // Height (range by position in the ordered list)
  if (f.heightMin !== "" || f.heightMax !== "") {
    const idx = HEIGHT_OPTIONS.indexOf(profile?.height);
    if (idx === -1) return false;
    if (f.heightMin !== "" && idx < HEIGHT_OPTIONS.indexOf(f.heightMin))
      return false;
    if (f.heightMax !== "" && idx > HEIGHT_OPTIONS.indexOf(f.heightMax))
      return false;
  }

  // All checkbox-group selections (race, body_type, and every config field)
  for (const [key, selected] of Object.entries(f.selections)) {
    if (!selected || selected.length === 0) continue;
    const value = profile?.[key];
    if (ARRAY_FIELDS.has(key)) {
      // Profile stores an array; pass if it shares at least one selected value
      if (!Array.isArray(value) || !value.some((v) => selected.includes(v)))
        return false;
    } else {
      if (!selected.includes(value)) return false;
    }
  }

  return true;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ANY = "__any__";

type ProfileFiltersProps = {
  targetType: TargetType;
  filters: ProfileFilterState;
  onChange: (filters: ProfileFilterState) => void;
};

function CheckboxGroup({
  options,
  selected,
  onToggle,
}: {
  options: Opt[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Checkbox
            checked={selected.includes(o.value)}
            onCheckedChange={() => onToggle(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Collapsible className="border-t pt-3">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between text-sm font-semibold group">
          {title}
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProfileFilters({
  targetType,
  filters,
  onChange,
}: ProfileFiltersProps) {
  const showPhysical = targetType !== "patriarch";
  const bodyTypes = bodyTypeOptionsFor(targetType);

  const setSelection = (key: string, value: string) => {
    const current = filters.selections[key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    const selections = { ...filters.selections };
    if (next.length === 0) delete selections[key];
    else selections[key] = next;
    onChange({ ...filters, selections });
  };

  return (
    <Collapsible className="w-full max-w-3xl mx-auto mb-8 border rounded-lg bg-card">
      <div className="flex items-center justify-between p-4">
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium group">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters(filters) && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                on
              </span>
            )}
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </button>
        </CollapsibleTrigger>
        {hasActiveFilters(filters) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-muted-foreground"
            onClick={() => onChange(EMPTY_FILTERS)}
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </Button>
        )}
      </div>

      <CollapsibleContent className="px-4 pb-4 max-h-[70vh] overflow-y-auto">
        {/* Basics */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Age */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Age</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={18}
                max={100}
                placeholder="Min"
                value={filters.ageMin}
                onChange={(e) => onChange({ ...filters, ageMin: e.target.value })}
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                min={18}
                max={100}
                placeholder="Max"
                value={filters.ageMax}
                onChange={(e) => onChange({ ...filters, ageMax: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Location</Label>
            <Input
              type="text"
              placeholder="e.g. Dallas, TX"
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
            />
          </div>

          {/* Height */}
          {showPhysical && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Height</Label>
              <div className="flex items-center gap-2">
                <Select
                  value={filters.heightMin || ANY}
                  onValueChange={(v) =>
                    onChange({ ...filters, heightMin: v === ANY ? "" : v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any</SelectItem>
                    {HEIGHT_OPTIONS.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">to</span>
                <Select
                  value={filters.heightMax || ANY}
                  onValueChange={(v) =>
                    onChange({ ...filters, heightMax: v === ANY ? "" : v })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ANY}>Any</SelectItem>
                    {HEIGHT_OPTIONS.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Race */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Race</Label>
            <CheckboxGroup
              options={asOpts(RACE_OPTIONS)}
              selected={filters.selections.race ?? []}
              onToggle={(v) => setSelection("race", v)}
            />
          </div>

          {/* Body type */}
          {showPhysical && bodyTypes.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-sm font-medium">Body type</Label>
              <CheckboxGroup
                options={asOpts(bodyTypes)}
                selected={filters.selections.body_type ?? []}
                onToggle={(v) => setSelection("body_type", v)}
              />
            </div>
          )}
        </div>

        {/* Additional sections */}
        <div className="mt-5 space-y-3">
          {SECTIONS.map((section) => {
            const fields = section.fields.filter((f) =>
              f.types.includes(targetType)
            );
            if (fields.length === 0) return null;
            return (
              <FilterSection key={section.title} title={section.title}>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.isArray ? "space-y-2 sm:col-span-2" : "space-y-2"}
                  >
                    <Label className="text-sm font-medium">{field.label}</Label>
                    <CheckboxGroup
                      options={field.options(targetType)}
                      selected={filters.selections[field.key] ?? []}
                      onToggle={(v) => setSelection(field.key, v)}
                    />
                  </div>
                ))}
              </FilterSection>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
