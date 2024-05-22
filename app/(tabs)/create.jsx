import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { Video, ResizeMode } from "expo-av";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const create = () => {
  const { user } = useGlobalContext();
  const [uploading, setuploading] = useState(false);
  const [form, setform] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert("Please fill all the fields");
    }
    setuploading(false);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Successfull, Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setform({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };
  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setform({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setform({ ...form, video: result.assets[0] });
      }
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
                    resizeMode={ResizeMode.COVER}
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
