import { SyntheticEvent } from 'react';

type Props = {
  className?: string;
  options: Array<string>;
  size?: number;
  placeholder?: string;
  onChange: (event: SyntheticEvent<HTMLSelectElement>) => void
};

export default ({
  className, options, size = 1, placeholder, onChange,
}: Props) => (
  <select size={size} className={className} onChange={onChange}>
    {placeholder ? (
      <option defaultValue={null} selected>
        {placeholder}
      </option>
    ) : null}

    {options.map((value) => (
      <option key={`${value}`} value={value}>
        {value}
      </option>
    ))}
  </select>
);
