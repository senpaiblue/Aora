import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from '../components/CustomButton'
import { images } from "../constants";
import {router} from 'expo-router'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resized="contain"
      />
      <Text className='font-psemibold text-xl text-white'>
        {title}
      </Text>
      <Text className='font-pmedium text-sm text-gray-100'>
        {subtitle}
      </Text>
      <CustomButton
      title="Create Video"
      handlePress={()=>router.push('/create')}
      containerStyle="w-full my-5 "
      />
    </View>
  );
};

export default EmptyState;
