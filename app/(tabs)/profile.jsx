import { FlatList, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../../constants";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appWrite";
import Inbox from "../../components/Inbox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/sign-In')
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 w-full justify-center items-center">
            <TouchableOpacity className="w-full items-end" onPress={logout}>
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg items-center justify-center ">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <Inbox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg text-white"
            />
            <View className="flex flex-row items-center justify-center w-full ">
              <Inbox
                title={posts.length || 0}
                subtitle="posts"
                containerStyles="mr-10 w-[30%] items-center"
                titleStyles="text-lg text-white"
              />
              <Inbox
                title="1.2k"
                subtitle="followers"
                containerStyles="mr-5 w-[30%] items-center"
                titleStyles="text-lg text-white"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
