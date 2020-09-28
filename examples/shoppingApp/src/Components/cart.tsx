import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Header, Icon } from "react-native-elements";

interface Props {
  navigation: any;
  route: any;
}

interface State {
  voiceText: string;
  voiceTrimedData: string;
  voiceAction: string;
  productInCart: any;
}
class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const productInCart = this.props.route.params.productInCart;
    this.state = {
      voiceText: "Add voice command",
      voiceTrimedData: null,
      voiceAction: null,
      productInCart: productInCart,
    };
  }

  render() {
    const { productInCart } = this.state;
    return (
      <View>
        <View>
          <Header
            statusBarProps={{ barStyle: "light-content" }}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            leftComponent={
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  type={"MaterialIcons"}
                  size={28}
                  color="#ffff"
                />
              </TouchableOpacity>
            }
            rightComponent={null}
            centerComponent={
              <View
                style={{ justifyContent: "center", alignItems: "baseline" }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}
                >
                  Cart
                </Text>
              </View>
            }
          />
        </View>

        <View>
          <View style={styles.productListCnt}>
            {this.state.productInCart.length == 0 ? (
              <View style={styles.emptyTextCnt}>
                <Text>Cart is empty</Text>
              </View>
            ) : null}
            <ScrollView style={styles.scrollView}>
              {productInCart.map((items: any, index: number) => {
                return productInCart[index].inCart == true ? (
                  <View key={items.id}>
                    <View style={styles.productCnt}>
                      <View style={styles.imageCnt}>
                        <Image
                          key={items.image}
                          style={styles.imageDimention}
                          source={items.image}
                        />
                      </View>
                      <View style={styles.productDetailscnt}>
                        <Text style={styles.titleText}>{items.title}</Text>
                        <Text style={styles.priceText}>
                          Author : {items.author}
                        </Text>
                        <Text style={styles.priceText}>
                          Ratting : {items.ratting}
                        </Text>
                        <Text style={styles.priceText}>
                          Price : ${items.price}
                        </Text>
                        <View style={styles.deleteBtn}>
                          <Button
                            title="Delete Item"
                            onPress={() => {
                              let productCopy = productInCart;
                              productCopy[index].inCart = false;
                              productCopy.splice(index, 1);
                              this.setState({
                                productInCart: productCopy,
                              });
                            }}
                            color={Platform.OS == "ios" ? "#ffffff" : null}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null;
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cnt: {
    backgroundColor: "#1DA1F2",
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { color: "white", fontSize: 20 },
  voiceFillUi: {
    width: "100%",
    alignItems: "center",
    marginHorizontal: "3%",
    marginVertical: "2%",
  },
  scrollView: { marginTop: "2%", height: "auto" },
  imageCnt: { width: "30%", height: "10%" },
  productCnt: {
    height: "30%",
    marginVertical: "1%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  productListCnt: {
    marginVertical: "2%",
    marginHorizontal: "2%",
    marginBottom: 200,
  },
  imageDimention: { width: 110, height: 180 },
  productDetailscnt: {
    width: "80%",
    justifyContent: "flex-start",
    marginLeft: "5%",
  },
  priceText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  titleText: {
    color: "#1DA1F2",
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyTextCnt: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: { width: "50%", marginTop: "5%", backgroundColor: "#1DA1F2" },
});

export default Cart;
