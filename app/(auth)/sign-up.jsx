import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../../lib/appWrite";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const signUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmit, setSubSubmit] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setSubSubmit(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("error.message");
    } finally {
      setSubSubmit(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  justify-center items-center px-8">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold">
            Sign-In to your Aora Account!
          </Text>
          <FormField
            title="Username"
            placeHolder="Enter your username"
            value={form.username}
            containerStyle="mt-7 w-full"
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <FormField
            title="Email"
            placeHolder="Enter your email"
            value={form.email}
            containerStyle="mt-7 w-full"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeHolder="Enter your password"
            value={form.password}
            containerStyle="mt-7 w-full"
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <CustomButton
            title="SingUp"
            containerStyle="w-full mt-7"
            handlePress={submit}
            isLoading={isSubmit}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-In" className="text-lg text-secondary-100">
              {" "}
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
