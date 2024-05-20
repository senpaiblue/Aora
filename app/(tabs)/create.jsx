import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { Video, ResizeMode } from "expo-av";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const create = () => {
  const [uploading, setuploading] = useState(false);
  const [form, setform] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = () => {};
  const openPicker = async (seleType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        seleType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (seleType === "image") {
        setform({ ...form, thumbnail: result.assets[0] });
      }
      if (seleType === "video") {
        setform({ ...form, video: result.assets[0] });
      }
    }
    else{
      setTimeout(()=>{
        Alert.alert('Document picked',JSON.stringify(result,null,2))  
      },100)
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mt-5">
        <View className="w-full ">
          <Text className="text-white font-psemibold text-2xl">
            Upload Video
          </Text>
          <View className="mt-6 w-full flex flex-col ">
            <FormField
              title="Video Title"
              placeHolder="Enter your video title"
              containerStyle="w-full"
              value={form.title}
              onChangeText={(e) => setform({ ...form, title: e })}
            />
            <View className="space-y-2 mt-5">
              <Text className="text-gray-100 text-base">Upload Video</Text>
              <TouchableOpacity onPress={() => openPicker("video")}>
                {form.video ? (
                  <Video
                    source={{ uri: form.video.uri }}
                    className="w-full h-64 rounded-2xl"
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                  />
                ) : (
                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                    <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        alt="upload"
                        className="w-1/2 h-1/2"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className="space-y-2 mt-5 mb-5">
              <Text className="text-gray-100 text-base">Upload Thumbnail</Text>
              <TouchableOpacity onPress={() => openPicker("Image")}>
                {form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    className="w-full h-64 rounded-wxl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-16 px-4 bg-black-100 border border-black-200 rounded-2xl flex flex-row items-center justify-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-5 h-5 mr-4"
                    />
                    <Text className="text-[#7b7b8b] text-pregular">
                      Upload Image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <FormField
              title="Upload Prompt"
              placeHolder="Enter your Prompt"
              containerStyle="w-full"
              value={form.title}
              onChangeText={(e) => setform({ ...form, prompt: e })}
            />
            <CustomButton
              title="Submit & Publish"
              handlePress={submit}
              containerStyle="mt-7 w-full"
              isLoading={uploading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
