import { 
    Dimensions,
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    SafeAreaView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const ScreenWrapper = ({ children }) => {
    
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

    return (
        <KeyboardAvoidingView 
            behavior={behavior} 
            keyboardVerticalOffset={0} 
            style={styles.keyboardContainer}
        >  
        {/* When the keyboard is opened, scrolled screen content smoothly */}
            <SafeAreaView style={styles.safeAreaView}>
            {/* Prevented notches on some phones from conflicting with screen content */}
                <LinearGradient 
                    colors={['#B3E0F2', '#4FACD7']}
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                {/* Made attractive Background  by using Linear Gradient for User Interfaces */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Provided the keyboard to close when touching any non-interactive area */}
                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            {children}
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </LinearGradient>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
    }

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,  // Allow the ScrollView to grow vertically to fit its content.
        padding: width>=500 ? 20 : 10,
        paddingBottom: 50, 
    }
}
)


