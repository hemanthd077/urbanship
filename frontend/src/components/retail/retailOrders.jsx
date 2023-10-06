import './retail.css'
import { useEffect, useState } from "react";
import Axios from 'axios';
import RetailHome from './retailHome'


const RetailOrder =()=>{
    const [ShopStatus,setShopStatus] = useState(false);

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

    return  <>
                <div className='retailMain-homepage-content'>
                    <RetailHome.RetailNav CurrentActiveState={2}  ShopStatus={ShopStatus} onValueChange={handleChildValueChange}/>
                    <div className='inner-retailpage-content rowFlex'>
                        <h1>ORDER</h1>
                    </div>
                </div>
            </>
}


export default RetailOrder;