import React from "react";
import { Link } from "react-router-dom";
import { IPropsGlobal } from "../../interfaces/components.interface";
import { ContainerButton } from "../style";

function ButtonDefault({
  value,
  icon,
  width,
  router,
  setState,
  proposal,
}: IPropsGlobal) {
  const clicked = () => {
    setState({ proposal, popUp: true });
  };

  return (
    <ContainerButton width={width} onClick={() => clicked()}>
      <Link to={`${router}`}>
        {icon && <img src={icon} alt="" />}
        {value}
      </Link>
    </ContainerButton>
  );
}
export default ButtonDefault;
