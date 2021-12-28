import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, setValue, onChange };
};
export default useInput;
