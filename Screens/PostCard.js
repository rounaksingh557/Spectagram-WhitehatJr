// Modules Import
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../Utility/CustomText";
import firebase from "firebase";

export default class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
      is_liked: this.props.post.value.is_liked,
      likes: 0,
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

  likeActive = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.post_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      firebase
        .database()
        .ref("posts")
        .child(this.state.post_id)
        .child("is_liked")
        .set(false);
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.post_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      firebase
        .database()
        .ref("posts")
        .child(this.state.post_id)
        .child("is_liked")
        .set(true);
    }
  };

  fetchPost = () => {
    firebase
      .database()
      .ref("/posts/" + this.state.post_id)
      .on("value", (snapshot) => {
        this.setState({
          is_liked: snapshot.val().is_liked,
          likes: snapshot.val().likes,
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchPost();
  }

  render() {
    let post = this.state.post_data;
    let id = this.state.post_id;
    let likes = this.state.likes;
    let is_liked = this.state.is_liked;
    let images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigation.navigate("PostScreen", {
            post: post,
            id: id,
            likes: likes,
            is_liked: is_liked,
          })
        }
      >
        <View
          style={
            this.state.light_theme
              ? styles.cardContainerLight
              : styles.container
          }
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={{ uri: post.profile_image }}
                style={styles.profileImage}
              ></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <CustomText
                design={styles.authorNameText}
                children={post.author}
              />
            </View>
          </View>
          <Image source={images[post.preview_image]} style={styles.postImage} />
          <View>
            <CustomText design={styles.captionText} children={post.caption} />
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => this.likeActive()}
              style={
                this.state.is_liked
                  ? styles.likeButtonLiked
                  : styles.likeButtonDisliked
              }
            >
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <CustomText design={styles.likeText} children={this.state.likes} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
    padding: RFValue(20),
  },
  authorContainer: {
    flex: 0.1,
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
    justifyContent: "center",
  },
  authorNameText: {
    fontSize: RFValue(20),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: "contain",
    width: "100%",
    alignSelf: "center",
    height: RFValue(275),
  },
  captionText: {
    fontSize: 13,
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
});
