// Modules Import
import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

// Files Import
import CustomText from "../Utility/CustomText";

export default class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light" ? true : false,
        });
      });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
    };
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <CustomText
                design={styles.appTitleText}
                children={"Spectagram"}
              />
            </View>
          </View>
          <View style={styles.postContainer}>
            <ScrollView
              style={
                this.state.light_theme ? styles.postCardLight : styles.postCard
              }
            >
              <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                  <Image
                    source={{ uri: this.props.route.params.post.profile_image }}
                    style={styles.profileImage}
                  ></Image>
                </View>
                <View style={styles.authorNameContainer}>
                  <CustomText
                    design={styles.authorNameText}
                    children={this.props.route.params.post.author}
                  />
                </View>
              </View>
              <Image
                source={images[this.props.route.params.post.preview_image]}
                style={styles.postImage}
              />
              <View style={styles.captionContainer}>
                <CustomText
                  design={styles.captionText}
                  children={this.props.route.params.post.caption}
                />
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                  <CustomText design={styles.likeText} children={"12k"} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    fontSize: RFValue(28),
  },
  postContainer: {
    flex: 1,
  },
  postCard: {
    margin: RFValue(20),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20),
  },
  postCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
  },
  likeText: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  authorContainer: {
    height: RFPercentage(10),
    padding: RFValue(10),
    flexDirection: "row",
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    padding: RFValue(10),
    justifyContent: "center",
  },
  authorNameText: {
    fontSize: RFValue(20),
  },
  postImage: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
  },
  captionContainer: {
    padding: RFValue(10),
  },
  captionText: {
    fontSize: 13,
    paddingTop: RFValue(10),
  },
});
