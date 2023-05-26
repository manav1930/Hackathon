import { Link } from 'react-router-dom';
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import React , {useState} from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      email: 'test2@123gmail.com',
      password:'Test@123',
      // mobileNumber:""
  
  });

  const handleChange = name => (e) =>{
    // console.log(e.target.value);
    setValues({...values, [name]: e.target.value});
}


const handleSubmit = async (e) =>{
  console.log("yes hittting signin");
    e.preventDefault();
    try{
      console.log("hi23");
        const signinUser = await axios.post('http://localhost:6968/signin', {
            email,
            password,
            // mobileNumber
        });

        // console.log(signinUser);
        // navigate('/user/dashboard');

        if  (signinUser.data.sucess === true){
          console.log("yeah here also");
            setValues({ email: '', password:''});
            // toast.success("Log In successfully");
            navigate('/user/dashboard');
            if (typeof window !== "undefined") {
              localStorage.setItem("token",JSON.stringify(signinUser.data));
            }
          
        }
        

    } catch(err){
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
     
    }
}

const handlesignup = (e) => {
    try {
      navigate('/signup');
    } catch (err) {
       console.log(err.response.data.error);
        toast.error(err.response.data.error);
    }
}
  
  
  const { email, password,} = values;
    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false}/>

            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='login' />

                <form className='authform'>
                    <h1>Login</h1>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' 
                        id='email' 
                        value={email}
                        onChange={handleChange("email")}  
                         />
                    </div>

                    <div className='formgroup'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'
                        id='password'
                        value={password}
                        onChange={handleChange("password")}  
                         />
                    </div>

                    <Link to='/forgotpassword'
                        className='stylenone'
                    >
                        <p>Forgot password?</p>
                    </Link>
                    <Link to='/login'
                        className='stylenone'

                    >
                        <button className='btn' onClick={handleSubmit}  type="submit" value="Submit">Login</button>
                    </Link>
                    <h2 className='or'>OR</h2>
                    <Link to='/signup'
                        className='stylenone'
                    >
                        <button className='btn' onClick={handlesignup}  type="submit"  >Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login