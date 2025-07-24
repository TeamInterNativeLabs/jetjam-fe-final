import { useState, useEffect } from "react";

const useDebounce = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  const onChange = (e) => {
    setSearch(e?.target?.value);
  };

  return [search, debouncedValue, onChange];
};

export default useDebounce;
