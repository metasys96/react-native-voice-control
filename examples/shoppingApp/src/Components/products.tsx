import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VoiceControl } from "@metasys96/react-native-voice-control";
import ProductList from "../Constant/productList";
import { Header, Icon } from "react-native-elements";

interface productType {
  id: string;
  category: string;
  title: string;
  price: number;
  author: string;
  image: any;
  ratting: number;
  inCart: boolean;
}

interface Props {
  navigation: any;
}
interface State {
  voiceText: string;
  voiceTrimedData: string;
  voiceAction: string;
  productList: Array<productType>;
}

class Products extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      voiceText: "Add voice command",
      productList: ProductList,
      voiceTrimedData: null,
      voiceAction: null,
    };
  }

  handleVoiceText = (text: string) => {
    this.setState({ voiceText: text });
    if (Platform.OS !== "ios") {
      this.actionHandle(this.state.voiceText.toLocaleLowerCase());
    }
  };

  onSpeechRecgEnd = () => {
    if (Platform.OS === "ios") {
      this.actionHandle(this.state.voiceText.toLocaleLowerCase());
    }
  };
  getCartProductLength() {
    const filterdProduct = this.state.productList.filter((item) => {
      return item.inCart === true;
    });

    return filterdProduct.length;
  }

  actionHandle = (voiceTextData: string) => {
    if (!voiceTextData.includes("add")) {
      return;
    } else {
      const updatedVoiceText = voiceTextData.replace("add", "").trim();
      let ArrayLength = this.state.productList.length;
      for (let i = 0; i < ArrayLength; i++) {
        let arrayItemTitle = this.state.productList[i].title.toLowerCase();

        if (arrayItemTitle === updatedVoiceText.toLowerCase()) {
          let productCopy = this.state.productList;
          productCopy[i].inCart = true;
          this.setState({
            productList: productCopy,
          });
        }
      }
    }
  };

  render() {
    return (
      <View>
        <View>
          <Header
            statusBarProps={{ barStyle: "light-content" }}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            leftComponent={null}
            rightComponent={
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  let productInCarts: any = [];
                  this.state.productList.forEach((items: any, index: any) => {
                    if (this.state.productList[index].inCart == true) {
                      productInCarts.push(items);
                    }
                  });

                  this.props.navigation.navigate("Cart", {
                    productInCart: productInCarts,
                  });
                }}
              >
                <Icon name="shopping-cart" size={24} color="#ffff" />
                <Text style={styles.cartCount}>
                  {this.getCartProductLength()}
                </Text>
              </TouchableOpacity>
            }
            centerComponent={
              <View
                style={{ justifyContent: "center", alignItems: "baseline" }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}
                >
                  Products
                </Text>
              </View>
            }
          />
        </View>

        <View style={styles.voiceFillUi}>
          <VoiceControl
            onVoiceRecgStart={this.handleVoiceText}
            onVoiceRecgEnd={this.onSpeechRecgEnd}
            onPressIconCntStyle={{ height: 60, width: 60, borderRadius: 30 }}
            iconCntStyle={{ height: 60, width: 60 }}
            micIcon={{
              type: "foundation",
              name: "microphone",
              color: "red",
              size: 40,
            }}
            duration={5000}
            rippleTimePeriod={1000}
          />
          <Text>{this.state.voiceText}</Text>
        </View>
        <View style={{ marginBottom: 360 }}>
          <ScrollView style={styles.scrollViewstyle}>
            <View style={styles.productListCnt}>
              {this.state.productList.map((items: any, index: number) => {
                return (
                  <View style={styles.productCnt} key={items.id}>
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
                      <View style={styles.addToCartbtnCnt}>
                        <View
                          style={{
                            backgroundColor: this.state.productList[items.id]
                              .inCart
                              ? "#9a9a9a"
                              : "#1DA1F2",
                          }}
                        >
                          <Button
                            title={
                              this.state.productList[items.id].inCart
                                ? "Added"
                                : "Add to Cart"
                            }
                            disabled={this.state.productList[items.id].inCart}
                            onPress={() => {
                              let productCopy = this.state.productList;
                              productCopy[index].inCart = true;
                              this.setState({
                                productList: productCopy,
                              });
                            }}
                            color={Platform.OS == "ios" ? "#ffffff" : null}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
  scrollViewstyle: { marginTop: "2%" },
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
  addToCartbtnCnt: { width: "50%", marginTop: "5%" },
  imageCnt: { width: "30%", height: "10%" },
  titleText: {
    color: "#1DA1F2",
    fontSize: 22,
    fontWeight: "bold",
  },
  cartCount: {
    color: "#ff0000",
    position: "absolute",
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Products;
