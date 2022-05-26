// Modules Import
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

// Files Import
import CustomText from "../Utility/CustomText";

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: "image_1",
      dropdownHeight: 40,
      light_theme: true,
      name: "",
      profile_image: "",
      caption: "",
    };
  }
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

  async addPost() {
    if (this.state.caption) {
      let postData = {
        preview_image: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_id: firebase.auth().currentUser.uid,
        profile_image: this.state.profile_image,
        like: 0,
      };

      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(postData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      Alert.alert(
        "Error",
        "All fields are required",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let preview_images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
    };
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
            <CustomText design={styles.appTitleText} children={"New Post"} />
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: "Image 1", value: "image_1" },
                  { label: "Image 2", value: "image_2" },
                  { label: "Image 3", value: "image_3" },
                  { label: "Image 4", value: "image_4" },
                  { label: "Image 5", value: "image_5" },
                ]}
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{ backgroundColor: "transparent" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={
                  this.state.light_theme
                    ? { backgroundColor: "#f5f5f5" }
                    : { backgroundColor: "#2a2a2a" }
                }
                labelStyle={{
                  color: this.state.light_theme ? "black" : "white",
                }}
                arrowStyle={{
                  color: "white",
                }}
                onChangeItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
              />
            </View>

            <TextInput
              style={
                this.state.light_theme
                  ? styles.inputFontLight
                  : styles.inputFont
              }
              onChangeText={(caption) => this.setState({ caption })}
              placeholder={"Caption"}
              placeholderTextColor={this.state.light_theme ? "black" : "white"}
            />

            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={() => this.addPost()}
                style={
                  this.state.light_theme
                    ? styles.mainButtonLight
                    : styles.mainButton
                }
              >
                <CustomText children={"Submit"} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
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
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    marginVertical: RFValue(10),
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "#dedede",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    marginVertical: RFValue(10),
  },
  submitButton: {
    marginTop: RFValue(10),
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: "90%",
    height: RFValue(40),
    borderRadius: RFValue(10),
    backgroundColor: "#841584",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonLight: {
    width: "90%",
    height: RFValue(40),
    borderRadius: RFValue(10),
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});
