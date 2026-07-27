import {
  Globe2,
  Languages,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  "Auto Detect",
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Punjabi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Urdu",
  "Odia",
  "Assamese",
  "Nepali",
];

export default function LanguageSelector({
  language,
  setLanguage,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Globe2 className="h-5 w-5 text-primary" />
      </div>

      <Select
        value={language}
        onValueChange={setLanguage}
      >
        <SelectTrigger className="w-[220px] rounded-xl">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <SelectValue />
          </div>
        </SelectTrigger>

        <SelectContent>
          {languages.map((lang) => (
            <SelectItem
              key={lang}
              value={lang}
            >
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}