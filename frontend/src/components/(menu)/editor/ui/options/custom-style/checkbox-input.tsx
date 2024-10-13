interface CheckboxInputProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
  disabled?: boolean;
}

const CheckboxInput = ({
  checked,
  setChecked,
  disabled,
}: CheckboxInputProps) => (
  <div className="flex w-full flex-col gap-1">
    <label className="text-xs text-font">Apply to all</label>
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={() => setChecked(!checked)}
      className={`h-8 w-full rounded-lg border border-corner/10 text-xs transition-all duration-300 hover:opacity-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-primary text-white" : "bg-fill"
      }`}
    />
  </div>
);
