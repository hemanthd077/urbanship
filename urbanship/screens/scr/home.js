import {
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL_RN } from "@env";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCartShopping,
  faHeart as faHeartSolid,
  faLocationDot,
  faMagnifyingGlass,
  faShop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Axios from "axios";

import { FontAwesome } from "@expo/vector-icons";
import Appicon from '../../assets/logoicon-no-background.png'
import ComingSoon from '../../assets/images/ComingSoonSvg'

const RatingStar = ({ rating }) => {
  const starIcons = [];
  const integerRating = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < integerRating) {
      starIcons.push(
        <FontAwesome
          name="star"
          size={14}
          style={{ marginLeft: 2 }}
          color="gold"
          key={i}
        />
      );
    } else if (i === integerRating && hasHalfStar) {
      starIcons.push(
        <FontAwesome
          name="star-half-o"
          size={14}
          style={{ marginLeft: 2 }}
          color="gold"
          key={i}
        />
      );
    } else {
      starIcons.push(
        <FontAwesome
          name="star-o"
          size={14}
          style={{ marginLeft: 2 }}
          color="grey"
          key={i}
        />
      );
    }
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {starIcons}
      <Text style={{ marginLeft: 5 }}>{rating} / 5</Text>
    </View>
  );
};

const HomeNav = () => {
  const navigation = useNavigation();
  const [locationData, setLocationData] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          return true;
        }
      );
      return () => backHandler.remove();
    }, [])
  );

  async function userLandmarkFetch() {
    await Axios.get(`${BASE_URL_RN}userLandmarkFetch`).then((result) => {
      setLocationData(result.data.Landmark);
    });
  }

  useEffect(() => {
    userLandmarkFetch();
  }, []);

  return (
    <View style={styles.HeaderBlockView}>
      <View style={styles.OuterLocationView}>
        <TouchableOpacity>
          <Image source={Appicon} style={{width:25 , height:25}}/>
          {/* <FontAwesomeIcon style={styles.iconStyle} icon={faLocationDot} /> */}
        </TouchableOpacity>
        <View style={styles.LocationInnerDiv}>
          <Text style={{ fontSize: 18, fontWeight: 700 }}>Location</Text>
          <Text>{locationData}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.profileBlock}
        onPress={() => {
          console.log("Profile button pressed");
          navigation.navigate("Profile");
        }}
      >
        <FontAwesomeIcon style={styles.ProfileiconStyle} icon={faUser} />
      </TouchableOpacity>
    </View>
  );
};

const Home = ({navigation}) => {
  const [enteredText, setEnteredText] = useState("");
  const [placeholder, setPlaceholder] = useState("Search the Location");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsStatus, setSuggestionsStatus] = useState(false);
  const [suggestionsClickStatus, setSuggestionsClickStatus] = useState(true);
  const [resultData, setResultData] = useState([]);
  const [resultDataStatus, setResultDataStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function userLandmarkFetch() {
    
    await Axios.get(`${BASE_URL_RN}userLandmarkFetch`).then((result) => {
      setEnteredText(result.data.Landmark);
    });
  }


  useEffect(() => {
    userLandmarkFetch();
  }, []);

  async function fetchShopData() {
    setRefreshing(true);
    
    await Axios.get(`${BASE_URL_RN}productShopSearch`).then((response) => {
      setResultData(response.data.availShopData);
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  useEffect(() => {}, [resultData]);

  const LocationContent = () => {
    if (enteredText.length > 0) {
      var requestOptions = {
        method: "GET",
      };
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${enteredText}&lang=en&limit=4&bias=rect:67.36395565494513,6.299788133318117,97.99331987875428,36.34866466322184|countrycode:none&format=json&apiKey=ff07f1a05cb443aaa8940e7162a9b2e7`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.results[0].city) {
            let temp = [];
            let tempIndex = 0;
            for (let index = 0; index < result.results.length; index++) {
              if (
                result.results[index].city !== undefined &&
                !temp.includes(result.results[index].city)
              )
                temp[tempIndex++] = result.results[index].city;
            }
            setSuggestions(temp);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      setSuggestions([]);
    }
  };

  const placeholderTexts = [
    "Search the Location",
    "Search the Shop Nearby",
    "Search the Landmark",
  ];
  let currentIndex = 0;

  const handleTextChange = (text) => {
    setEnteredText(text);
  };

  async function assignLocationValue(suggestion) {
    setEnteredText(suggestion);
    setSuggestionsClickStatus(!suggestionsClickStatus);
    await Axios.post(`${BASE_URL_RN}userLandmarkSet`, {
      Location: suggestion,
    }).then((response) => {});
    setResultDataStatus(!resultDataStatus);
  }

  useEffect(() => {
    fetchShopData();
  }, [resultDataStatus]);

  useEffect(() => {
    setSuggestionsStatus(!suggestionsStatus);
    LocationContent();
  }, [enteredText]);

  useEffect(() => {
    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholderTexts.length;
      setPlaceholder(placeholderTexts[currentIndex]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {}, [suggestions, suggestionsStatus]);

  const CurrentPageChange = () => {
    navigation.navigate("Cart")
  };

  const productHandleClick = async (productIndex) => {
    navigation.navigate('ShopResult', { ProductIndex: productIndex });
  };

  return (
    <View style={styles.Container}>
        <>
          <View style={{marginHorizontal:10}}><HomeNav /></View>
          <View style={styles.searchBox}>
            <Text>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Text>
            <TextInput
              style={styles.searchBoxInput}
              placeholder={placeholder}
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              onChangeText={handleTextChange}
              value={enteredText}
            />
          </View>
            {enteredText.length > 0 &&
            suggestionsStatus === true &&
            suggestionsClickStatus ? (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionContentBox}
                    onPress={() => assignLocationValue(item)}
                  >
                    <View style={styles.rowFlexSuggestion}>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        style={styles.buttonIconColor}
                      />
                      <Text>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                style={styles.suggestionBox}
              />
            ) : (
              <></>
            )}

          <View style={styles.ShopDataOuter}>
            {resultData.length > 0 ? (
              <>
                <View>
                  <Text style={styles.ProductHeaderText}>
                    {resultData.length} Shops Available Nearby
                  </Text>
                </View>
                <FlatList
                  data={resultData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item,index }) => (
                    <TouchableOpacity 
                      style={styles.shopInnerContainer}
                      onPress={() => productHandleClick(index)}
                    >
                      <View>
                        <Text style={styles.ShopTitleContent}>{item[1]}</Text>
                        <RatingStar rating={item[3]} />
                        <TouchableOpacity style={styles.shopHeartOuter}>
                          <FontAwesomeIcon
                            icon={faHeartRegular}
                            style={styles.shopHeart}
                          />
                        </TouchableOpacity>
                      </View>
                      <Image
                        style={styles.shopLogoImage}
                        source={{ uri: `data:${item[0]}` }}
                      />
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.shopOuterContainer}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={fetchShopData}
                      style={styles.GroupContainerValue}
                    />
                  }
                />
              </>
            ) : (
              <View style={styles.NoshopAvail}>
                <ComingSoon/>
                <Text style={styles.NoshopAvailTxt}>We are Working to Bring our service to Your Location 🌴🌴</Text>
              </View>
            )}
          </View>
        </>

      {/* footer */}
      <View style={styles.HomeFooterBlock}>
          <>
            <TouchableOpacity style={styles.HomeFooterContentShops}>
              <Text>
                <FontAwesomeIcon
                  style={styles.HomeFooterContenttextActive}
                  icon={faShop}
                />
              </Text>
              <Text style={styles.HomeFooterContenttextActive}>Shops</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.HomeFooterContentCart}
              onPress={CurrentPageChange}
            >
              <Text>
                <FontAwesomeIcon style={styles.HomeFooterContenttext} icon={faCartShopping} />
              </Text>
              <Text style={styles.HomeFooterContenttext}>Cart</Text>
            </TouchableOpacity>
          </>
      </View>
    </View>
  );
};

const HomeContent = {Home,HomeNav,RatingStar}

export default HomeContent;

const styles = StyleSheet.create({
  Container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent:"center",
  },
  NoshopAvail:{
    flexDirection:"column",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center",
  },
  NoshopAvailTxt:{
    position:"absolute",
    top:500,
    width:320,
    fontSize:17,
    fontWeight:"700",
    textAlign:"center",
    color:"#34344e",
  },
  GroupContainerValue:{
    flex:1,
  },
  shopHeart: {
    color: "#30c06b",
  },
  footerDividerLine: {
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  ShopDataOuter: {
    flex: 1,
  },
  shopHeartOuter: {
    position: "absolute",
    bottom: 5,
    left: 5,
    transform: [{ scale: 1.3 }],
  },
  ShopTitleContent: {
    fontSize: 15,
    fontWeight: "500",
    maxWidth: 150,
    paddingRight:20,
    flexWrap: "wrap",
  },
  shopOuterContainer: {
    flexDirection: "column",
    paddingBottom:50,
    paddingHorizontal:10,
  },
  shopLogoImage: {
    width: 100,
    borderRadius: 5,
    height: 110,
  },
  HomeFooterContenttext: {
    fontWeight:"700",
    color:"#30c06b",
  },
  HomeFooterContenttextActive:{
    color: "#ffffff",
    fontWeight:"700",
  },
  shopInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 7,
    borderRadius: 5,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "#f8f8f8",
    padding: 20,
    elevation:0.3,
  },
  ProductHeaderText: {
    textAlign: "center",
    opacity: 0.5,
  },
  OuterLocationView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  buttonIconColor: {
    color: "#30c06b",
  },
  suggestionBox: {
    backgroundColor: "#f8f8f8",
    position: "absolute",
    top: 138,
    marginHorizontal:15,
    padding: 10,
    zIndex: 1,
    minWidth:362,
    flex:1,
    paddingLeft:20,
    marginTop: -30,
    flexDirection:"row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  suggestionContentBox: {
    alignContent: "center",
    marginTop: 5,
  },
  HomeFooterContentShops:{
    padding: 8,
    flexDirection: "row",
    gap: 5,
    alignContent: "center",
    justifyContent: "flex-end",
    marginBottom: 5,
    borderWidth:1,
    borderRightWidth:0,
    borderColor:"#30c06b",
    backgroundColor:"#30c06b",
    width:160,
    paddingRight : 20,
    borderTopLeftRadius:50,
  },
  HomeFooterContentCart:{
    padding: 8,
    flexDirection: "row",
    gap: 5,
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor:"#f8f8f8",
    marginBottom: 5,
    borderWidth:1,
    borderLeftWidth:0,
    width:160,
    paddingLeft : 20,
    borderColor:"#30c06b99",
    borderTopRightRadius:50,
  },
  searchBoxInput: {
    width: 310,
  },
  searchBox: {
    justifyContent: "flex-start",
    padding: 8,
    paddingLeft:20,
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    gap: 10,
    zIndex: 2,
    marginHorizontal:15,
    backgroundColor: "#f8f8f8",
    
  },
  rowFlexSuggestion: {
    flexDirection: "row",
    gap: 10,
    height: 55,
    fontSize: 18,
    paddingVertical: 10,
    alignItems: "center",
  },
  profileBlock: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    elevation: 1,
    color: "#30c06b",
  },
  HeaderBlockView: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
  },
  iconStyle: {
    color: "#30c06b",
    transform: [{ scale: 1.5 }],
  },
  ProfileiconStyle: {
    color: "#30c06b",
    elevation: 2,
  },
  LocationInnerDiv: {
    flexDirection: "column",
    alignItems: "baseline",
    fontSize: 20,
  },
  HomeFooterBlock: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    transform: [{ scale: 1.3 }],
    // backgroundColor: "#30c06b",
    // backgroundColor: "#cbdad5",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginHorizontal: 40,
    position:"absolute",
    zIndex:2,
    bottom:0,
  },

  CartSectionOuterContainer:{
    padding:10,
  },
});
