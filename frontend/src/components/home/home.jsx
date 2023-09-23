import './home.css';
import Axios from 'axios';
import {useNavigate} from "react-router-dom"
import appiconimg from '../../images/logo-no-background.svg'
import homebg from '../../images/home-bg.svg'
import treesvg from '../../images/tree-svg.svg'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeftLong ,faLocationDot,faSpinner} from '@fortawesome/free-solid-svg-icons'

const NavContent = (props)=>{
    const navigate = useNavigate();
    async function logOutProcess(e){
        e.preventDefault()
        // await Axios.get(`http://localhost:5052/logout`)
        navigate('/login')
    }
    return  <>
                <nav className='Main-header-nav'>
                    <img className='appicon-nav' src={appiconimg} alt="" />
                    <div>
                        { props.status===true?
                            <button onClick={props.shopNowStatus} className='location-nav-content rowFlex'><FontAwesomeIcon icon={faLocationDot} size='lg' /> <p>{props.message}</p></button>
                            :
                            <button onClick={props.shopNowStatus} className='location-nav-content rowFlex'><FontAwesomeIcon icon={faLocationDot} size='lg'/> <p>Select the Landmark</p></button>
                        }
                    </div>
                    <div className='rowFlex nav-content-reference'>
                        { props.homeActive===true?
                            <form action="">
                                <button className='nav-btn-active'>Home</button>
                            </form>
                            :
                            <form action="">
                                <button className='nav-btn'>Home</button>
                            </form>
                        }

                        { props.orderActive===true?
                            <form action="">
                                <button className='nav-btn-active'>Order</button>
                            </form>
                            :
                            <form action="">
                                <button className='nav-btn'>Order</button>
                            </form>
                        }

                        { props.profileActive===true?
                            <form action="">
                                <button className='nav-btn-active'>Profile</button>
                            </form>
                            :
                            <form action="">
                                <button className='nav-btn'>Profile</button>
                            </form>
                        }
                        <form action="">
                            <button className='home-btn-shownow' onClick={logOutProcess}> Signout</button>
                        </form>
                    </div>
                </nav>
            </>
}

const LocationContent =(props)=>{

    const [locationData,setLocationData] = useState('');
   if(props.userLocation.length>0){
    var requestOptions = {
        method: 'GET',
      };

    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${props.userLocation}&lang=en&limit=1&bias=rect:67.36395565494513,6.299788133318117,97.99331987875428,36.34866466322184|countrycode:none&format=json&apiKey=ff07f1a05cb443aaa8940e7162a9b2e7`,requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if(result.results[0].city)
            setLocationData(result.results[0].city)
        else
            setLocationData('')
    })
    .catch(error => console.log('error', error));
   }
    if(locationData.length>0){
        function assignValue(e){
            e.preventDefault()
            props.onValueChange({locationData});
            setLocationData({locationData})
        }
        return  (
                    <button onClick={assignValue} className='suggestionBox-location rowFlex' value={locationData}>
                        <FontAwesomeIcon icon={faLocationDot} /> 
                        {locationData}
                    </button>
                )
    }
    else{
        return <></>
    }
            
}

const HomePage=()=>{

    const [activeState,setActiveState] = useState(true)
    const [userLocation,setUserLocation] = useState('');
    const [suggestionDiv,setSuggestionDiv] = useState(true);
    const [searchStatus,setSearchStatus] = useState(true);
    const [spinerStatus,setSpinnerStatus] = useState(true);

    function shopNowStatus(){
        if(activeState===false){
            setActiveState(true);
        }
        else{
            setActiveState(false);
        }
    }
    function setvalue(e){
        setUserLocation(e.target.value);
    }

    useEffect(()=>{

    },[spinerStatus])

    const handleChildValueChange = (value) => {
        setSuggestionDiv(false);
        setUserLocation(value.locationData);
        setSpinnerStatus(false);
        setTimeout(()=>{
            setSearchStatus(false)
        },2000)
      };
    
    return  (<>
                <div className='main-out-block'>
                    <NavContent message={userLocation} status={userLocation.length>0} shopNowStatus={shopNowStatus} homeActive={true} orderActive={false} profileActive={false}/>
                    {searchStatus===true?
                        <div className='inner-home-content'>
                            { activeState===true?
                                <div>
                                    <div className='main-txt-white-color'>
                                        <p>Make Healthy Life </p>
                                        <div className='rowFlex home-content-main'>
                                            <p>With </p>
                                            <p className='main-txt-color'>Fresh Grocery</p>
                                        </div>
                                        <p>Products <img className='treesvg-img' src={treesvg} alt="" /><img className='treesvg-img' src={treesvg} alt="" /></p>
                                    </div>
                                    <br />
                                    <p>Don't waste time in traffic or long lines. Your neighborhood's verified grocery stores are waiting to serve you.</p>
                                    <br />
                                    <button type='submit' onClick={shopNowStatus} className='home-btn-shownow'>Shop Now</button>
                                </div> 
                                : 
                                <form className='columnFlex search-block-home' action="">
                                    <button className='search-back-btn-home' onClick={shopNowStatus}><FontAwesomeIcon icon={faArrowLeftLong} size='lg'/> Back</button>
                                    <div className='columnFlex setlocation-div'>
                                        <input className='searchInput-home' type="text" name='Location' placeholder='Select Your Landmark' onChange={setvalue} value={userLocation} required autoComplete='off'/>
                                        {
                                            userLocation.length!=='' && userLocation.length>0 && suggestionDiv===true ?
                                            <LocationContent userLocation={userLocation} onValueChange={handleChildValueChange}/>
                                            :
                                            <></>
                                        }
                                        {spinerStatus===true ?
                                            <button className='home-btn-setlocation'>Search</button>
                                            :
                                            <p className='button-loading-home'><FontAwesomeIcon icon={faSpinner} spinPulse /></p>
                                        }
                                    </div>
                                </form>
                            }
                            <div>
                                <img className='home-homebg' src={homebg} alt="" />
                            </div>
                        </div>
                        :
                        <div className='main-out-block'>
                            <p>fdmgnnakmgfnakfmg</p>
                        </div>
                    }
                </div>
            </>)
}
const homeData = {HomePage,NavContent}

export default homeData;