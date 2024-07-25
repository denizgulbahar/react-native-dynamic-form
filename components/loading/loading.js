import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { color } from '../../styles/color';

const Loading = ({ 
    message = "Veri yükleniyor...", // Default Value
    containerStyle,
    textStyle,  
    loadingSize = 40 // Default Value
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <ActivityIndicator 
                size={loadingSize} 
                color={color.black}
            />
            <Text style={[styles.message, textStyle]}>
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

export default Loading;