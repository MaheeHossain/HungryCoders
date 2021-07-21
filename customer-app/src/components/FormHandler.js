import {useState} from "react"

// Template form handler function with a callback function
const FormHandler = (initialState, callback) => {
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  // Submit handler function
  function handleSubmit(event) {
    event.preventDefault();
    return callback(values);
  }

  return { handleChange, handleSubmit, values }
}

export default FormHandler;