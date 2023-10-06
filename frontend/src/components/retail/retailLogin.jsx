import retailAppIcon from '../../images/retail-logo-no-background.svg'
import './retail.css'
import {useNavigate} from "react-router-dom"
import {useState } from "react";
import retailbg from  '../../images/retail-bg.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';


const RetailLogo =()=>{
    return ( <>
              <img src={retailAppIcon} alt="" draggable="false"  className="appicon-retail"/>
            </>)
  }

const RetailLogin = ()=>{

    const navigate = useNavigate();
    const [retailData,setRetailDatas] = useState({});
    const [uploadStatus,setUploadStatus] = useState(null);

    function AssignValue (e){
        let name = e.target.name;
        let value = e.target.value;
        setRetailDatas((oldVAlue)=>{return {...oldVAlue,[name] : value}})
    }

    async function getLogin (e){
        e.preventDefault();
        try{
          await Axios.post('http://localhost:5052/retaillogin',{
            retailData,
          }).then((response)=>{
            console.log("Response" , response);
            if(response.status===200){
              navigate('/retailDashboard');
            }
          })
        }
        catch(e){
          console.log("Login Error : ",e);
          if(e.response.status ===401){
            setUploadStatus(e.response.data.message);
            setRetailDatas((oldVAlue)=>{return {...oldVAlue,password : ""}})
          }
          else{
            setUploadStatus(e.response.data.message);
            setRetailDatas((oldVAlue)=>{return {...oldVAlue,password : ""}})
            setRetailDatas((oldVAlue)=>{return {...oldVAlue,email : ""}})
          }
        }
      }


    return  <>
                <div className='main-out-block rowFlex retaillogin-main'>
                    <RetailLogo/>
                    <img src={retailbg} alt="" className="login-bg" draggable="false" />
                    <form action="/login" method="post" onSubmit={getLogin} className='Login-main-div'>
                        <p className='login-header-txt'>Retailer Login</p>
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="email">Email</label>
                            <input id='email' type="text" placeholder='Enter the Email' name="email" onChange={AssignValue} value={retailData.email} required/> 
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faEnvelope} size="sm"/></p>
                        </div> 
                        <div className='columnFlex'>
                            <label className='label-text' htmlFor="password">Password</label>
                            <input id='password' type="password" name="password" placeholder='Enter the Password' onChange={AssignValue} value={retailData.password} required/>  
                            <p className="font-awsome-icon"><FontAwesomeIcon icon={faLock} size="sm"/></p>
                        </div> 
                        <a href="/">Forget Password</a>
                        {uploadStatus !== null ? <span className='status-condition-fail'>{uploadStatus}</span> : <></>}
                        
                        <p className='submit-btn-p'><input type='submit'  className='login-submit-btn' value={'Login'}/></p>
                    </form>
                    
                </div>
            </>
}


const retailContent = {RetailLogin}

export default retailContent;