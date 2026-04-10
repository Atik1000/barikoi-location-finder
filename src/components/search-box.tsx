type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <>
      <label htmlFor="location-query">Location query</label>
      <input
        id="location-query"
        placeholder={placeholder ?? "Try Banani, Dhanmondi, Sylhet..."}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}
