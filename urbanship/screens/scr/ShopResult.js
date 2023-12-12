import React, { useEffect, useState } from "react";
import { BASE_URL_RN } from "@env";
import Axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faStar,
  faIndianRupeeSign,
  faBagShopping,
  faAngleDown,
  faMinus,
  faPlus,
  faArrowLeft,
  faArrowLeftLong,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import VegImageIcon from "../../assets/images/vegIconSvg";
import NonVegImageIcon from "../../assets/images/nonVegIconSvg";
import LoadingEffect from "../../assets/images/loadingEffectSvg";
import Home from "./home";
import ShopClosed from '../../assets/images/ShopClosedSvg'
import { useNavigation } from "@react-navigation/native";

const ShopResult = ({ route , navigation}) => {
  const { ProductIndex } = route.params;
  const [shopTotalData, setShopTotalData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartBagStatus, setCartBagStatus] = useState(true);
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  async function initialFetch() {
    await Axios.post(`${BASE_URL_RN}productShopDetails`, {
      ProductIndex: ProductIndex,
    }).then((response) => {
      // console.log(response.data.ShopTotalData);
      setProductData(response.data.ProductData);
      setShopTotalData(response.data.ShopTotalData);
      if(loaderStatus){
        setTimeout(() => {
            setLoaderStatus(false);
          }, 2500);
      }
    });
  }

  useEffect(() => {}, [loaderStatus]);
  useEffect(()=>{},[refreshing]);
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

  async function UpdateCartfn(ProductId, Status) {
    await Axios.post(`${BASE_URL_RN}UpdateCartData`, {
      ProductId: ProductId,
      Status: Status,
    }).then((response) => {
      if (response.status === 200) {
        fetchCartData();
      }
    });
  }

  async function fetchCartData() {
    await Axios.get(`${BASE_URL_RN}FetchCartData`)
      .then((response) => {
        setCartData(response.data.CartData);
        setTotalCartAmount(response.data.TotalAmount);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          console.log(e.response.data.message);
        }
      });
  }

  useEffect(() => {
    fetchCartData();
  }, []);


  function GoToCart(){
    navigation.navigate("Cart");
  }

  function GoBackButton(){
    navigation.navigate("Home");
  }

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
  };

  const ContainerA = ()=>{
    return (
        <View style={{alignItems:"center"}}>
            <View>
                <Image
                source={{ uri: `data:+${shopTotalData[4]}` }}
                style={styles.shopImage}
                />
            </View>
            <View style={styles.ShopTitleHeader}>
                <Text style={styles.TitleHeader}>{shopTotalData[0]}</Text>
                <Text style={styles.LocationHeader}>{shopTotalData[1]}</Text>
                <Home.RatingStar rating={shopTotalData[3]}/>
            </View>
          </View>
    )
  }

  const ContainerB = ()=>{
    return (
            
            <View style={styles.OuterProductContainer}>
            {productData.map((item, index) => (
              <View key={index}>
                <Text style={styles.category}>{item.productCategory}</Text>
                {item.products.map((product, productIndex) => (
                  <View style={styles.ProductContainer} key={index+""+productIndex}>
                    <View style={styles.productInfo}>
                      <View style={styles.rowFlex}>
                      {product[6] ? <VegImageIcon style={styles.typeIconResultPage}/> : <NonVegImageIcon style={styles.typeIconResultPage}/>}
                        <Text style={styles.productTitle}>{product[1]}</Text>
                      </View>
                      <Text style={styles.productPrice}>
                        <FontAwesomeIcon icon={faIndianRupeeSign} />
                        {product[5]}
                      </Text>
                    </View>
                    <View style={styles.ProductImageContainer}>
                      <Image
                        source={{ uri: `data:${product[0]}` }}
                        style={styles.productImage}
                      />
                      <TouchableOpacity
                        onPress={() => UpdateCartfn(product[7], true)}
                        style={styles.addButton}
                      >
                        <Text style={styles.addButtonText}>ADD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
    )
  }

  const data = [
    { id: '1', component:<ContainerA/> },
    { id: '2', component: <ContainerB/> },
  ];

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.component}</Text>
    </View>
  );

  return (
    <>
      {loaderStatus ? (
        <LoadingEffect />
      ) : (
        <View style={styles.container}>
            <View style={styles.shopResultHeader}>
                <TouchableOpacity 
                    onPress={GoBackButton}
                    style={styles.shopResultHeaderLeft}
                >
                    <Text><FontAwesomeIcon icon={faArrowLeftLong} style={{color:"#30c06b"}} /></Text>
                    {scrollPosition!==0 &&  <Text style={{color:"#30c06b"}} >{shopTotalData[0]}</Text> }
                    
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={GoToCart}
                >
                    <Text><FontAwesomeIcon icon={faCartShopping} style={{color:"#30c06b"}} /></Text>
                </TouchableOpacity>
            </View>
          {productData.length>0 && shopTotalData[2]===true?
          <>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={initialFetch}
                    />
                  }
                  onScroll={handleScroll}
            />
          </>
          :
          <ScrollView
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={initialFetch}
                />
            }
            >
                <View>
            <Image
              source={{ uri: `data:+${shopTotalData[4]}` }}
              style={styles.shopImageClosed}
            />
          </View>
          <View style={styles.ShopTitleHeader}>
            <Text style={styles.TitleHeader}>{shopTotalData[0]}</Text>
            <Text style={styles.LocationHeader}>{shopTotalData[1]}</Text>
            <Home.RatingStar rating={shopTotalData[3]}/>
          </View>
            <ShopClosed />
            <View style={styles.shopClosedText}>
                <Text style={styles.shopClosedTxt}>Currently Closed</Text>
                <Text> Come Back shortly😊</Text>
            </View>
          </ScrollView>
            }
        </View>
      )}
    </>
  );
};

export default ShopResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop:30,
  },
  shopResultHeaderLeft:{
    flexDirection:"row",
    gap:5,
    alignItems:"center",
    justifyContent:"center",
  },
  shopResultHeader:{
    transform:[{scale:1.3}],
    padding:15,
    flexDirection:"row",
    justifyContent:"space-between",
    width:300,
    height:60,
    color:"#30c06b"
  },
  shopClosedText:{
    marginTop:-510,
    justifyContent:"center",
    alignItems:"center",
  },
  shopImage: {
    width: 350,
    height: 170,
    borderRadius: 10,
  },
  shopImageClosed:{
    width: 350,
    height: 250,
    borderRadius: 10,
  },
  ShopTitleHeader: {
    backgroundColor: "#f8f8f8",
    marginTop: -45,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation:2,
    padding: 3,
  },
  TitleHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#30c06b",
  },
  productImage: {
    width: 130,
    height: 120,
    borderRadius:5,
  },
  ProductImageContainer:{
    elevation:1,  
  },
  ProductContainer: {
    width:350,
    padding:15,
    backgroundColor:"#f8f8f8",
    marginBottom:10,
    marginTop:10,
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  category:{
    fontSize:20,
    fontWeight:"500",
    color:"#566981",
    textTransform:"capitalize",
  },
  shopClosedTxt:{
    fontSize:20,
    color:"#30c06b",
    fontWeight:"700",
  },
  fillColor:{
    borderWidth:0.2,
    backgroundColor:"#56698199",
    borderColor:"#56698199",
    width: 350,
  },
  addButton:{
    backgroundColor:"#ffffff",
    padding:8,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    alignItems:"center",
    justifyContent:"center",
    marginTop: -30,
    elevation:2,
  },
  typeIconResultPage: {
    width: 20,
    height: 20,
  },
  rowFlex:{
    flexDirection:"row",
    gap:5,
    alignItems:"center",
  },
  productInfo:{
    flexDirection:"column",
    gap:5,
  },
  productTitle:{
    fontSize:17,
    fontWeight:"500",
    width:160,
  },
  productPrice:{
    fontSize:19,
    fontWeight:"700",
    paddingLeft:20,
  },
  addButtonText:{
    color:"#30c06b",
    fontWeight:"500",
    fontSize:16,
  },
  OuterProductContainer:{
    paddingBottom:30,
    paddingTop:10,
  },
});
