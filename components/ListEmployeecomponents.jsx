import React,{useEffect, useState} from 'react'
import { deleteEmployee, listEmployee } from '../services/EmloyeeServices.js'
import { useNavigate } from 'react-router-dom'

const ListEmployeecomponents = () => {
    const [employee,setEmployees] = useState([])
    const navigator = useNavigate();
    useEffect(()=>{
        getAllEmployee();
    },[])
    
    function getAllEmployee(){
        listEmployee().then((response) => {
            console.log(response.data);  // Verify this data
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
        
    }
    function addNewEmployee(){
        navigator('/add-Employee')
    }
    function updateEmployee(id){
        navigator(`/edit-Employee/${id}`)
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployee();
        }).catch(error => {
            console.log(error);
        })
    }
  return (
    <div className='container'>
       
        <h2 className='text-center'>List of Employee </h2>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add EMployee</button>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee FirstName</th>
                    <th>Employee LastName</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> 
                {
                    employee.map(employee=>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className='btn btn-info' onClick={() => updateEmployee(employee.id)} >Update</button>
                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                            style={{marginLeft:'10px'}}
                            >Dalete</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListEmployeecomponents;