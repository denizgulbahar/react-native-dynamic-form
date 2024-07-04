import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { color } from '../../styles/color';

const { width } = Dimensions.get('window');

const InputOriginal = ({ label, value, onChangeText, viewStyle, inputStyle, multiline, 
  numberOfLines, placeholder, secureTextEntry, keyboardType }) => {

  return (
      <View style={[styles.col, viewStyle]}>
        {label ? (
          // If Input has label prop, display it in Text Component
          <Text style={[styles.textInput, inputStyle]}>{label}</Text>
        ) : false
        }
        <TextInput
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={color.grey}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
        />
      </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginLeft: 5,
    paddingVertical: 0,
    outlineStyle: 'none',
    textAlign: "left",
    fontSize: width > 500 ? 22 : 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  col: {
    flexDirection: 'column',
    borderColor: color.black,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
})
export default InputOriginal;

