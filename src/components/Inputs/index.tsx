/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { ContainerInput } from "../style";

interface IPros {
  name?: string;
  title?: string;
  placeholder: string;
  type: string;
  required?: boolean;
  autocomplete?: boolean;
  className?: string;
  onChange?: (event: any) => void;
  minLength?: number;
  maxLength?: number;
  valueChanges?: string;
  value?: any;
  height?: any;
  marginB?: string;
  limitBefore?: boolean;
}

function InputStyle({
  minLength,
  className,
  title,
  placeholder,
  type,
  name,
  maxLength,
  onChange,
  value,
  valueChanges,
  required,
  height,
  marginB,
  autocomplete,
  limitBefore
}: IPros) {
  const currentDate = () => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    
    return `${ano}-${mes}-${dia}`;
  }
  return (
    <ContainerInput className={className} style={{ height: (type === "hidden") ? "1px" : "initial" }}>
      {title &&
        (
          <h2 className="title-h3" style={{ fontSize: "14px", marginBottom: "2.5px", opacity: "0.8" }}>{title}</h2>
        )
      }
      <input
        defaultValue={value}
        onChange={onChange}
        name={name}
        min={(limitBefore) ? currentDate() : "0"}
        value={valueChanges}
        className="text-popup"
        minLength={minLength}
        autoComplete={(!autocomplete) ? "on" : "new-password"}
        maxLength={maxLength}
        type={type}
        style={{ height: height, marginBottom: (marginB) ? marginB : "5px" }}
        id={`input-${title}`}
        placeholder={placeholder}
        required={required || false}
      />
      <label htmlFor={`input-${title}`} />
    </ContainerInput>
  );
}

export default InputStyle;
