import "./retail.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisVertical,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import uploadImage from "../../images/Image upload-bg.svg";
import vegImageIcon from "../../images/veg-icon.svg";
import nonVegImageIcon from "../../images/non-veg-icon.svg";
import RetailHome from "./retailHome";
import { useNavigate } from "react-router-dom";

const RetailProduct = () => {
  const [ShopStatus, setShopStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [addProductData, setAddProductData] = useState([]);
  const [addImageData, setAddImageData] = useState(null);
  const [productUploadStatus, setProductUploadStatus] = useState(0);
  const [addproductDivStatus, setAddproductDivStatus] = useState(false);
  const [ProductData, setProductData] = useState({});

  function AssignProductValue(e) {
    let name = e.target.name;
    let value = e.target.value;
    setAddProductData((oldVAlue) => {
      return { ...oldVAlue, [name]: value };
    });
  }

  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = () => {
    Axios.get(`http://localhost:5052/retailProduct`)
      .then((response) => {
        // setShopStatus(response.data.retailAccountData[0]);
        setProductData(response.data.ProductData);
      })
      .catch((e) => {
        console.log("Error Occured in fetchData : ", e);
      });
  };

  useEffect(() => {}, [productUploadStatus, addproductDivStatus,ProductData]);

  const UploadProduct = (e) => {
    e.preventDefault();
    console.log("kjkjnkjbdsgsDG");
    const formData = new FormData();
    formData.append("ProductImage", addImageData);
    formData.append("addProductData", JSON.stringify(addProductData));
    Axios.post(`http://localhost:5052/retailAddProduct`, formData, {})
      .then((response) => {
        if (response.status === 200) {
          setProductUploadStatus(1);
          setTimeout(() => {
            setProductUploadStatus(0);
            fetchProductData()
            changeAddProductstatus()
          }, 1000);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setProductUploadStatus(2);
          setTimeout(() => {
            setProductUploadStatus(0);
          }, 3000);
        }
        console.log("Error Occured in UploadProduct: ", e);
      });
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setAddImageData(e.target.files[0]);
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

  const handleChildValueChange = (newValue) => {
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const changeAddProductstatus = (e) => {
    setAddproductDivStatus(!addproductDivStatus);
  };

  return (
    <>
      <div className="retailMain-homepage-content">
        <RetailHome.RetailNav CurrentActiveState={3} ShopStatus={ShopStatus} onValueChange={handleChildValueChange} />
        <div className="columnFlex outermain-addproduct">
          {addproductDivStatus ? (
            <div className="inner-retailpage-content rowFlex addproduct-main-outer">
              <form
                className="rowFlex addproduct-outer-div"
                onSubmit={UploadProduct}
              >
                <div className="columnFlex first-imagediv-addproduct">
                  <div className="image-upload-container">
                    <div
                      className={`image-upload-box ${
                        image ? "image-selected" : ""
                      }`}
                      onDrop={handleDrop}
                      onDragOver={preventDefault}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt="Uploaded"
                          draggable="false"
                          className="uploaded-image"
                        />
                      ) : (
                        <div className="columnFlex">
                          <img
                            src={uploadImage}
                            alt=""
                            draggable="false"
                            className="uploadImage-addproduct"
                          />
                          <p className="UploadDiv-inner-content-txt">
                            Drag & Drop or Browse to Upload
                          </p>
                        </div>
                      )}
                    </div>
                    <br />
                    <input
                      type="file"
                      id="file-input"
                      accept="image/*"
                      name="ProductImage"
                      onChange={handleImageUpload}
                      required
                    />
                    <label htmlFor="file-input" className="browse-button">
                      Browse
                    </label>
                  </div>
                  <div>
                    {productUploadStatus === 1 ? (
                      <span className="status-condition">
                        Product Uploaded Successfully
                      </span>
                    ) : (
                      <></>
                    )}
                    {productUploadStatus === 2 ? (
                      <span className="status-condition-fail">
                        Product Uploaded Failed
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="columnFlex input-datacontent-addproduct">
                  <div className="columnFlex inner-ap-content-div">
                    <label htmlFor="ProductName-AP">Product Name</label>
                    <input
                      className="Addproduct-input"
                      type="text"
                      name="ProductName"
                      onChange={AssignProductValue}
                      id="ProductName-AP"
                      placeholder="Enter the Product Name"
                      required
                    />
                  </div>
                  <div className="columnFlex inner-ap-content-div">
                    <label htmlFor="Category-AP">Product Category</label>
                    <select
                      className="Addproduct-input-select"
                      name="Catagory"
                      onChange={AssignProductValue}
                      id="Category-AP"
                    >
                      <option value="" className="suggest-option">
                        Select the Category
                      </option>
                      <option value="Fruits Vegetables Herbs">
                        Fruits ,Vegetables or Herbs
                      </option>
                      <option value="Dairy">Dairy</option>
                      <option value="Meat Protein">Meat and Protein</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Canned Goods">Canned Goods</option>
                      <option value="Pasta Grains">Pasta and Grains</option>
                      <option value="Baking Supplies">Baking Supplies</option>
                      <option value="Condiments Sauces">
                        Condiments and Sauces
                      </option>
                      <option value="Snacks">Snacks</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Frozen Foods">Frozen Foods</option>
                      <option value="Cereal Breakfast">
                        Cereal and Breakfast Foods
                      </option>
                      <option value="Spices Seasonings">
                        Spices and Seasonings
                      </option>
                      <option value="CannedMeat Seafood">
                        Canned Meat and Seafood
                      </option>
                      <option value="Baby Care">Baby Care</option>
                      <option value="Household Cleaning">
                        Household and Cleaning
                      </option>
                      <option value="Personal Care">Personal Care</option>
                      <option value="Health Wellness">
                        Health and Wellness
                      </option>
                      <option value="PetSupplies">Pet Supplies</option>
                    </select>
                  </div>
                  <div className="rowFlex inner-addproduct-divider">
                    <div className="columnFlex inner-ap-content-div">
                      <label htmlFor="Quanity-AP">Net Weight</label>
                      <input
                        className="Addproduct-input-inner"
                        type="number"
                        min="1"
                        name="netWeight"
                        onChange={AssignProductValue}
                        id="Quanity-AP"
                        placeholder="Enter the Net Weight"
                        required
                      />
                    </div>
                    <div className="columnFlex inner-ap-content-div">
                      <label htmlFor="ProductType-AP">Product Standards</label>
                      <select
                        className="Addproduct-input-select-inner"
                        name="Standards"
                        onChange={AssignProductValue}
                        id="ProductType-AP"
                      >
                        <option className="suggest-option" value="">
                          Select the Standards
                        </option>
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

                  <div className="rowFlex inner-addproduct-divider">
                    <div className="columnFlex inner-ap-content-div">
                      <label htmlFor="Quanity-AP">Avail Stock Count</label>
                      <input
                        className="Addproduct-input-inner"
                        type="number"
                        min="1"
                        name="Quantity"
                        onChange={AssignProductValue}
                        id="Quanity-AP"
                        placeholder="Enter the Available Stock Count"
                        required
                      />
                    </div>
                    <div className="columnFlex inner-ap-content-div">
                      <label htmlFor="ProductType-PT">Product Type</label>
                      <select
                        className="Addproduct-input-select-inner"
                        name="ProductType"
                        onChange={AssignProductValue}
                        id="ProductType-PT"
                      >
                        <option className="suggest-option" value="">
                          Select the Type
                        </option>
                        <option value="true">Vegetarian (Veg)</option>
                        <option value="false">Non-Vegetarian (Non-Veg)</option>
                      </select>
                    </div>
                  </div>
                  <div className="columnFlex inner-ap-content-div">
                    <label htmlFor="Price-AP">Price</label>
                    <input
                      className="Addproduct-input"
                      type="number"
                      name="Price"
                      onChange={AssignProductValue}
                      id="Price-AP"
                      placeholder="Enter the Price per Quantity in Rupee"
                    />
                  </div>
                  <div className="rowFlex publishbtn-final">
                    <button
                      type="button"
                      className="publish-product-btn-nobg"
                      onClick={changeAddProductstatus}
                    >
                      Close
                    </button>
                    <input
                      className="publish-product-btn"
                      type="submit"
                      value={"Publish Product"}
                    />
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="external-addproduct-div rowFlex">
              <button
                className="publish-product-btn"
                onClick={changeAddProductstatus}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Product
              </button>
            </div>
          )}
          {ProductData.length > 0 ? (
            <div className="product-content-data">
              {ProductData.map((categoryItem, index) => (
                <div key={index}>
                  <p className="Product-subblock-header rowFlex">
                    {categoryItem.productCategory}{index%2===0?(<p>📦</p>):index%3===0?<p>🥗</p>:index%5===0?<p>🍧</p>:<p>🍝</p>}
                  </p>
                  <br />
                  <>
                    <div className="rowFlex main-product-div">
                      {categoryItem.products.map((product, productIndex) => (
                        <div className="columnFlex outer-product-div" key={productIndex}>
                          <div className="imagecontent-div">
                            <img
                              className="product-img"
                              src={"data:" + product[0]}
                              alt=""
                              draggable="false"
                            />
                            {product[6] ? (
                              <object
                                className="Image-veg-nonveg"
                                data={vegImageIcon}
                              />
                            ) : (
                              <object
                                className="Image-veg-nonveg"
                                data={nonVegImageIcon}
                              />
                            )}
                          </div>
                          <div className="columnFlex">
                            <div className="rowFlex innercontent-productdata">
                              <p className="ProductTitle-products rowFlex">
                                {product[1]} - ({product[2]})
                              </p>
                              <button type="" className="productedit-btn">
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </button>
                            </div>
                            <div className="rowFlex innercontent-productdata">
                              <p className="product-availquantity">
                                Avail QTY : {product[4]}
                              </p>
                              <p className="productcontent-rupee rowFlex">
                                <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                                {product[5]}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <br />
                  </>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default RetailProduct;
