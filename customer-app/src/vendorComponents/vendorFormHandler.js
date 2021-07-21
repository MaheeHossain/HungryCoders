import {useState} from "react"

// Template form handler function with a callback function
const VendorFormHandler = (initialState, callback) => {
  const [values, setValues] = useState(initialState);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  function handleFormChange(event) {
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

  return { handleChange, handleFormChange, handleSubmit, values }
}

export default VendorFormHandler;