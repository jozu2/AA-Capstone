import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CustomBottomTab = (props) => {
  const { children, accessibilityState, onPress } = props;
  if (accessibilityState.selected) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.activeBtn}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.activeBtn}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  activeBtn: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
