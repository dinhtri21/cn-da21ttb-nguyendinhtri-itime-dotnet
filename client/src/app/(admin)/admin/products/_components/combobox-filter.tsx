"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const frameworks = [
//   {
//     value: "null",
//     label: "Lọc theo thương hiệu",
//   },
//   {
//     value: "1",
//     label: "CASIO",
//   },
//   {
//     value: "2",
//     label: "Omega",
//   },
//   {
//     value: "3",
//     label: "CITIZEN",
//   },
// ];

export type frameworks = {
  value: string;
  label: string;
};

interface ComboboxFilterProps {
  setFilterValue?: React.Dispatch<React.SetStateAction<number[] | null>>;
  setFilterValueText?: React.Dispatch<React.SetStateAction<string | null>>;
  frameworks: frameworks[];
}

export default function ComboboxFilter(props: ComboboxFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (value && props.setFilterValue) {
      props.setFilterValue([parseInt(value)]);
    }
    if (value === "null" && props.setFilterValue) {
      props.setFilterValue(null);
    }
    if (value && props.setFilterValueText) {
      props.setFilterValueText(value);
    }
    if (value === "null" && props.setFilterValueText) {
      props.setFilterValueText(null);
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`h-9 p-2 flex gap-1 justify-between text-base font-normal  border-gray-300 ${
            value == "null" || value == "" ? "text-gray-400" : "text-customOrange"
          }`}
        >
          <ChevronsUpDown className="opacity-90 w-4 h-4" />
          <span>
            {value
              ? props.frameworks.find((framework) => framework.value === value)
                  ?.label
              : props.frameworks[0].label}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tim..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
