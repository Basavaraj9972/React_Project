import EmployeeComponent from './components/EmployeeComponent.jsx'
import FooterComponent from './components/FooterComponent'
import { HeaderComponent } from './components/HeaderComponent'
import ListEmployeecomponents from './components/ListEmployeecomponents'
import { BrowserRouter,Router,Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import LoginPagePhone from './components/LoginPagePhone'
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import LoginOTPPhone from "./components/LoginOTPPhone.jsx"
import Home from './components/Home.jsx'
import Restaurants from './components/Restaurants.jsx'
import MenuPage from "./components/MenuPage"; 
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import ForgetPassword from './components/ForgetPassword.jsx'
// import ChatGPT from
import OpenAIChatGPT from './components/OpenAIChatGPT.jsx'
import PaymentComponent from './components/PaymentComponent.jsx'
function App() {
  return (
    <>
    <BrowserRouter>
        {/* <HeaderComponent /> */}
        <Routes>
          {/* //http:localhost:3000 */}
          <Route path ='/' element = {<SignIn />}></Route>

           {/* //http:localhost:3000/SignUp */}
          <Route path ='/signup' element = {<SignUp />}></Route>

          {/* //http:localhost:3000/ChatGPT */}
          <Route path ='/OpenAIChatGPT' element = {<OpenAIChatGPT />}></Route>
          
          {/* //http:localhost:3000/ChatGPT */}
          <Route path ='/PaymentComponent' element = {<PaymentComponent />}></Route>

           {/* //http:localhost:3000/ChatGPT */}
          {/* <Route path ='/ChatGPT' element = {<ChatGPT />}></Route> */}

          {/* //http:localhost:3000/SignUp */}
          <Route path ='/signin' element = {<SignIn />}></Route>

           {/* //http:localhost:3000/login */}
           <Route path ='/PhoneOtp' element = {<LoginOTPPhone />}></Route>

            {/* //http:localhost:3000/login */}
           <Route path ='/forgetPassword' element = {<ForgetPassword />}></Route>

           {/* //http:localhost:3000/login */}
          <Route path ='/login' element = {<LoginPage />}></Route>
           {/* //http:localhost:3000/loginPhone */}
           <Route path ='/loginPhone' element = {<LoginPagePhone />}></Route>
          {/* //http:localhost:3000/employee */}
          <Route path ='/employees' element = {<ListEmployeecomponents />}></Route>
          {/* //http:localhost:3000/add-employee */}
          <Route path ='/add-Employee' element={<EmployeeComponent />}></Route>
          {/* //http:localhost:3000/edit-employee/1 */}
          <Route path ='/edit-Employee/:id' element={<EmployeeComponent />}></Route>
          
          {/* //http:localhost:3000/restaurants */}
          <Route path="/restaurants" element={<Restaurants />} />
          {/* Dashboard Route (only accessible if logged in) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <FooterComponent /> */}
    </BrowserRouter>
    </>
  )
}

export default App
