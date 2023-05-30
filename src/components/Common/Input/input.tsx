import React, { InputHTMLAttributes } from "react";

type InputProps = {
   name: string;
   label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ name, label, ...props }) => {
   return (
      <div className="input-wrapper">
         <label htmlFor={name}>{label}</label>
         <input name={name} {...props} />
      </div>
   );
};
