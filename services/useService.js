import axios from "axios";

const REST_API_BASE_URL1 = "http://localhost:8080/auth"
// export const login = (user) => axios.post(REST_API_BASE_URL1+'/login', user);

export const loginByUserNamePassword = async (credentials) => {
  return await axios.post(REST_API_BASE_URL1+'/loginByuserNamePassword', credentials, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }, // Ensure JSON format
  });
};

export const loginByEmailPassword = async (credentials) => {
    return await axios.post(REST_API_BASE_URL1+'/loginByEmailPassword', credentials, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }, // Ensure JSON format
    });
  };

  
export const loginByEmailPin = async (credentials) => {
    return await axios.post(REST_API_BASE_URL1+'/loginByEmailPin', credentials, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }, // Ensure JSON format
    });
  };
  
  
export const loginByPhonePin = async (credentials) => {
    return await axios.post(REST_API_BASE_URL1+'/loginByPhonePin', credentials, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }, // Ensure JSON format
    });
  };
  export const loginByUserNameEmailPassword = async (credentials) => {
    // alert("js calling")
    return await axios.post(REST_API_BASE_URL1+'/loginByuserNameEmailPassword', credentials, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" }, // Ensure JSON format
    });
  };
export const signup = () => axios.get(REST_API_BASE_URL1+'/signup');

// const REST_API_BASE_URL1 = "http://localhost:8080/api/user"

// export const login = () => axios.get(REST_API_BASE_URL1+'/login');
// export const sendOtp = (email) => axios.post(REST_API_BASE_URL1+'/send-otp',email);
// export const sendOtp = (email) => axios.post('${REST_API_BASE_URL1}/send-otp', { email });
// export const sendOtp = (email) => axios.post(`${REST_API_BASE_URL1}/send-otp?email=${email}`);

// const REST_API_BASE_URL = "http://localhost:8080/api/employees"
// export const listEmployee = () => axios.get(REST_API_BASE_URL+'/gettingAll');
// export const createEmployee = (employee) => axios.post(REST_API_BASE_URL+'/saving',employee);
// export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/getting/'+employeeId);
// export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASE_URL+'/updating/'+employeeId,employee);
// export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/deleting/'+employeeId);