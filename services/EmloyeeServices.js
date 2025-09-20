import axios from "axios";

const REST_API_BASE_URL1 = "http://localhost:8080/api/user"
export const login = () => axios.get(REST_API_BASE_URL1+'/login');
// export const sendOtp = (email) => axios.post(REST_API_BASE_URL1+'/send-otp',email);
// export const sendOtp = (email) => axios.post('${REST_API_BASE_URL1}/send-otp', { email });
export const sendOtp = (email) => axios.post(`${REST_API_BASE_URL1}/send-otp?email=${email}`);



const REST_API_BASE_URL = "http://localhost:8080/api/employees"
export const listEmployee = () => axios.get(REST_API_BASE_URL+'/gettingAll');
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL+'/saving',employee);
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/getting/'+employeeId);
export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASE_URL+'/updating/'+employeeId,employee);
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/deleting/'+employeeId);