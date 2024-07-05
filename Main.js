import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { color } from './styles/color';
import UserScreen from './screens/UserPage';
const Stack = createStackNavigator();

export default function Main() {
    
    return (
        <>
            <StatusBar style="auto" />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    options={() => ({
                        title: "User Page",
                    })}
                    name="user-page"
                    component={UserScreen}
                />
            </Stack.Navigator >
        </>
    );
}
