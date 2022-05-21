// Modules Import
import React from "react";
import { Text, StyleSheet } from "react-native";
import firebase from "firebase";

/**
 * @author "Rounak Singh"
 * @requires children - The text to be displayed
 * @requires style - The style of the text( don't provide color to the style )
 * @requires firstText - The first text to be displayed (only if there is the need to two text to be passed)
 * @returns A Text Component which is theme sensitive
 */

export default function CustomText({ design, children, firstText }) {
  const [theme, setTheme] = React.useState("");

  async function fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        setTheme(theme);
      });
  }

  React.useEffect(() => fetchUser(), []);
  if (firstText) {
    return (
      <Text
        style={[
          theme === "light" ? styles.Custom_TEXTLight : styles.Custom_TEXT,
          design,
        ]}
      >
        {firstText} {children}
      </Text>
    );
  } else {
    return (
      <Text
        style={[
          theme === "light" ? styles.Custom_TEXTLight : styles.Custom_TEXT,
          design,
        ]}
      >
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  Custom_TEXT: {
    color: "white",
  },
  Custom_TEXTLight: {
    color: "black",
  },
});
