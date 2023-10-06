import './retail.css'
import retailAppIcon from '../../images/retail-logo-no-background.svg'
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import treesvg from '../../images/tree-svg.svg'
import retailhomebg from '../../images/retail-home-bg.svg'

const RetailNav = (props)=>{
    useEffect(()=>{
        fetchData();
    },[])

    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState("");

    const fetchData=(e)=>{
        Axios.get(`http://localhost:5052/retailAccountData`).then((response)=>{
            if(isChecked!==response.data.retailAccountData[0]){
                setIsChecked(response.data.retailAccountData[0])
            }
        }).catch((e)=>{
            console.log("Error Occured in fetchData : ",e);
        })
    }

    function logOutProcess(e){
        e.preventDefault();
        navigate('/business')
    }

    function DashboardNav(e){
        e.preventDefault();
        navigate('/retailDashboard')
    }

    function OrderNav(e){
        e.preventDefault();
        navigate('/retailOrder')
    }


    function ProductNav(e){
        e.preventDefault();
        navigate('/retailProduct')
    }

    function ProfileNav(e){
        e.preventDefault();
        navigate('/retailProfile')
    }

    useEffect(()=>{

    },[isChecked])


    const handleToggle = (e) => {
        Axios.post(`http://localhost:5052/updateShopStatus`,{
                    state:!isChecked,
                }).then((response)=>{
                    console.log("res2" , response.data.retailAccountData);
                }).catch((e)=>{
                    console.log("Error Occured in fetchData : ",e);
                })
                setIsChecked((prevState) => !prevState);
                props.onValueChange(isChecked);
      }

    return <>
                <nav className='Main-header-nav retailer-maindiv'>
                    <img className='appicon-nav' draggable="false"  src={retailAppIcon} alt="" />
                    <div>
                        {isChecked!==""?
                            <label className="switch">
                                <input type="checkbox" id="toggleSwitch" checked={isChecked} onChange={handleToggle}/>
                                <span className="slider">
                                    <span className="on-text">Shop Opened</span>
                                    <span className="off-text">Shop Closed</span>
                                </span>
                            </label>
                            :
                            <></>
                        }
                        
                    </div>
                    <div className='rowFlex nav-content-reference'>
                        { props.CurrentActiveState===1?
                            <button className='nav-btn-active-retail' onClick={DashboardNav} >Dashboard</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={DashboardNav}>Dashboard</button>
                            </form>
                        }

                        { props.CurrentActiveState===2?
                            <button className='nav-btn-active-retail' onClick={OrderNav}>Order</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={OrderNav}>Order</button>
                            </form>
                        }

                        { props.CurrentActiveState===3?
                            <button className='nav-btn-active-retail' onClick={ProductNav}>Products</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={ProductNav}>Products</button>
                            </form>
                        }

                        { props.CurrentActiveState===4?
                            <button className='nav-btn-active-retail' onClick={ProfileNav}>Profile</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={ProfileNav}>Profile</button>
                            </form>
                        }
                        <form action="">
                            <button className='home-btn-shownow' onClick={logOutProcess}> Signout</button>
                        </form>
                    </div>
                </nav>
            </>
  }



const RetailHome =()=>{
    const [ShopStatus,setShopStatus] = useState(true);
    const navigate = useNavigate()

    const fetchData=(e)=>{
        Axios.get(`http://localhost:5052/retailAccountData`).then((response)=>{
            setShopStatus(response.data.retailAccountData[0])
        }).catch((e)=>{
            console.log("Error Occured in fetchData : ",e);
        })
    }

    const handleChildValueChange = (newValue) => {
    };
      
    useEffect(()=>{
        fetchData()
    },[])

    function ordernav(e){
        e.preventDefault();
        navigate('/retailOrder')
    }

    return  <>
                <div className='retailMain-homepage-content'>
                    <RetailNav CurrentActiveState={1} ShopStatus={ShopStatus} onValueChange={handleChildValueChange}/>
                        <div className='inner-retailpage-content rowFlex'>
                                <div>
                                    <div className='main-txt-white-color'>
                                        <p>Make healthy Life</p>
                                        <div className='rowFlex home-content-main'>
                                            <p>with your </p>
                                        </div>
                                        <p className='main-txt-color'>fresh grocery <img className='treesvg-img' draggable="false"  src={treesvg} alt="" /><img draggable="false"  className='treesvg-img' src={treesvg} alt="" /></p>
                                    </div>
                                    <br />
                                    <p>A satisfied customer is the best advertisement. Give them quality,<br />and they'll become your advocates</p>
                                    <br />
                                    <button className='home-btn-shownow' onClick={ordernav}><FontAwesomeIcon icon={faBox} /> Recent Orders</button>
                                </div>
                                <div>
                                    <img src={retailhomebg} alt="" draggable="false"  className='home-homebg' />
                                </div>
                            </div>
                </div>
            </>
}

const RetailHomeContent = {RetailNav,RetailHome}

export default RetailHomeContent;