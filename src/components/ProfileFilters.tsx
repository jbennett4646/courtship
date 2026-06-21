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

// Option lists mirror the values used in the join questionnaires so that
// filtering matches the exact strings stored on each profile.
export const RACE_OPTIONS = ["White", "Black", "Hispanic", "Asian", "Mixed"];

// Heights are ordered low -> high so min/max range filtering works by index.
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

export const bodyTypeOptionsFor = (targetType: TargetType): string[] => {
  if (targetType === "knight") return KNIGHT_BODY_TYPES;
  if (targetType === "lady") return LADY_BODY_TYPES;
  return [];
};

export type TargetType = "knight" | "lady" | "patriarch";

export type ProfileFilterState = {
  ageMin: string;
  ageMax: string;
  location: string;
  races: string[];
  heightMin: string;
  heightMax: string;
  bodyTypes: string[];
};

export const EMPTY_FILTERS: ProfileFilterState = {
  ageMin: "",
  ageMax: "",
  location: "",
  races: [],
  heightMin: "",
  heightMax: "",
  bodyTypes: [],
};

// Returns true when `profile` satisfies every active filter. A profile that is
// missing a field being filtered on is excluded, so filters narrow results.
export const matchesFilters = (
  profile: any,
  f: ProfileFilterState
): boolean => {
  // Age (stored as a numeric string)
  const age = parseInt(profile?.age, 10);
  if (f.ageMin !== "") {
    if (Number.isNaN(age) || age < parseInt(f.ageMin, 10)) return false;
  }
  if (f.ageMax !== "") {
    if (Number.isNaN(age) || age > parseInt(f.ageMax, 10)) return false;
  }

  // Location (case-insensitive substring match)
  if (f.location.trim() !== "") {
    const loc = (profile?.location ?? "").toLowerCase();
    if (!loc.includes(f.location.trim().toLowerCase())) return false;
  }

  // Race (any selected)
  if (f.races.length > 0 && !f.races.includes(profile?.race)) return false;

  // Height (range by position in the ordered list)
  if (f.heightMin !== "" || f.heightMax !== "") {
    const idx = HEIGHT_OPTIONS.indexOf(profile?.height);
    if (idx === -1) return false;
    if (f.heightMin !== "" && idx < HEIGHT_OPTIONS.indexOf(f.heightMin))
      return false;
    if (f.heightMax !== "" && idx > HEIGHT_OPTIONS.indexOf(f.heightMax))
      return false;
  }

  // Body type (any selected)
  if (f.bodyTypes.length > 0 && !f.bodyTypes.includes(profile?.body_type))
    return false;

  return true;
};

export const hasActiveFilters = (f: ProfileFilterState): boolean =>
  f.ageMin !== "" ||
  f.ageMax !== "" ||
  f.location.trim() !== "" ||
  f.races.length > 0 ||
  f.heightMin !== "" ||
  f.heightMax !== "" ||
  f.bodyTypes.length > 0;

const ANY = "__any__";

type ProfileFiltersProps = {
  targetType: TargetType;
  filters: ProfileFilterState;
  onChange: (filters: ProfileFilterState) => void;
};

export function ProfileFilters({
  targetType,
  filters,
  onChange,
}: ProfileFiltersProps) {
  const showPhysical = targetType !== "patriarch";
  const bodyTypeOptions = bodyTypeOptionsFor(targetType);

  const toggleInArray = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

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

      <CollapsibleContent className="px-4 pb-4">
        <div className="grid gap-6 sm:grid-cols-2">
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
                onChange={(e) =>
                  onChange({ ...filters, ageMin: e.target.value })
                }
                className="w-full"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                min={18}
                max={100}
                placeholder="Max"
                value={filters.ageMax}
                onChange={(e) =>
                  onChange({ ...filters, ageMax: e.target.value })
                }
                className="w-full"
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
              onChange={(e) =>
                onChange({ ...filters, location: e.target.value })
              }
            />
          </div>

          {/* Height (knights & ladies only) */}
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
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {RACE_OPTIONS.map((race) => (
                <label
                  key={race}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={filters.races.includes(race)}
                    onCheckedChange={() =>
                      onChange({
                        ...filters,
                        races: toggleInArray(filters.races, race),
                      })
                    }
                  />
                  {race}
                </label>
              ))}
            </div>
          </div>

          {/* Body type (knights & ladies only) */}
          {showPhysical && bodyTypeOptions.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-sm font-medium">Body type</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {bodyTypeOptions.map((bt) => (
                  <label
                    key={bt}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.bodyTypes.includes(bt)}
                      onCheckedChange={() =>
                        onChange({
                          ...filters,
                          bodyTypes: toggleInArray(filters.bodyTypes, bt),
                        })
                      }
                    />
                    {bt}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
