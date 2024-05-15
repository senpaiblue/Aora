import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import {icons} from '../constants'

const SearchInput = ({
  handleChangeText,
  containerStyle,
  placeHolder,
  value,
  ...props
}) => {
  return (
    <View className={`${containerStyle}`}>
      <View className="w-full h-16 flex-row items-center border-2 px-2 border-black-200 rounded-2xl focus:border-secondary bg-black-100">
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          value={value}
          onChangeText={handleChangeText}
          className="text-white text-base mt-0.5 flex-1 font-pregular "
        />
          <TouchableOpacity>
            <Image
            source={icons.search}
            className='w-6 h-6'
            resizeMode="contain"
            />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
