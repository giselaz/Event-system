import { useFormContext } from "react-hook-form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
function Formfield({ fieldName, label, iconClass, type, options = [] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {type === "select" ? (
        <FormGroup>
          <Form.Label>{label}</Form.Label>
          <Form.Select {...register(fieldName)}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
          {errors[fieldName]?.message && (
            <Form.Text className="text-danger">
              {errors[fieldName].message}
            </Form.Text>
          )}
        </FormGroup>
      ) : (
        <FormGroup>
          <InputGroup className="input-group-alternative mb-3">
            <InputGroup.Text>
              <i className={iconClass} />
            </InputGroup.Text>
            <Form.Control
              type={type}
              // className=" is-invalid"
              placeholder={label}
              {...register(fieldName)}
            />
          </InputGroup> 
          {errors[fieldName]?.message && (
            <p style={{ color: "red" }}>{errors[fieldName].message}</p>
          )}
        </FormGroup>
      )}
    </>
  );
}

export default Formfield;
