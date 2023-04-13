import React, { useState, useEffect } from 'react';
import env from 'react-dotenv'
import axios from 'axios';
import './userform.css'

const UserForm = () => {
    // const [user, setUser] = useState({})
    // state to set values of user
    const [user, setUser] = useState({
        firstName: "",
        firstNameError: null,
        lastName: "",
        email: "",
        contact: "",
        designation: "customer",
        gender: "Male",
        password: "",
        confirmPassword: ""

    });

    // state to display errors, if data is not proper
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        designation: "",
        gender: "",
        password: "",
        confirmPassword: ""});

    // server message
    const [message, setMessage] = useState('');

    const[styleError, setStyleError] = useState(false)

    /**
 * Purpose: Function to check whether the value is email or not.
 * @param 
 * return Boolean value
 */
    const validateEmail = email => {
        // A basic email validation function
        const regexExp = /\S+@\S+\.\S+/;
        return regexExp.test(email);
    };

    /**
     * Purpose: Function to check whether the value is valid contact or not.
     * @param 
     * return Boolean value
     */
    const validateContact = contact => {
        const regexExp = /^[6-9]\d{9}$/gi
        return regexExp.test(contact)
    }
/**
     * Purpose: Function to add blur validation on tab .
     * @param 
     * return Boolean value
     */
    

    /**
     * Purpose: function to set values of input and errors.
     * @param 
     * return Boolean value
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // VALIDATION LOGICS HERE
        if(!true) {
            setUser({...user, [name]: value})
        }
        else {
           let errorfield = `${name}Error`
            setUser({...user, [errorfield]: `${name} is required`})
        }
        let errors = { ...formErrors };

        switch (name) {
            case "firstName":
                errors.firstName = value.length < 3 || value.length > 30 ? "First name must be of 3 to 30 characters" : "";
                break;
            case "lastName":
                errors.lastName = value.length < 3 || value.length > 30 ? "First name must be of 3 to 30 characters long" : "";
                break;
            case "email":
                errors.email = validateEmail(value) ? "" : "Please enter a valid email address";
                break;
            case "contact":
                errors.contact = validateContact(value) ? "" : "Please enter a valid mobile number";
                break;
            case 'gender':
                errors.gender = value === "" ? "Please select your gender" : "";
                break;
            case 'designation':
                errors.designation = value === "" ? "Please select your designation" : "";
                break;
            case "password":
                errors.password = value.length < 8 ? "Password must be at least 8 characters long" : "";
                break;
            case "confirmPassword":
                errors.confirmPassword = value !== user.password ? "Passwords do not match" : "";
                break;
            default:
                break;
        }
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        setFormErrors(errors);
    }
    

    // function to submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        // Check for any form errors before submitting
        const hasErrors = Object.values(formErrors).some(error => error !== "");
         if (!hasErrors) {
            // Submit the form data to server

            console.log(user)
            axios.post(env.URL, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contact: user.contact,
                designation: user.designation,
                gender: user.gender,
                password: user.password,
                confirmPassword: user.confirmPassword

            }).then(res => {
                setMessage(res.data.message)
            }).catch((error) => {
                console.log(error)
                setStyleError(true)
                setMessage(error.response.data.message)
            })
            // resetting the values after form data submitted
            setUser({
                firstName: "",
                lastName: "",
                email: "",
                contact: "",
                designation: "",
                gender: "",
                password: "",
                confirmPassword: ""
            })   
        }
        // show alert if all the fields are not properly filled
        else{
            // setMessage("Please fill all the fields properly")
        }
       

    };

    return (
        <>
            <div className='container'>
                <h1>Signup Form</h1>
                <hr />
                {/* {message ? <p>Hello world message </p> : null} */}
                <h3 id='serverMessage' style={{color: styleError? 'red': 'green', backgroundColor: styleError?'#ffcccc': '#d6f5d6'}} >{message}</h3>
                {/* <div style={{ color: 'red',backgroundColor: '#ffcccc' }}>{message}</div> */}
                {/* form started */}
                <form onSubmit={handleSubmit} className="signup-form row g-3">

                    {/* first name */}
                    <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label><span>*</span>
                        <input type="text" className="form-control" id="firstName" name='firstName' value={user.firstName} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.firstName}</span>
                       
                    </div>
                    {/* last name */}
                    <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label><span>*</span>
                        <input type="text" className="form-control" id="lastName" name='lastName' value={user.lastName} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.lastName}</span>
                    </div>
                    {/* email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label><span>*</span>
                        <input type="text" className="form-control" id="email" name='email' value={user.email} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.email}</span>
                    </div>
                    {/* contact */}
                    <div className="form-group col-md-6">
                        <label htmlFor="contact">Contact</label><span>*</span>
                        <input type="string" className="form-control" id="contact" name='contact' value={user.contact} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.contact}</span>
                    </div>
                    {/* designation */}
                    <div className="form-group col-md-6">
                        <label htmlFor="designation">Designation</label><span>*</span>
                        <select className="form-control" id="designation" name='designation' value={user.designation} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="super admin">Super Admin</option>
                        </select>
                    </div>
                    {/* gender */}
                    <div className="form-group">
                        <label>Gender</label><span>*</span>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={user.gender === "Male"} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}/>
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={user.gender === "Female"} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}/>
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                    </div>
                    {/* password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label><span>*</span>
                        <input type="password" className="form-control" id="password" name='password' value={user.password} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.password}</span>
                    </div>
                    {/* set password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label><span>*</span>
                        <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" value={user.confirmPassword} onChange={(event) => handleInputChange(event)} onBlur={(event)=>handleInputChange(event)}  />
                        <span>{formErrors.confirmPassword}</span>
                    </div>
                    {/* button to submit form */}
                    <div className='registerButton'>
                        <button type='submit'>Register</button>

                    </div>
                </form>
            </div>
        </>
    )
}

export default UserForm