import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Label } from '../ui/label';
import React from 'react';

type IProps = {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
};

export default function RHFSelect({ name, label, options, ...other }: IProps) {
  const { control } = useFormContext();
  const selectId = React.useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2 w-full">
          {label && <Label htmlFor={selectId}>{label}</Label>}
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            id={selectId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <span id={`${selectId}-error`} className="text-primary text-sm">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
