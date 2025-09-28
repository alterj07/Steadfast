import { useSession } from "@/components/context/ctx";
import * as Google from "expo-auth-session/providers/google";
import { Link, Redirect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { auth } from "../../firebase.config";

import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "1098397225551-4fo48u8pni4nct9f1msj5n81nes8b3oe.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const params = (response as any).params ?? {};
      const idToken = params.id_token || params.idToken || params.accessToken;
      const accessToken = params.access_token || params.accessToken;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      signInWithCredential(auth, credential).catch(() => setAuthError(true));
    }
  }, [response]);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [enteredUsername, setEnteredUsername] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const { user, isLoading } = useSession();

  const signInWithEmail = async () => {
    setEnteredUsername(true);
    if (!enteredUsername) return;
    if (email === "" || password === "") return;
    return signInWithEmailAndPassword(auth, email, password).catch(() => {
      setAuthError(true);
    });
  };

  const signInWithGoogle = async () => {
    // Launch the system browser/google auth flow. The response is handled in the effect above.
    await promptAsync();
  };

  return (
    <SafeAreaView style={styles.safeview}>
      {user && <Redirect href={"/(tabs)"} />}
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.titleText}>Steadfast</Text>
        <Text style={styles.headText}>Welcome</Text>
        <Text style={styles.subText}>Get ready to be an intellectual</Text>
        {authError && (
          <Text style={styles.errorText}>Invalid username or password.</Text>
        )}
        <TextInput
          style={[styles.input, { marginBottom: 0 }]}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="email@domain.com"
          placeholderTextColor={"#868686"}
        />
        <View style={{ marginTop: 10, width: "100%", alignItems: "center" }}>
          {enteredUsername && (
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              secureTextEntry
              value={password}
              placeholder="mysupersafepassword123"
              placeholderTextColor={"#868686"}
            />
          )}
        </View>
        <Pressable style={styles.button} onPress={signInWithEmail}>
          <Text style={styles.signuptext}>Sign in with email</Text>
        </Pressable>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.divider} />
          <View>
            <Text style={styles.text}>or continue with</Text>
          </View>
          <View style={styles.divider} />
        </View>
        <Pressable style={styles.button} onPress={signInWithGoogle}>
          <Image
            source={require("@/assets/images/google-logo.png")}
            style={styles.signInImage}
          ></Image>
          <Text style={styles.signuptext}>Google</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.text, styles.policies]}>
            Don't have an account?
          </Text>
          <Link
            href={"/authentication/signUp"}
            style={[styles.text, styles.link]}
          >
            Sign Up
          </Link>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
  },
  divider: {
    width: "21%",
    marginHorizontal: "2%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  titleText: {
    fontSize: 24,
    color: "#3b3e37",
    paddingBottom: 100,
    fontWeight: "bold",
  },
  headText: {
    fontSize: 18,
    color: "#3b3e37",
    paddingBottom: 20,
    fontWeight: "bold",
  },
  subText: {
    color: "#3b3e37",
    paddingBottom: 30,
  },
  signuptext: {
    color: "#3b3e37",
    textAlign: "center",
  },
  safeview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  policies: {
    marginRight: "2%",
  },
  text: {
    color: "#3b3e37",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#3b3e37",
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    width: "75%",
  },
  background: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  button: {
    backgroundColor: "#908564",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    width: "75%",
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  signInImage: {
    height: 20,
    width: 20,
    marginHorizontal: "2%",
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },
});