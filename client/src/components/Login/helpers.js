import LoginErrors from "./LoginErros";
import { createUser } from "../../redux/actions/actions";

export const handleInput = (e) => {
  const property = e.target.name;
  const value = e.target.value;
  setForm({ ...form, [property]: value });
};

export const handleRegister = (event) => {
  setDataRegister({
    ...dataRegister,
    [event.target.name]: event.target.value,
  });
  setErrorsRegister(
    LoginErrors({
      ...dataRegister,
      [event.target.name]: event.target.value,
    })
  );

  console.log(errorsRegister);
};

export const sendRegister = (event) => {
    event.preventDefault();
    if (!Object.values(errorsRegister).length) {
      dispatch(createUser(dataRegister));
      setDataRegister({
        name: "",
        lastname: "MiPapa",
        age: "25",
        phoneNumber: "",
        email: "",
        password: "",
        password2: "",
        location: "Buenos Aires",
        verified: "true",
        isActive: "true",
        role: "user",
      });
      setErrorsRegister({
        name: "",
        phoneNumber: "",
        password: "",
      });
    } else {
      alert(
        errorsRegister.name +
        "\n" +
        errorsRegister.password +
        "\n" +
        errorsRegister.phoneNumber
      );
    }
  };

export const handleLogin = (e) => {
    e.preventDefault();
}