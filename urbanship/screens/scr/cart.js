import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeartRegular,
  faIndianRupeeSign,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL_RN } from "@env";
import Axios from "axios";
import HomeContent from "./home";

import VegImageIcon from "../../assets/images/vegIconSvg";
import NonVegImageIcon from "../../assets/images/nonVegIconSvg";
import CartEmptyIcon from "../../assets/images/cartEmptySvg";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchCartData() {
    await Axios.get(`${BASE_URL_RN}FetchCartData`)
      .then((response) => {
        setCartData(response.data.CartData);
        setTotalCartAmount(response.data.TotalAmount);
      })
      .catch((e) => {});
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

  useEffect(() => {}, [cartData, totalCartAmount]);

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {}, []);

  return (
    <View style={styles.OuterContainer}>
      {cartData.length > 0 ? (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.singleProductBlock}>
                <View style={styles.productHeaderTotalBlock}>
                  {item.product[0] ? (
                    <VegImageIcon style={styles.typeIconResultPage} />
                  ) : (
                    <NonVegImageIcon style={styles.typeIconResultPage} />
                  )}
                  <View style={styles.columnFlex}>
                    <Text style={styles.productTitleCartPage}>
                      {item.product[1]} ({item.product[2]})
                    </Text>
                    <Text style={styles.categoryTextCartPage}>
                      {item.product[7]}
                    </Text>
                    <Text style={styles.cartPageRupee}>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                      {item.product[3]}
                    </Text>
                    <Text style={styles.availQtyTextCartPage}>
                      Available QTY: {item.product[5]}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={{ uri: `data:${item.product[4]}` }}
                    style={styles.cartProductImageResultPage}
                  />
                  <View style={styles.cartAddMinusOuterDiv}>
                    <TouchableOpacity
                      onPress={() => UpdateCartfn(item.product[6], false)}
                    >
                      <FontAwesomeIcon
                        style={styles.cartAddMinusBtn}
                        icon={faMinus}
                      />
                    </TouchableOpacity>
                    <Text style={styles.Itemcount}>{item.count}</Text>
                    <TouchableOpacity
                      onPress={() => UpdateCartfn(item.product[6], true)}
                    >
                      <FontAwesomeIcon
                        style={styles.cartAddMinusBtn}
                        icon={faPlus}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.shopOuterContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchCartData}
              />
            }
          />
          <View style={styles.checkoutPopupOuterDiv}>
            <View style={styles.AmountContent}>
              <Text style={styles.totalCostPopupHeader}>Total Amount</Text>
              <Text style={styles.totalCostPopupContent}>
                <FontAwesomeIcon
                  style={styles.totalCostPopupContent}
                  icon={faIndianRupeeSign}
                />
                {totalCartAmount}
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
              <Text style={styles.checkoutButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.cartEmptyContainer}>
          <CartEmptyIcon/>
          <View style={styles.cartEmptyContainerTxt}>
            <Text>Your cart is empty!!</Text>
            <Text>Add Product, start Ordering</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  OuterContainer: {
    flexDirection: "column",
    paddingHorizontal:10,
    flex:1,
    backgroundColor:"#ffffff",
  },
  typeIconResultPage: {
    width: 25,
    height: 25,
  },
  singleProductBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  cartProductImageResultPage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  cartTitle: {
    color: "#30c06b",
    fontSize: 20,
    fontWeight: "500",
    padding: 5,
    textTransform: "capitalize",
  },
  productHeaderTotalBlock: {
    flexDirection: "row",
    gap: 2,
  },
  columnFlex: {
    flexDirection: "column",
  },
  productTitleCartPage: {
    fontSize: 15,
    fontWeight: "600",
    width: 180,
  },
  categoryTextCartPage: {
    fontSize: 14,
    fontWeight: "500",
    width: 180,
    opacity: 0.5,
  },
  cartPageRupee: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  availQtyTextCartPage: {
    fontSize: 12,
    opacity: 0.7,
  },
  cartAddMinusOuterDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: -30,
    padding: 5,
    elevation: 2,
  },
  cartAddMinusBtn: {
    color: "#30c06b",
    // backgroundColor:"red",
    paddingLeft: 30,
    padding: 10,
    paddingRight: 15,
  },
  Itemcount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#30c06b",
  },
  checkoutPopupOuterDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    padding: 10,
    paddingVertical:20,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  AmountContent: {
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  checkoutButton: {
    backgroundColor: "#30c06b",
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#ffffff",
    paddingHorizontal:20,
  },
  totalCostPopupContent: {
    alignContent: "center",
    justifyContent: "center",
    color: "#30c06b",
    fontWeight: "700",
    fontSize: 20,
  },
  totalCostPopupHeader: {
    fontWeight: "500",
    fontSize: 18,
  },
  cartEmptyContainer:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    flex:1,
  },
  cartEmptyContainerTxt:{
    fontSize:18,
    flexDirection:"column",
    alignItems:"center",
  },
});
