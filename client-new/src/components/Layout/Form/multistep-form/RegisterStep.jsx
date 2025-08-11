 import Formfield from "../FormField/Formfield";

function RegisterStep() {
  return (
    <>
      <Formfield
        fieldName="name"
        label="Name"
        iconClass="ni ni-hat-3"
        type="text"
      />
      <Formfield
        fieldName="surname"
        label="Surname"
        iconClass="ni ni-hat-3"
        type="text"
      />
      <Formfield
        fieldName="email"
        label="Email"
        iconClass="ni ni-hat-3"
        type="text"
      />
      <Formfield
        fieldName="password"
        label="Password"
        iconClass="ni ni-hat-3"
        type="password"
      />
    </>
  );
}

export default RegisterStep;
