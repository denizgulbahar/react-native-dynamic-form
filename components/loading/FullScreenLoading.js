import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { color } from '../../styles/color';

const FullScreenLoading = ({ message }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator 
                size={40} 
                color={color.black}
            />
            <Text style={styles.message}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: color.black,
    },
});

export default FullScreenLoading;