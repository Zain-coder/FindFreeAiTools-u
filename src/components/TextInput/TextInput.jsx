import React from "react";

import { inputStyles } from "../../constants";

const TextInput = ({
  autoComplete,
  placeholder,
  register,
  fieldName,
  type,
  ...otherProps
}) => {
  return (
    <input
      {...register(fieldName)}
      autoComplete={autoComplete}
      className={inputStyles}
      placeholder={placeholder}
      type={type}
      {...otherProps}
    />
  );
};

export default TextInput;
