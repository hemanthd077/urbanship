import './signup.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../login/login';
import signupbg from '../../images/signup-bg.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { faUser as usericon} from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import Axios from 'axios';

const Signup=()=>{
    const navigate = useNavigate();
    const [userData,setUserDatas] = useState({});
    const [uploadStatus,setUploadStatus] = useState(null);
    const [Status,setStatus] = useState(false);

    function AssignValue (e){
        let name = e.target.name;
        let value = e.target.value;
        setUserDatas((oldVAlue)=>{return {...oldVAlue,[name] : value}})
    }
    


    async function CreateUser(e){
        e.preventDefault();
        if(userData.password === userData.cpassword){
            try{
                await Axios.post('http://localhost:5052/signup',{
                    userData,
                }).then((response)=>{
                    setUploadStatus(response.data.message,"!!");
                    if(response.data.message ==="User Account Created Successfully"){
                        setStatus(true);
                    }
                    else{
                        setStatus(false);
                    }
                    if(response.status ===200){
                        const timerId =  setInterval(()=>{
                            navigate('/login')
                            clearTimeout(timerId);
                        },1000)
                    }
                }).catch(e=>{
                    console.log("Error in creating user Account ", e);
                })
            }
            catch(e){
                // console.log(e);
            }
        }
        else{
            setUserDatas((oldVAlue)=>{return {...oldVAlue,password : ""}})
            setUserDatas((oldVAlue)=>{return {...oldVAlue,cpassword : ""}})
            setUploadStatus("Password Not Matched");
        }
    }
    return (
        <>
            <div className='main-outer'>
                <Login.Logo/>
                <div className='img-div'>
                    <img src={signupbg} alt="" className='signupbg' />
                    <input type="submit" className='navbtn-login' onClick={()=>navigate('/')} value={'Login Here Now'}/>
                </div>
                <form action="/signup" method='post' onSubmit={CreateUser}>
                    <div className='signup-main-div'>
                        <p className='signup-header-txt'>Sign up</p>
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="fname">First Name</label>
                            <input id='fname' type="text" placeholder='Enter the First Name' name='fname' onChange={AssignValue} required/> 
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faUser} size="sm"/></p>
                        </div> 
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="lname">Last Name</label>
                            <input id='lname' type="text" placeholder='Enter the Last Name' name='lname' onChange={AssignValue} required/> 
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={usericon} size="sm"/></p>
                        </div> 
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="email">Email</label>
                            <input id='email' type="text" placeholder='Enter the Email' name='email' onChange={AssignValue} required/> 
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faEnvelope} size="sm"/></p>
                        </div> 
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="password">Password</label>
                            <input id='password' type="password" placeholder='Enter the Password' name='password' onChange={AssignValue} value={userData.password} required/>  
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faLock} size="sm"/></p>
                        </div>
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="cpassword">Confirm Password</label>
                            <input id='cpassword' type="password" placeholder='Re-enter the Password' name='cpassword' onChange={AssignValue} value={userData.cpassword} required/>  
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faLock} size="sm"/></p>
                        </div>
                        {(uploadStatus !== null && Status===true) ? <span className='status-condition'>{uploadStatus}</span>:<></>}
                        {(uploadStatus !== null && Status===false) ? <span className='status-condition-fail'>{uploadStatus}</span>:<></>}
                        
                        <p className='submit-btn-p'><input type='submit' className='signup-submit-btn' value={'Signup'}/></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;