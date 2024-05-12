import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, containerStyle, handlePress, isLoading,textStyle }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary justify-center items-center rounded-xl min-h-[62px] ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
