import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '../ui/select';
import { Label } from '../ui/label';
import React from 'react';

type IProps = {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
};

type Props = IProps & any

export default function RHFSelect({ name, label, options, ...other }: Props) {
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
            {...other}
            {...field}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={`${selectId}-error`}
          >
            {options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {error && (
            <span id={`${selectId}-error`} className="text-red-500 text-sm">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
