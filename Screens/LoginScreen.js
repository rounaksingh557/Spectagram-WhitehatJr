// Modules Import
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "828829474983-345s2pug26pepi93l8dj2fmte6md2ni0.apps.googleusercontent.com",
        iosClientId:
          "828829474983-73j6n4bpltj8g184fj4ib2172cqhbdgq.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: "web",
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
      console.log(e.message);
    }
  };

  onSignIn = (googleuser) => {
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!this.isUserEqual(googleuser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleuser.idToken,
          googleuser.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark",
                })
                .then(function (snapshot) {});
            }
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign In With Google"
          onPress={() => this.signInWithGoogleAsync()}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
