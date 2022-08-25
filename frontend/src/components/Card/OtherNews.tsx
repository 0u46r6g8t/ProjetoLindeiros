import React from "react";
import { IOtherNewsProps } from "../../interfaces/components.interface";
import { Card, ContainerOtherNews } from "../style";

function OtherNews({ description, date, logo, title }: IOtherNewsProps) {
  return (
    <Card width="500px" height="145px">
      <ContainerOtherNews>
        <img src={logo.src} alt={logo.alt} />

        <div className="data-content">
          <h1 className="title-h2">{title}</h1>
          <h1 className="title-h1-card">{date}</h1>
          <p className="description-card">{description}</p>
        </div>
      </ContainerOtherNews>
    </Card>
  );
}
export default OtherNews;