import React from "react";

interface DropdownProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, id, options, value, onChange }) => {
  return (
    <div className={`flex gap-x-2 items-center`}>
      <label className={`font-semibold`} htmlFor={id}>
        {label}
      </label>
      <select className={`p-2 border rounded-md`} id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown
