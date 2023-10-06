import {useNavigate} from "react-router-dom"
import './login.css';
import { useState } from "react";
import loginBg from  '../../images/login-bg.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import appIcon from '../../images/logo-no-background.svg'
import Axios from 'axios';

const Logo =()=>{
  return ( <>
            <img src={appIcon} alt="" className="appicon"/>
          </>)
}




const Login =()=>{
    const navigate = useNavigate();
    const [userData,setUserDatas] = useState({});
    const [uploadStatus,setUploadStatus] = useState(null);

    function AssignValue (e){
        let name = e.target.name;
        let value = e.target.value;
        setUserDatas((oldVAlue)=>{return {...oldVAlue,[name] : value}})
    }
    
    console.log("UD : ",userData);

    async function getLogin (e){
      e.preventDefault();
      try{
        await Axios.post('http://localhost:5052/login',{
          userData,
        }).then((response)=>{
          if(response.status===200){
            navigate('/home');
          }
        })
      }
      catch(e){
        console.log("Login Error : ",e);
        if(e.response.status ===401){
          setUploadStatus(e.response.data.message);
          setUserDatas((oldVAlue)=>{return {...oldVAlue,password : ""}})
        }
        else{
          setUploadStatus(e.response.data.message);
          setUserDatas((oldVAlue)=>{return {...oldVAlue,password : ""}})
          setUserDatas((oldVAlue)=>{return {...oldVAlue,email : ""}})
        }
      }
    }

    async function googlesignin(){
      try{
        await Axios.get('http://localhost:5052/google')
          .then((response)=>{
            console.log(response);
            if(response.status(200)){
              navigate('/home');
            }
        })
      }
      catch(e){
        console.log(e);
      }
    }

    return (
        <div className='main-outer'>
          <Logo/>
          <div className="img-div">
              <img src={loginBg} alt="" className="login-bg"/>
              <input className="navbtn-signup" type="submit" onClick={()=>navigate('/signup')} value={'Create an Account'}/>
          </div>
          <form action="/login" onSubmit={getLogin} method="post">
            <div className='Login-main-div'>
              <p className='login-header-txt'>Login</p>
              <div className='columnFlex'>
                <label className='label-text' htmlFor="email">Email</label>
                <input id='email' type="text" placeholder='Enter the Email' name="email" onChange={AssignValue} value={userData.email} required/> 
                <p className="font-awsome-icon"><FontAwesomeIcon icon={faEnvelope} size="sm"/></p>
              </div> 
              <div className='columnFlex'>
                <label className='label-text' htmlFor="password">Password</label>
                <input id='password' type="password" name="password" placeholder='Enter the Password' onChange={AssignValue} value={userData.password} required/>  
                <p className="font-awsome-icon"><FontAwesomeIcon icon={faLock} size="sm"/></p>
              </div> 
              <a href="/">Forget Password</a>
              {uploadStatus !== null ? <span className='status-condition-fail'>{uploadStatus}</span> : <></>}
              
              <p className='submit-btn-p'><input type='submit'  className='login-submit-btn' value={'Login'}/></p>
              <div className="OtherOption">
                <p className='or-txt' >Or Login with</p>
                <button id="continue-google" type="button" onClick={googlesignin}><p className="fa-google"><FontAwesomeIcon icon={faGoogle} size="lg" /></p></button>
              </div>
            </div>
          </form>
        </div>
    )
}



const LoginPagevalue = {Login,Logo}

export default LoginPagevalue;