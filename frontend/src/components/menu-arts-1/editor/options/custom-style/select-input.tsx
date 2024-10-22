import { SelectOption } from "./styles";

interface SelectProps extends React.ComponentProps<"select"> {
  label: string;
  options: SelectOption[];
}

export const Select = ({ label, options, ...props }: SelectProps) => (
  <div className="flex w-full flex-col gap-1">
    <label className="text-xs text-font">{label}</label>
    <select
      {...props}
      className="h-8 w-full rounded-lg border border-corner/10 bg-fill px-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
