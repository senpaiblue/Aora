import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons, images } from "../constants";

import {Video,ResizeMode} from 'expo-av'

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setplay] = useState(false);
  return (
    <Animatable.View
      className="mr-5 my-4  border-2 rounded-[36px] p-1"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      style={{borderColor: activeItem === item.$id ? "#FF9C01":"#161622"}}
      duration={500}
    >
      {play ? (
        <Video
        source={{uri:item.video}}
        className='w-52 h-72 bg-white/10 rounded-[36px]'
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status)=>{
          if(status.didJustFinish){
            setplay(false)
          }
        }}
        />
      ) : (
        <TouchableOpacity
          className="justify-center items-center  relative"
          activeOpacity={0.7}
          onPress={() => setplay(true)}
        >
          <ImageBackground
            source={images.thumbnail}
            className="w-52 h-72 rounded-[36px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function Trending({ posts }) {
  const [activeItem, setAticeItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setAticeItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
}
