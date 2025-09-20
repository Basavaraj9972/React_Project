import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmloyeeServices.js'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const{id} =  useParams();

     const [errors,setErrors]= useState({firstName :'',
        lastName : '',
        email : ''
    })
    const navigator = useNavigate();
    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id]);


    // function handeleFirstName(e){
    //     setFirstName(e.target.value);
    // }
    // function handeleLastName(e){
    //     setLatsName(e.target.value);
    // }
    // function handeleEmail(e){
    //     setEmail(e.target.value);
    // }
    // handeleFirstName = (e)=>setFirstName(e.target.value);
    // handeleLastName =(e)=> setLatsName(e.target.value);
    // handeleEmail = (e)=>setEmail(e.target.value);
    function saveorUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName,lastName,email}
            console.log(employee)
            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data)
                    navigator('/employees')
                    }
                ).catch( error => {
                        console.log(error)
                    }
                )
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
    const validateField = (field, value) => {
        const errorCopy = { ...errors };
        if (value.trim()) {
          errorCopy[field] = '';
        } else {
            if (field === 'firstName') {
                errorCopy[field] = 'First Name is required';
            } else if (field === 'lastName') {
                errorCopy[field] = 'Last Name is required';
            } else if (field === 'email') {
                errorCopy[field] = 'Email is required';
            }
        }        
        setErrors(errorCopy);
      };


    function validateForm(){
        var valid = true;
        const errorcopy = {... errors}
        if(firstName.trim()){
            errorcopy.firstName = '';
        }
        else{
            errorcopy.firstName = 'First Name is required';
            valid = false;
        }
        if(lastName.trim()){
            errorcopy.lastName = '';
        }
        else{
            errorcopy.lastName = 'Last Name is required';
            valid = false;
        }
        if(email.trim()){
            errorcopy.email = '';
        }
        else{
            errorcopy.email = 'Email is required';
            valid = false;
        }
        setErrors(errorcopy);
        return valid;
    }
    
    function pageTitle(){
        if(id){
            return <h2 className='text-center'> Update Employee </h2>
        }
        else{
            return <h2 className='text-center'> Add Employee </h2>
        }
    }
  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-mb-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee First Name: </label>
                            <input 
                                type='text'
                                placeholder='Enter Employee FirstName '
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={ (e) => {
                                    const value = e.target.value;
                                    setFirstName(value);
                                    validateField('firstName', value);
                                    }
                                }

                            >
                            </input>   
                            { errors.firstName && <div className='invalid-feedback'>{ errors.firstName }</div>}                        
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee Last Name: </label>
                            <input 
                                type='text'
                                placeholder='Enter Employee LastName '
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLastName(value);
                                    validateField('lastName', value);
                                  }}
                            >
                            </input>   
                            { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}                        
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee Email Name: </label>
                            <input 
                                type='text'
                                placeholder='Enter Employee Email '
                                name='email'
                                value={email}
                                className={`form-control ${ errors.email ? 'is-invalid' : ''}`}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEmail(value);
                                    validateField('email', value);
                                  }}
                            >
                            </input> 
                            { errors.email && <div className='invalid-feedback'>{errors.email}</div>}                          
                        </div>
                        <button className='btn btn-success' onClick={saveorUpdateEmployee}>Submit </button>
                    </form>

                </div>

            </div>

        </div>
    </div>
  )
}

export default EmployeeComponent;