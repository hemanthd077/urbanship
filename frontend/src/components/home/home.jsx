import "./home.css";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import appiconimg from "../../images/logo-no-background.svg";
import homebg from "../../images/home-bg.svg";
import treesvg from "../../images/tree-svg.svg";
import fireEmoji from "../../images/fire-icon.svg";
import noresultbg from "../../images/no shop.svg";
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faLocationDot,
  faSpinner,
  faStar,
  faStore,
  faIndianRupeeSign,
  faBagShopping,
  faMinus,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import vegImageIcon from "../../images/veg-icon.svg";
import nonVegImageIcon from "../../images/non-veg-icon.svg";

const NavContent = (props) => {
  const navigate = useNavigate();
  const [userLandmark, setUserLandmark] = useState(props.message);
  async function logOutProcess(e) {
    e.preventDefault();
    // await Axios.get(`http://localhost:5052/logout`)
    navigate("/login");
  }

  function HomeCall(e) {
    e.preventDefault();
    navigate("/home");
  }

  function OrderCall(e) {
    e.preventDefault();
    navigate("/userOrder");
  }

  function CartCall(e) {
    e.preventDefault();
    navigate("/userCart");
  }

  function ProfileCall(e) {
    e.preventDefault();
    navigate("/userProfile");
  }
  useEffect(() => {
    userLandmarkFetch();
  }, [props.message]);

  useEffect(() => {}, [userLandmark]);

  async function userLandmarkFetch() {
    await Axios.get(`http://localhost:5052/userLandmarkFetch`).then(
      (result) => {
        setUserLandmark(result.data.Landmark);
      }
    );
  }

  function PagetoHome() {
    navigate("/home");
  }

  return (
    <>
      <nav className="Main-header-nav">
        <img className="appicon-nav" src={appiconimg} alt="" />
        <div>
          {props.PageActive === 1 && props.resultPage === false ? (
            <div>
              {userLandmark.length > 0 ? (
                <button
                  onClick={props.shopNowStatus}
                  className="location-nav-content rowFlex"
                >
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />{" "}
                  <p>{userLandmark}</p>
                </button>
              ) : (
                <button
                  onClick={props.shopNowStatus}
                  className="location-nav-content rowFlex"
                >
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />{" "}
                  <p>Select the Landmark</p>
                </button>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={PagetoHome}
                className="location-nav-content rowFlex"
              >
                <FontAwesomeIcon icon={faLocationDot} size="lg" />{" "}
                <p>{userLandmark}</p>
              </button>
            </div>
          )}
        </div>
        <div className="rowFlex nav-content-reference">
          {props.PageActive === 1 ? (
            <form action="">
              <button className="nav-btn-active" onClick={HomeCall}>
                Home
              </button>
            </form>
          ) : (
            <form action="">
              <button className="nav-btn" onClick={HomeCall}>
                Home
              </button>
            </form>
          )}

          {props.PageActive === 2 ? (
            <form action="">
              <button className="nav-btn-active" onClick={OrderCall}>
                Order
              </button>
            </form>
          ) : (
            <form action="">
              <button className="nav-btn" onClick={OrderCall}>
                Order
              </button>
            </form>
          )}

          {props.PageActive === 3 ? (
            <form action="">
              <button className="nav-btn-active" onClick={CartCall}>
                Cart
              </button>
            </form>
          ) : (
            <form action="">
              <button className="nav-btn" onClick={CartCall}>
                Cart
              </button>
            </form>
          )}

          {props.PageActive === 4 ? (
            <form action="">
              <button className="nav-btn-active" onClick={ProfileCall}>
                Profile
              </button>
            </form>
          ) : (
            <form action="">
              <button className="nav-btn" onClick={ProfileCall}>
                Profile
              </button>
            </form>
          )}
          <form action="">
            <button className="home-btn-shownow" onClick={logOutProcess}>
              {" "}
              Signout
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

const LocationContent = (props) => {
  const [locationData, setLocationData] = useState("");
  if (props.userLocation.length > 0) {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${props.userLocation}&lang=en&limit=1&bias=rect:67.36395565494513,6.299788133318117,97.99331987875428,36.34866466322184|countrycode:none&format=json&apiKey=ff07f1a05cb443aaa8940e7162a9b2e7`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.results[0].city) setLocationData(result.results[0].city);
        else setLocationData("");
      })
      .catch((error) => console.log("error", error));
  }
  if (locationData.length > 0) {
    function assignValue(e) {
      e.preventDefault();
      props.onValueChange({ locationData });
      setLocationData({ locationData });
    }
    return (
      <button
        onClick={assignValue}
        className="suggestionBox-location rowFlex"
        value={locationData}
      >
        <FontAwesomeIcon icon={faLocationDot} />
        {locationData}
      </button>
    );
  } else {
    return <></>;
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeState, setActiveState] = useState(true);
  const [userLocation, setUserLocation] = useState("");
  const [suggestionDiv, setSuggestionDiv] = useState(true);
  const [spinerStatus, setSpinnerStatus] = useState(true);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    fetchShopData();
  }, []);

  async function fetchShopData() {
    await Axios.get("http://localhost:5052/productShopSearch").then(
      (response) => {
        setResultData(response.data.availShopData);
      }
    );
  }

  useEffect(() => {}, [userLocation]);

  function shopNowStatus() {
    if (activeState === false) {
      setActiveState(true);
    } else {
      setActiveState(false);
    }
  }
  function setvalue(e) {
    setUserLocation(e.target.value);
  }

  useEffect(() => {}, [spinerStatus]);

  useEffect(() => {
    setSpinnerStatus(true);
    fetchShopData();
  }, [activeState]);

  const handleChildValueChange = async (value) => {
    setSuggestionDiv(false);
    setUserLocation(value.locationData);
    setSpinnerStatus(false);

    await Axios.post("http://localhost:5052/userLandmarkSet", {
      Location: value.locationData,
    }).then((response) => {
      if (response.status === 200) {
        setUserLocation(value.locationData);
      }
      setTimeout(() => {
        setSpinnerStatus(!spinerStatus);
        setActiveState(true);
      }, 2000);
    });
  };

  const productHandleClick = async (ProductIndex) => {
    navigate(`/ShopResult/${ProductIndex}`);
  };

  return (
    <>
      <div className="main-out-block">
        <NavContent
          message={userLocation}
          status={userLocation.length > 0}
          shopNowStatus={shopNowStatus}
          PageActive={1}
          resultPage={false}
        />
        <div className="Scrollbar-div-main columnFlex">
          <div className="inner-home-content">
            {activeState === true ? (
              <div>
                <div className="main-txt-white-color">
                  <p>Make Healthy Life </p>
                  <div className="rowFlex home-content-main">
                    <p>With </p>
                    <p className="main-txt-color">Fresh Grocery</p>
                  </div>
                  <p>
                    Products{" "}
                    <img className="treesvg-img" src={treesvg} alt="" />
                    <img className="treesvg-img" src={treesvg} alt="" />
                  </p>
                </div>
                <br />
                <p>
                  Don't waste time in traffic or long lines. Your neighborhood's
                  verified grocery stores are waiting to serve you.
                </p>
                <br />
                <button
                  type="submit"
                  onClick={shopNowStatus}
                  className="home-btn-shownow"
                >
                  Change Location
                </button>
              </div>
            ) : (
              <form className="columnFlex search-block-home" action="">
                <button
                  className="search-back-btn-home"
                  onClick={shopNowStatus}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} size="lg" /> Back
                </button>
                <div className="columnFlex setlocation-div">
                  <input
                    className="searchInput-home"
                    type="text"
                    name="Location"
                    placeholder="Select Your Landmark"
                    onChange={setvalue}
                    value={userLocation}
                    required
                    autoComplete="off"
                  />
                  {userLocation.length !== "" &&
                  userLocation.length > 0 &&
                  suggestionDiv === true ? (
                    <LocationContent
                      userLocation={userLocation}
                      onValueChange={handleChildValueChange}
                    />
                  ) : (
                    <></>
                  )}
                  {spinerStatus === true ? (
                    <button className="home-btn-setlocation">Search</button>
                  ) : (
                    <p className="button-loading-home">
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </p>
                  )}
                </div>
              </form>
            )}
            <div>
              <img className="home-homebg" src={homebg} alt="" />
            </div>
          </div>
          <div className="resultContent-div-home">
            {resultData.length > 0 ? (
              <>
                <h1 className="result-title-home rowFlex">
                  Shops Nearby
                  <img className="fireemoji-home" src={fireEmoji} alt="" />
                </h1>
                <div className="rowFlex outer-main-home-shopdata">
                  {resultData.map((ShopAvail, index) => (
                    <button
                      key={index}
                      className="btn-shop-data"
                      onClick={() => productHandleClick(index)}
                    >
                      <div className="Outer-shop-block ColumnFlex">
                        <div className="image-comtent-div">
                          <img
                            className="Home-shopimage"
                            src={"data:" + ShopAvail[0]}
                            alt=""
                          />
                        </div>
                        <div className="columnFlex">
                          <div className="Shop-content-block columnFlex">
                            <p className="home-shopname rowFlex">
                              <FontAwesomeIcon icon={faStore} /> {ShopAvail[1]}
                            </p>
                            <p className="home-shoplocation">{ShopAvail[2]}</p>
                          </div>
                          {ShopAvail[3] !== 0 ? (
                            <div className="columnFlex home-rating-box">
                              <p className="home-shoprating">{ShopAvail[3]}</p>
                              <div>
                                <FontAwesomeIcon icon={faStar} size="2xs" />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} size="2xs" />
                              </div>
                            </div>
                          ) : (
                            <div className="columnFlex home-rating-box">
                              <p className="home-shoprating">0.0</p>
                              <div>
                                <FontAwesomeIcon icon={faStar} size="2xs" />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} size="2xs" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="resultContent-notavalaiblediv-home columnFlex">
                  <img src={noresultbg} alt="" className="img-noresult" />
                  <p className="disclimer-txt-noresult">
                    We are actively working to bring our services to your
                    location soon.
                    <br />
                    Stay tuned!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ShopResult = () => {
  const navigate = useNavigate();
  const { ProductIndex } = useParams();
  const [shopTotalData, setShopTotalData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartBagStatus, setCartBagStatus] = useState(true);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [cartData,setCartData] = useState([]);
  const [totalCartAmount,setTotalCartAmount] = useState(0);

  async function initialFetch() {
    await Axios.post("http://localhost:5052/productShopDetails", {
      ProductIndex: ProductIndex,
    }).then((response) => {
      setProductData(response.data.ProductData);
      setShopTotalData(response.data.ShopTotalData);
      setTimeout(() => {
        setLoaderStatus(false);
      }, 2500);
    });
  }

  useEffect(() => {}, [loaderStatus]);

  useEffect(() => {
    setFilteredItems(
      productData.filter((category) => {
        return category.products.some((product) => {
          if (filter === "all") {
            return true;
          } else if (filter === "true") {
            return product[6] === true;
          } else if (filter === "false") {
            return product[6] === false;
          }
          return false;
        });
      })
    );
  }, [filter, productData]);

  useEffect(() => {}, [filteredItems]);

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {}, [cartBagStatus]);

  function cartBagDivStatus() {
    setCartBagStatus(!cartBagStatus);
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

  async function fetchCartData(){
    await Axios.get("http://localhost:5052/FetchCartData")
    .then((response) => {
      setCartData(response.data.CartData);
      setTotalCartAmount(response.data.TotalAmount)
    }).catch((e)=>{
      if(e.response.status===401){
        console.log(e.response.data.message);
      }
    })
  }

  useEffect(()=>{
    fetchCartData()
  },[])

  return (
    <>
      {loaderStatus ? (
        <main className="loding-block-main-div">
          <svg
            className="pl1"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
          >
            <defs>
              <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#000" />
                <stop offset="100%" stop-color="#fff" />
              </linearGradient>
              <mask id="pl-mask">
                <rect x="0" y="0" width="128" height="128" fill="#34344e" />
              </mask>
            </defs>
            <g fill="#30c06b">
              <g className="pl1__g">
                <g transform="translate(20,20) rotate(0,44,44)">
                  <g className="pl1__rect-g">
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                    />
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                      transform="translate(0,48)"
                    />
                  </g>
                  <g className="pl1__rect-g" transform="rotate(180,44,44)">
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                    />
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                      transform="translate(0,48)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g fill="#ffffff" mask="url(#pl-mask)">
              <g className="pl1__g">
                <g transform="translate(20,20) rotate(0,44,44)">
                  <g className="pl1__rect-g">
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                    />
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                      transform="translate(0,48)"
                    />
                  </g>
                  <g className="pl1__rect-g" transform="rotate(180,44,44)">
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                    />
                    <rect
                      className="pl1__rect"
                      rx="8"
                      ry="8"
                      width="40"
                      height="40"
                      transform="translate(0,48)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </main>
      ) : (
        <></>
      )}
      <div className="main-out-block resultpage-main-div">
        <NavContent message={""} PageActive={1} resultPage={true} />
        <div className="columnFlex Outer-shopResult-data">
          <div className="columnFlex shop-header-content-block">
            <div className="rowFlex shop-header-inner-content-block">
              <div>
                <h1>{shopTotalData[0]}</h1>
                <p>{shopTotalData[1]}</p>
              </div>
              <div>
                {shopTotalData[3] !== 0 ? (
                  <div className="columnFlex homeresult-rating-box">
                    <p className="home-shoprating">{shopTotalData[3]}</p>
                    <div>
                      <FontAwesomeIcon icon={faStar} size="2xs" />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} size="2xs" />
                    </div>
                  </div>
                ) : (
                  <div className="columnFlex homeresult-rating-box">
                    <p className="home-shoprating">0.0</p>
                    <div>
                      <FontAwesomeIcon icon={faStar} size="2xs" />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} size="2xs" />
                    </div>
                  </div>
                )}
                {!shopTotalData[2] ? (
                  <p>Currently Not Accepting Orders</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="rowFlex filter-btn-div-resultpage">
              {filter === "all" ? (
                <input
                  className="button-filter-resultpage-selected"
                  type="button"
                  onClick={() => setFilter("all")}
                  value="All"
                />
              ) : (
                <input
                  className="button-filter-resultpage"
                  type="button"
                  onClick={() => setFilter("all")}
                  value="All"
                />
              )}
              {filter === "true" ? (
                <input
                  className="button-filter-resultpage-selected"
                  type="button"
                  onClick={() => setFilter("true")}
                  value="Veg"
                />
              ) : (
                <input
                  className="button-filter-resultpage"
                  type="button"
                  onClick={() => setFilter("true")}
                  value="Veg"
                />
              )}
              {filter === "false" ? (
                <input
                  className="button-filter-resultpage-selected"
                  type="button"
                  onClick={() => setFilter("false")}
                  value="Non-Veg"
                />
              ) : (
                <input
                  className="button-filter-resultpage"
                  type="button"
                  onClick={() => setFilter("false")}
                  value="Non-Veg"
                />
              )}
            </div>
            <div className="fillcolor-resultpage"></div>
            <div>
              {filteredItems.map((categoryItem, index) => (
                <div key={index}>
                  <h2 className="resultpage-category">
                    {categoryItem.productCategory}
                  </h2>
                  <br />
                  {categoryItem.products.map((product, productIndex) => (
                    <div className=" rowFlex Productdiv" key={productIndex}>
                      <div>
                        <div className="rowFlex pageheader-productname">
                          {product[6] ? (
                            <img src={vegImageIcon}  className="typeicon-resultpage" alt="" />
                          ) : (
                            <img src={nonVegImageIcon}  className="typeicon-resultpage" alt="" />
                          )}
                          <h4 className="product-title-resultpage">
                            {product[1]}
                          </h4>
                        </div>
                        <p className="resultpage-rupee rowFlex">
                          <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{" "}
                          {product[5]}
                        </p>
                      </div>
                      <div>
                        <img
                          src={"data:" + product[0]}
                          alt=""
                          draggable="false"
                          className="product-img-resultpage"
                        />
                        <input
                          type="button"
                          value="ADD"
                          className="Addcart-resultpage"
                          onClick={() => UpdateCartfn(product[7],true)}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="fillcolor-resultpage"></div>
                </div>
              ))}
            </div>
          </div>
          {cartBagStatus ? (
            <div
              className="cartbag-result-page rowFlex"
              onClick={cartBagDivStatus}
            >
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
          ) : (
            <>
              <div className="cartbag-popup--resultpage columnFlex">
                <div className="rowFlex header-block-content-div">
                  <h1 className="cartboc-header-shoppage">
                    <FontAwesomeIcon icon={faBagShopping} /> Cart
                  </h1>
                  <button
                    onClick={cartBagDivStatus}
                    className="close-cartbox-btn-resultpage"
                  >
                    <FontAwesomeIcon icon={faAngleDown} size="xl" />
                  </button>
                </div>
                <div className="cart-product-div-popup columnFlex">
                  <div>
                    {cartData.map((productItem, productIndex) => (
                      <div className="columnFlex">
                      <div className=" rowFlex Productdiv" key={productIndex}>
                      <div>
                        <div className="rowFlex pageheader-productname">
                          {productItem.product[0] ? (
                            <img src={vegImageIcon}  className="typeicon-resultpage-cart" alt="" />
                          ) : (
                            <img src={nonVegImageIcon}  className="typeicon-resultpage-cart" alt="" />
                          )}
                          <h4 className="product-title-resultpage-cart">
                            {productItem.product[1]} ({productItem.product[2]})
                          </h4>
                        </div>
                        <p className="resultpage-rupee rowFlex">
                          <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{" "}
                          {productItem.product[3]}
                        </p>
                      </div>
                      <div>
                        <img
                          src={"data:" + productItem.product[4]}
                          alt="" 
                          draggable="false"
                          className="cartproduct-img-resultpage"
                        />
                        <div className="rowFlex cartaddminus-outer-div">
                          <button className="cartaddminus-btn" type="button" onClick={()=>UpdateCartfn(productItem.product[6],false)}><FontAwesomeIcon icon={faMinus} /></button>
                          <p>{productItem.count}</p>
                          <button className="cartaddminus-btn" type="button" onClick={()=>UpdateCartfn(productItem.product[6],true)}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                      </div>
                    </div>
                    <hr className="cart-product-line" />
                    </div>
                    ))}
                  </div>
                </div>
                <div className="rowFlex btn-checkout-popup-outerdiv">
                  <div className="Totalcost-sart-popup columnFlex">
                    <p className="Totalcost-sart-popup-header">Total Amount</p>
                    <p className="Totalcost-sart-popup-content">
                    <FontAwesomeIcon icon={faIndianRupeeSign}/>{" "}
                    {totalCartAmount}
                    </p>
                  </div>
                  <input
                    className="btn-checkout-popup"
                    type="button"
                    onClick={() => {
                      navigate("/userCart");
                    }}
                    value={"CheckOut"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const homeData = { HomePage, NavContent, ShopResult };

export default homeData;
