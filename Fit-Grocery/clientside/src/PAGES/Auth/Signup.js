import React , {useState} from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './AuthPage.css'
const Signup = () => {
    const [values, setValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirm_password: "",
        college:"",
        year:"",
        gender:"",
        mobileNumber:"",
        branch:"",
        field:"",
      });
    
    const {fname,lname,email,password,confirm_password,college,year,gender,mobileNumber,branch,field} = values;
    


    

    const handleChange= name => (e) => {
        // console.log(e.target.value);
        setValues({...values,[name]:e.target.value});
    
      };
      const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const signUser = await axios.post("http://localhost:6968/signup",{
              fname,
              lname,
              email,
              password,
              confirm_password,
              college,
              year,
              gender,
              mobileNumber,
              branch,
              field,
            });

            console.log(signUser);

            if(signUser.data.success === true){
                setValues({
                  fname: "",
                  lname:"",
                  email: "",
                  password: "",
                  confirm_password: "",
                  college:"",
                  year:"",
                  gender:"",
                  mobileNumber:"",
                  branch:"",
                  field:"",           
                     });
                toast.success("Sign up successfully, please Login!");
               
                };
        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);

        }
      }
    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false}/>

            <div className='authcont'>
                <img src='https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                    alt='signup' />

                <form className='authform'>
                    <h1>Signup</h1>
                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='fname'>First Name</label>
                            <input type='text' 
                            id='fname' 
                            onChange={handleChange("fname")}
                            value={fname}
                            required
                            />
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='lname'>Last Name</label>
                            <input type='text' 
                            id='lname'
                            onChange={handleChange("lname")}
                            value={lname}
                            required
                             />
                        </div>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' 
                        id='email'
                        onChange={handleChange("email")}
                        value={email}
                        required
                         />
                    </div>

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='password'>Password</label>
                            <input type='password'
                             id='password'
                             onChange={handleChange("password")}
                            value={password}
                            required
                              />
                        </div>
                        <div className='formgroup'>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input type='password' 
                        id='cpassword'
                        onChange={handleChange("confirm_password")}
                        value={confirm_password}
                        required
                         />
                    </div>
                    </div>

                    <Link to='/login'
                        className='stylenone'
                    >
                        <p>Already have an account?</p>
                    </Link>
                    <Link to='/signup'
                        className='stylenone'
                    >
                        <button className='btn' onClick={handleSubmit} type="submit">Signup</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Signup