import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import UserScreen from '../screens/UserPage';

// Create a Stack navigator
const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <>
            {/* Configure the status bar */}
            <StatusBar style="auto" />

            {/* Stack navigator with default screen options */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Define the user-page screen */}
                <Stack.Screen name="user-page" component={UserScreen} />
            </Stack.Navigator>
        </>
    );
};

export default MainStack;
