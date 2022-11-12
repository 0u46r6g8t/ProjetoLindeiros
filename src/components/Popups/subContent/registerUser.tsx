/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import { ContentProfile } from "components/style";
import InputStyle from "components/Inputs";
import { useForm } from "util/form/useForm";
import { createUserThunk } from "app/reducers/user/thunk";
import { AppDispatch } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { IUserPost } from "interfaces/data/user.interface";
import { SelectMenuAlternative } from "components/Select/Alterntive";
import { IStateData } from "interfaces/components.interface";
import { setMessageToToast } from "app/reducers/toast/toastSlice";
import cep from "cep-promise";
import { showErrorMessage } from "util/function";
// import { findByCep } from "API/Cep";

function RegisterUser() {
  const dispatch = useDispatch<AppDispatch>();
  const [typeUser, setTypeUser] = useState("");
  const [cityUser, setCity] = useState("");
  const [cityDefault, setCityDefault] = useState("");
  const [cepAddress, setAddress] = useState<any>();
  const [addressFull, setAddressFul] = useState("");
  const initialValue: IUserPost = {
    name: "",
    email: "",
    cpf: "",
    born_date: "",
    address: "",
    phone: 0,
    phone_ddd: 0,
    userType: "",
    postalCode: 0,
    city: "",
    password: "",
  };
  const { userTypes, city, users } = useSelector((state: IStateData) => state);
  const { onChange, values } = useForm(initialValue);
  const handleSaveData = async (valuesSave: IUserPost) => {
    dispatch(
      createUserThunk({
        ...valuesSave,
        userType: typeUser,
        city: cityUser,
      }),
    );

    dispatch(
      setMessageToToast({
        message: users.message,
        type: users.typeMessage,
      }),
    );
  };
  const handle = async () => {
    if (cepAddress?.target.value.length >= 8) {
      const endereco = await cep(cepAddress?.target.value)
        .then((response) => response)
        .catch((error) => error);
      const { neighborhood, street, state, city } = endereco;
      if (neighborhood) {
        const EnderecoFull = `${`${street} - ${neighborhood}, ${state}`}`;
        setAddressFul(EnderecoFull);
      } else {
        showErrorMessage("Rua Não encontrada!", "error");
      }
      setCityDefault(city.trim());
    }
  };

  useEffect(() => {
    handle();
  }, [cepAddress]);
  return (
    <ContentProfile>
      <div className="content-default">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveData(values);
          }}
        >
          <div className="content-basic-data">
            <h1 className="title-h3">Dados básicos</h1>
            <InputStyle
              onChange={onChange}
              name="name"
              placeholder="Nome"
              title=""
              type="text"
              className="form-control-demand"
            />
            <InputStyle
              onChange={onChange}
              name="email"
              placeholder="Email"
              title=""
              type="email"
              className="form-control-demand"
            />
            <InputStyle
              onChange={onChange}
              placeholder="CPF"
              name="cpf"
              title=""
              maxLength={11}
              type="number"
              className="form-control-demand"
            />
            <div className="double-data">
              <InputStyle
                onChange={onChange}
                placeholder="DDD"
                title=""
                maxLength={2}
                name="phone_ddd"
                type="number"
                className="text-double"
              />
              <InputStyle
                onChange={onChange}
                placeholder="Nº de telefone"
                title=""
                maxLength={8}
                name="phone"
                type="phone"
                className="text-double"
              />
            </div>
            <div className="double-data">
              <InputStyle
                onChange={onChange}
                placeholder="Data de nascimento"
                name="born_date"
                title=""
                type="date"
                className="text-double"
              />
              <InputStyle
                name="postalCode"
                onChange={setAddress}
                placeholder="Código Postal"
                title=""
                maxLength={8}
                type="number"
                className="text-double"
              />
            </div>
            <div className="double-data">
              <SelectMenuAlternative
                setState={setTypeUser}
                name="user_type"
                className="text-double text-popup"
                options={userTypes.types}
              />
              <SelectMenuAlternative
                valueDefault={cityDefault}
                setState={setCity}
                name="city_id"
                className="text-double text-popup"
                options={city.city}
              />
            </div>
            <InputStyle
              name="address"
              onChange={onChange}
              placeholder="Endereço completo"
              title=""
              value={addressFull || ""}
              type="text"
              className="form-control-demand"
            />
            <InputStyle
              name="password"
              onChange={onChange}
              placeholder="Senha"
              title=""
              type="password"
              className="form-control-demand"
            />
          </div>
          <div className="form-control-demand" />
          <div className="btns-popup">
            <button className="btn-close-two">Fechar</button>
            <button className="btn-send">Enviar dados</button>
          </div>
          <div />
        </form>
      </div>
    </ContentProfile>
  );
}
export default RegisterUser;