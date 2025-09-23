import { Stack } from "expo-router";
import { Text } from "react-native";
import { useSession } from "../components/context/ctx";

export default function AuthCheck() {
    const { user, isLoading } = useSession();

    if (isLoading)
        return <Text>Loading...</Text>

    if (user) return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
        </Stack>
    )
}