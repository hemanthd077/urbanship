import { useEffect, useState } from "react";
import Home from "../home/home"
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faMinus,
    faPlus,
    faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import vegImageIcon from "../../images/veg-icon.svg";
import nonVegImageIcon from "../../images/non-veg-icon.svg";
import cartpagebg from "../../images/cartpage-bg.svg";
import "./userCart.css"

const OrderCart =()=>{
    const [cartData,setCartData] = useState([])
    const [totalCartAmount,setTotalCartAmount] = useState([])
    async function fetchCartData(){
    await Axios.get("http://localhost:5052/FetchCartData")
    .then((response) => {
        console.log(("Cartresponse :",response.data.CartData));
        setCartData(response.data.CartData);
        setTotalCartAmount(response.data.TotalAmount)
    }).catch((e)=>{
    })
    }

    async function UpdateCartfn(ProductId,Status){
        await Axios.post("http://localhost:5052/UpdateCartData", {
            ProductId: ProductId,
            Status : Status, 
        }).then((response) => {
            if(response.status===200){
                fetchCartData()
            }
        });
    }

    useEffect(()=>{

    },[cartData,totalCartAmount])

    useEffect(()=>{
        fetchCartData()
    },[])

    return (
        <div className="main-out-block">
            <Home.NavContent
            PageActive={3}
            />
            <div className="rowFlex Outer-shopResult-data-carrtpage">
                <div>
                    <img src={cartpagebg} alt="" className="cartpage-bg"/>
                </div>
                <div className="columnFlex shop-header-content-block-cartpage">
                    <div className="cartlist-header-block">
                        <h3 className="cartlist-header-cartpage"><FontAwesomeIcon icon={faCartShopping} size="sm" /> Cart List</h3>
                    </div>
                    <div className="fillcolor-cartpage"></div>
                    <div className="columnFlex outer-productdata-block-cartpage">
                        {cartData.map((cartProducts,cartProductIndex)=>(
                            <div key={cartProductIndex} className="rowFlex single-product-block-cartpage">
                                <div className="rowFlex product-header-total-block-cartpage">
                                    {cartProducts.product[0]?
                                    <img src={vegImageIcon} alt="" className="typeicon-resultpage" />
                                    :
                                    <img src={nonVegImageIcon} alt="" className="typeicon-resultpage" />    
                                    }
                                    <div className="columnFlex">
                                        <h1 className="productTile-cartpage">{cartProducts.product[1]} ({cartProducts.product[2]})</h1>
                                        <p className="category-txt-cartpage">{cartProducts.product[7]}</p>
                                        <p className="cartpage-rupee rowFlex">
                                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                                            {cartProducts.product[3]}
                                        </p>
                                        <p className="availqty-txt-cartpage">Available QTY : {cartProducts.product[5]}</p>
                                    </div>
                                </div>
                                <div>
                                    <img
                                    src={"data:" + cartProducts.product[4]}
                                    alt="" 
                                    draggable="false"
                                    className="cartproduct-img-resultpage"
                                    />
                                    <div className="rowFlex cartaddminus-outer-div">
                                    <button className="cartaddminus-btn" type="button" onClick={()=>UpdateCartfn(cartProducts.product[6],false)}><FontAwesomeIcon icon={faMinus} /></button>
                                    <p>{cartProducts.count}</p>
                                    <button className="cartaddminus-btn" type="button" onClick={()=>UpdateCartfn(cartProducts.product[6],true)}><FontAwesomeIcon icon={faPlus} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="fillcolor-cartpage"></div>
                    <div className="rowFlex btn-checkout-popup-outerdiv-cartpage">
                        <div className="columnFlex">
                            <p className="Totalcost-cart-popup-header">Total Amount</p>
                            <p className="Totalcost-cart-popup-content">
                            <FontAwesomeIcon icon={faIndianRupeeSign}/>{" "}
                            {totalCartAmount}
                            </p>
                        </div>
                        <input
                            className="btn-checkout-popup"
                            type="button"
                            onClick={() => {
                            }}
                            value={"Order Now"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCart;