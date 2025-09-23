import { Link } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "../../firebase.config";


export default function SignUpScreen() {
  const [email, onChangeEmail] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [errorText, setErrorText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");

  const signUp = async () => {
    if (email === "" || password === "") return;
    if (password !== confirmPassword)
      return setErrorText("Passwords do not match");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      console.log("yay");
    } catch (error) {
      setErrorText(
        "There was an issue signing up. Make sure all information is correct!"
      );
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider style={styles.safeview}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Steadfast</Text>
        <Text style={styles.headText}>Welcome</Text>
        <Text style={styles.subText}>Get ready to be steadfast in prayer</Text>
        {errorText !== "" && <Text style={styles.errorText}>{errorText}</Text>}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={onChangeName}
            value={name}
            placeholder="John Doe"
            placeholderTextColor={"#868686"}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input]}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="email@domain.com"
            placeholderTextColor={"#868686"}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            secureTextEntry
            value={password}
            placeholder="mysupersafepassword123"
            placeholderTextColor={"#868686"}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeConfirmPassword}
            secureTextEntry
            value={confirmPassword}
            placeholder="mysupersafepassword123"
            placeholderTextColor={"#868686"}
          />
        </View>
        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.signuptext}>Sign Up</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.text]}>Already have an account?</Text>
          <Link
            href={"/authentication/signIn"}
            style={[styles.text, styles.link]}
          >
            Sign In
          </Link>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#c2b294',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: 30,
    color: "#3b3e37",
    paddingBottom: 20,
    fontWeight: "bold",
  },
  headText: {
    fontSize: 22,
    color: "#3b3e37",
    paddingBottom: 10,
    fontWeight: "600",
  },
  subText: {
    color: "#3b3e37",
    paddingBottom: 30,
    fontSize: 16,
    textAlign: "center",
  },
  labelContainer: {
    width: "80%",
    marginBottom: 15,
  },
  label: {
    color: "#3b3e37",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#333",
    color: "white",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6a6748",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  signuptext: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  link: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
  },
  errorText: {
    color: "#EE4B2B",
    fontWeight: "bold",
    marginBottom: 10,
  },
});