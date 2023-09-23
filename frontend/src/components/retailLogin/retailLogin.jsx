import retailAppIcon from '../../images/retail-logo-no-background.svg'
import './retailLogin.css'
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import retailbg from  '../../images/retail-bg.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faBox } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import treesvg from '../../images/tree-svg.svg'
import retailhomebg from '../../images/retail-home-bg.svg'
import uploadImage from '../../images/Image upload-bg.svg'


const RetailLogo =()=>{
    return ( <>
              <img src={retailAppIcon} alt="" draggable="false"  className="appicon-retail"/>
            </>)
  }

  const RetailNav = (props)=>{
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(props.ShopStatus);
    const [ActivePage,setActivePage] = useState(props.CurrentActiveState)
    
    useEffect(() => {
        setIsChecked(props.ShopStatus);
      }, [props.ShopStatus]);

    const handleToggleClick = () => {
        Axios.post(`http://localhost:5052/updateShopStatus`,{
            state:!isChecked,
        }).then((response)=>{
            console.log("res2" , response.data.retailAccountData);
        }).catch((e)=>{
            console.log("Error Occured in fetchData : ",e);
        })
        setIsChecked((prevState) => !prevState);
    };

  

    useEffect(()=>{
        setActivePage(props.CurrentActiveState)
    },[props.CurrentActiveState])

    useEffect(()=>{
        AssignValue()
    },[ActivePage])


    function logOutProcess(e){
        e.preventDefault();
        navigate('/business')
    }

    function homeCall(e){
        e.preventDefault();
        setActivePage(1);
    }

    function orderCall(e){
        e.preventDefault();
        setActivePage(2);
    }

    function addProductCall(e){
        e.preventDefault();
        setActivePage(3);
    }

    function profileCall(e){
        e.preventDefault();
        setActivePage(4);
    }

    function AssignValue(){
        props.onValueChange({ActivePage});
    }
    return <>
                <nav className='Main-header-nav retailer-maindiv'>
                    <img className='appicon-nav' draggable="false"  src={retailAppIcon} alt="" />
                    <div>
                        <button className={isChecked ? "outer-button-state" : "outer-button-state1"} onClick={handleToggleClick}>
                            <div className={isChecked ? "activebutton" : "activebutton1"}></div>
                        </button>
                        </div>
                    <div className='rowFlex nav-content-reference'>
                        { ActivePage===1?
                            <button className='nav-btn-active-retail'>Dashboard</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={homeCall}>Dashboard</button>
                            </form>
                        }

                        { ActivePage===2?
                            <button className='nav-btn-active-retail'>Order</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={orderCall}>Order</button>
                            </form>
                        }

                        { ActivePage===3?
                            <button className='nav-btn-active-retail'>Add Product</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={addProductCall}>Add Product</button>
                            </form>
                        }

                        { ActivePage===4?
                            <button className='nav-btn-active-retail'>Profile</button>
                            :
                            <form action="">
                                <button className='nav-btn' onClick={profileCall}>Profile</button>
                            </form>
                        }
                        <form action="">
                            <button className='home-btn-shownow' onClick={logOutProcess}> Signout</button>
                        </form>
                    </div>
                </nav>
            </>
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
              navigate('/retailnav');
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

const RetailHome =()=>{
    const [CurrentActiveState,setCurrentActiveState] = useState(1);
    const [ShopStatus,setShopStatus] = useState(false);
    const [image, setImage] = useState(null);
    const [addProductData,setAddProductData] = useState({});
    const [addImageData,setAddImageData] = useState(null);
    const [productUploadStatus,setProductUploadStatus] = useState(0)


    function AssignProductValue (e){
        let name = e.target.name;
        let value = e.target.value;
        setAddProductData((oldVAlue)=>{return {...oldVAlue,[name] : value}})
    }


    const handleChildValueChange = (value) => {
        setCurrentActiveState(value.ActivePage);
      };

    function chamgeState(){
        setCurrentActiveState(2)
    }

    const fetchData=(e)=>{
        Axios.get(`http://localhost:5052/retailAccountData`).then((response)=>{
            setShopStatus(response.data.retailAccountData[0])
        }).catch((e)=>{
            console.log("Error Occured in fetchData : ",e);
        })
    }
      
    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{

    },[CurrentActiveState])

    
    const UploadProduct = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductImage',addImageData)
        formData.append('addProductData', JSON.stringify(addProductData));
        Axios.post(`http://localhost:5052/retailAddProduct`,
          formData,{
        }).then((response)=>{
            if(response.status===200){
                setProductUploadStatus(1)
            }
        }).catch((e)=>{
            if(e.response.status===401){
                setProductUploadStatus(2)
            }
            console.log("Error Occured in UploadProduct: ",e);
        })

    }


    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        setAddImageData(e.target.files[0])
        if (selectedImage) {
        setImage(URL.createObjectURL(selectedImage));
        }
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedImage = e.dataTransfer.files[0];
        if (droppedImage) {
            setImage(URL.createObjectURL(droppedImage));
        }
    };
    
    const preventDefault = (e) => {
        e.preventDefault();
    }

    return  <>
                <div className='retailMain-homepage-content'>
                    <RetailNav CurrentActiveState={CurrentActiveState}  onValueChange={handleChildValueChange} ShopStatus={ShopStatus} />
                    {CurrentActiveState===1 ?
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
                                <button className='home-btn-shownow' onClick={chamgeState}><FontAwesomeIcon icon={faBox} /> Recent Orders</button>
                            </div>
                            <div>
                                <img src={retailhomebg} alt="" draggable="false"  className='home-homebg' />
                            </div>
                        </div> 
                        :
                        <></>
                    }
                    {CurrentActiveState===2?
                        <div className='inner-retailpage-content rowFlex'>
                            <h1>ORDER</h1>
                        </div>
                        :
                        <></>
                    }

                    {CurrentActiveState===3?
                        <div className='columnFlex outermain-addproduct'>
                            <div className='inner-retailpage-content rowFlex addproduct-main-outer'>
                                <form className='rowFlex addproduct-outer-div' onSubmit={UploadProduct}>
                                    <div className='columnFlex first-imagediv-addproduct'>
                                        <div className="image-upload-container">
                                            <div className={`image-upload-box ${image ? 'image-selected' : ''}`} onDrop={handleDrop} onDragOver={preventDefault}>
                                                {image ? (
                                                <img src={image} alt="Uploaded" draggable="false"  className="uploaded-image" />
                                                ) : (
                                                    <div className='columnFlex'>
                                                        <img src={uploadImage} alt="" draggable="false"  className='uploadImage-addproduct' />
                                                        <p className='UploadDiv-inner-content-txt'>Drag & Drop or Browse to Upload</p>
                                                    </div>
                                                )}
                                            </div>
                                            <br />
                                            <input type="file" id="file-input" accept="image/*" name='ProductImage' onChange={handleImageUpload} required/>
                                            <label htmlFor="file-input" className="browse-button">Browse</label>
                                        </div>
                                        <div>
                                            {productUploadStatus===0?
                                                <span className='status-condition'>Product Uploaded Successfully</span>
                                                : 
                                                <></>
                                            }
                                            {productUploadStatus===2? 
                                                <span className="status-condition-fail">Product Uploaded Failed</span>
                                                : 
                                                <></>
                                            }
                                        </div>
                                    </div>
                                    <div className='columnFlex input-datacontent-addproduct'>
                                        <div className='columnFlex inner-ap-content-div'>
                                            <label htmlFor="ProductName-AP">Product Name</label>
                                            <input className='Addproduct-input' type="text" name="ProductName" onChange={AssignProductValue} id="ProductName-AP" placeholder='Enter the Product Name' required />
                                        </div>
                                        <div className='columnFlex inner-ap-content-div'>
                                            <label htmlFor="Category-AP">Product Category</label>
                                            <select className='Addproduct-input-select' name="Catagory" onChange={AssignProductValue} id="Category-AP">
                                                <option value="" className='suggest-option'>Select the Category</option>
                                                <option value="Fruits Vegetables Herbs">Fruits ,Vegetables or Herbs</option>
                                                <option value="Dairy">Dairy</option>
                                                <option value="Meat Protein">Meat and Protein</option>
                                                <option value="Bakery">Bakery</option>
                                                <option value="Canned Goods">Canned Goods</option>
                                                <option value="Pasta Grains">Pasta and Grains</option>
                                                <option value="Baking Supplies">Baking Supplies</option>
                                                <option value="Condiments Sauces">Condiments and Sauces</option>
                                                <option value="Snacks">Snacks</option>
                                                <option value="Beverages">Beverages</option>
                                                <option value="Frozen Foods">Frozen Foods</option>
                                                <option value="Cereal Breakfast">Cereal and Breakfast Foods</option>
                                                <option value="Spices Seasonings">Spices and Seasonings</option>
                                                <option value="CannedMeat Seafood">Canned Meat and Seafood</option>
                                                <option value="Baby Care">Baby Care</option>
                                                <option value="Household Cleaning">Household and Cleaning</option>
                                                <option value="Personal Care">Personal Care</option>
                                                <option value="Health Wellness">Health and Wellness</option>
                                                <option value="PetSupplies">Pet Supplies</option>
                                            </select>
                                        </div>
                                        <div className='rowFlex inner-addproduct-divider'>
                                            <div className='columnFlex inner-ap-content-div'>
                                                <label htmlFor="Quanity-AP">Net Weight</label>
                                                <input className='Addproduct-input-inner' type="number" min="1" name="netWeight" onChange={AssignProductValue}  id="Quanity-AP" placeholder='Enter the Net Weight' required/>
                                            </div>
                                            <div className='columnFlex inner-ap-content-div'>
                                                <label htmlFor="ProductType-AP">Product Standards</label>
                                                <select className='Addproduct-input-select-inner' name="Standards" onChange={AssignProductValue} id="ProductType-AP">
                                                    <option className='suggest-option' value="">Select the Standards</option>
                                                    <option value="gram">g - (gram)</option>
                                                    <option value="kg">kg - (KiloGram)</option>
                                                    <option value="Pcs">Pcs - (Pieces)</option>
                                                    <option value="Pc">Pc - (Piece)</option>
                                                    <option value="Ml">Ml - (MiliLiter)</option>
                                                    <option value="L">L - (Liter)</option>
                                                    <option value="Qty">Qty - (Quantity)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='columnFlex inner-ap-content-div'>
                                            <label htmlFor="Quanity-AP">Quanity</label>
                                            <input className='Addproduct-input' type="number" min="1" name="Quantity" onChange={AssignProductValue}  id="Quanity-AP" placeholder='Enter the Available Quantity' required/>
                                        </div>
                                        <div className='columnFlex inner-ap-content-div'>
                                            <label htmlFor="Price-AP">Price</label>
                                            <input className='Addproduct-input' type="number" name="Price" onChange={AssignProductValue} id="Price-AP" placeholder='Enter the Price per Quantity in Rupee' />
                                        </div>
                                        <div className='rowFlex publishbtn-final'>
                                            <input className='publish-product-btn' type="submit" value={"Publish Product"}/>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h1>Your Products🔥🔥</h1>
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {CurrentActiveState===4?
                        <div className='inner-retailpage-content rowFlex'>
                            <h1>Profile</h1>
                        </div>
                        :
                        <></>
                    }
                    
                </div>
            </>
}

const retailContent = {RetailNav,RetailLogin,RetailHome}

export default retailContent;