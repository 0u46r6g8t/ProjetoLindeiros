/* eslint-disable react/require-default-props */
import React from "react";
import { IOptions, IPropsGlobal } from "interfaces/components.interface";
import { ContainerSelect } from "../style";

export function SelectMenu({
  className,
  color,
  options,
  background,
  iconFinal,
  width,
  setSelected,
}: IPropsGlobal) {
  const handleClick = (option: string) => {
    if (setSelected) {
      setSelected(option);
    }
  };
  return (
    <ContainerSelect
      className={className}
      background={background}
      color={color}
      icon={iconFinal}
      width={width}
      onChange={(e) => handleClick(e.target.selectedOptions[0].outerText)}
      // onChange={(e) => handleClick(e.target.value)}
    >
      {options &&
        options.map((option: IOptions) => (
          <option key={option.id}>
            {option.name}
            {"  "}
          </option>
        ))}
    </ContainerSelect>
  );
}