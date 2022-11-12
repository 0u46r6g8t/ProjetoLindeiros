/* eslint-disable react-hooks/exhaustive-deps */
import InputAdd from "components/Inputs/inputAdd";
import { ContainerChipAdd } from "components/style";
import { IPropsGlobal } from "interfaces/components.interface";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

function ChipAdd({ className, text, setState, listValue }: IPropsGlobal) {
  const [data, setData] = useState([...(listValue || [])]);
  const handleRemoveItem = (value: string) => {
    const temp = data.filter((item) => item !== value);
    setData(temp);
  };

  useEffect(() => {
    setState([...data]);
  }, [data]);

  return (
    <ContainerChipAdd className={className}>
      <InputAdd setState={setData} listValue={data} text={text} />
      <div className="content-chips-add">
        {data &&
          data.map((item: string) => (
            <span className="card-chip" key={item}>
              <p>{item.toString().substring(0, 7)}...</p>
              <GrClose size={10} onClick={() => handleRemoveItem(item)} />
            </span>
          ))}
      </div>
    </ContainerChipAdd>
  );
}
export default ChipAdd;