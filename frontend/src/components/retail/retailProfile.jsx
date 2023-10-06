import './retail.css'
import { useEffect, useState } from "react";
import Axios from 'axios';
import RetailHome from './retailHome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare} from '@fortawesome/free-regular-svg-icons'

const RetailProfile =()=>{
    const [ShopStatus,setShopStatus] = useState(false);
    const [ProfileDetails,setProfileDetails] = useState("");
    const [isChecked,setIsChecked] = useState(true);

    const fetchProfileData=(e)=>{
        Axios.get(`http://localhost:5052/retailProfileData`).then((response)=>{
            setShopStatus(response.data.ProfileData[1]);
            setProfileDetails(response.data.ProfileData);
        }).catch((e)=>{
            console.log("Error Occured in fetchData : ",e);
        })
    }
    useEffect(()=>{

    },ShopStatus)

    const handleChildValueChange = (newValue) => {
        setShopStatus(!newValue);
      };
      
    useEffect(()=>{
        fetchProfileData()
    },[isChecked])

    return  <>
                <div className='retailMain-homepage-content'>
                    <RetailHome.RetailNav CurrentActiveState={4} ShopStatus={ShopStatus} onValueChange={handleChildValueChange}/>
                    <div className='inner-retailpage-content columnFlex '>
                        <div className='outer-Main-profile-div columnFlex'>
                        { ProfileDetails.length>0?
                            <div className='columnFlex profile-outer-content-div'>
                                <div className='Profile-outer-Main-block columnFlex'>
                                    <button type='submit' className='Profile-edit-btn' ><FontAwesomeIcon icon={faPenToSquare} size='lg' /></button>
                                    <img className='ShopImage-profile' src={"data:"+ProfileDetails[0]} alt="" />
                                    {ShopStatus?
                                        <>
                                            <div className='profile-shop-status-content bill-board-open rowFlex'>
                                                <p>Shop Opened</p> 
                                            </div>
                                            <hr className='billboard-stick-profile-open' />
                                        </>
                                        : 
                                        <>
                                            <div className='profile-shop-status-content bill-board-close rowFlex'>
                                                <p>Shop Opened</p> 
                                            </div>
                                            <hr className='billboard-stick-profile-close' />
                                        </>
                                     }
                                    
                                </div>
                                <div className='columnFlex profile-Main-content-div'>
                                    <h1 className='shopName-profile'><FontAwesomeIcon icon={faShop} size='2xs' /> {ProfileDetails[2]}</h1>
                                    <p className='shopLocation-profile'>{ProfileDetails[3]}</p>
                                    <p><FontAwesomeIcon icon={faEnvelope} /> {ProfileDetails[4]}</p>
                                </div>
                            </div>
                        :
                        <></>
                        }
                        </div>
                    </div>
                </div>
            </>
}


export default RetailProfile;