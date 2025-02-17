export const validation = (data) => {
  const errors = {};
  const regPass = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regPhone = /^[0-9]{8,}$/;
  if (!regPass.test(data.password)) errors.password = 'La contraseña debe contener al menos una letra mayuscula, un numero y ocho caracteres';
  if (data.password !== data.password2) errors.password = 'Las contraseñas deben coincidir';
  if (!regEmail.test(data.email)) errors.password = 'Debes ingresar un email valido';
  if (!regPhone.test(data.phone_number)) errors.password = 'Debes ingresar un numero de telefono valido';
  if (data.name.length > 20) errors.password = 'Nombre muy grande';
  if (data.lastname.length > 20) errors.password = 'Apellido muy grande';
  if (data.age < 18) errors.password = 'Debes ser mayor de edad';
  if (!data.name.length || !data.password.length || !data.lastname.length || !data.age.length || !data.phone_number.length || !data.email.length || !data.location.length) errors.password = 'Todos los campos son obligatorios';

  // if(data.phoneNumber !== 10){
  //     errors.phoneNumber = "Ingresa un número de teléfono válido"
  // }
  return errors;
};

export const validationLogin = (data) => {
  const errors = {};

  if (data.email === '') errors.email = 'Este campo es requerido';

  if (data.password === '') errors.password = 'Este campo es requerido';

  return errors;
};
