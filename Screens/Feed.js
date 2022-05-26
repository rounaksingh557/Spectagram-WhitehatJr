// Modules Import
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";

// Files Import
import PostCard from "./PostCard";
import CustomText from "../Utility/CustomText";
let posts = require("./temp_post.json");

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      posts: [],
    };
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
      name: name,
      profile_image: image,
    });
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ posts: posts });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchPosts();
  }

  render() {
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
            <CustomText design={styles.appTitleText} children={"Spectagram"} />
          </View>
        </View>
        {!this.state.posts[0] ? (
          <View style={styles.noPosts}>
            <CustomText
              children={"No Post Available"}
              design={styles.noPostText}
            />
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.posts}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    );
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
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  appTitleText: {
    fontSize: RFValue(28),
  },
  cardContainer: {
    flex: 0.85,
  },
  noPosts: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostText: {
    fontSize: RFValue(20),
  },
});
