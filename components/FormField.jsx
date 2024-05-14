import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import {icons} from '../constants'

const FormField = ({
  title,
  handleChangeText,
  containerStyle,
  placeHolder,
  value,
  ...props
}) => {
  const [ShowPassword, setShowPassword]= useState(false)
  return (
    <View className={`${containerStyle} space-y-2`}>
      <Text className=" text-base text-gray-100 ">{title}</Text>
      <View className="w-full h-16 flex-row items-center border-2 px-2 border-black-200 rounded-2xl focus:border-secondary bg-black-100">
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          value={value}
          onChangeText={handleChangeText}
          className="text-white font-psemibold text-base flex-1 "
          secureTextEntry={title === 'Password' && !ShowPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={()=>setShowPassword(!ShowPassword)}>
            <Image
            source={!ShowPassword?icons.eye:icons.eyehide}
            className='w-6 h-6'
            resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
