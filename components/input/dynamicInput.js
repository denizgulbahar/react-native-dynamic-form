import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { color } from '../../styles/color';
import InputOriginal from './inputOriginal';

// Get the width of the device screen
const width = Dimensions.get('window').width;

// Change component name with Dynamic Fields
const DynamicInput = ({ dynamicFields, setDynamicFields, label }) => {

  // Function to update the input field at a specific index
  const updateInputField = (index, key, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index] = { key, value };
    setDynamicFields(updatedFields);
  };

  // Function to add a new input field
  const addInputField = () => {
    setDynamicFields([...dynamicFields, { key: '', value: '' }]);
  };
  
  // Function to remove the last input field
  const removeInputField = () => {
    setDynamicFields(dynamicFields.slice(0, -1));
  };

  // Function to remove a specific input field by index
  const removeSelectedInput = (index) => {
    const updatedFields = dynamicFields.filter((_, i) => i !== index);
    setDynamicFields(updatedFields);
  };
console.log("dynaField:",dynamicFields)
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>
      {label}
      </Text>
      {dynamicFields && dynamicFields.map((field, index) => (
      <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.inputGroup}>
          <InputOriginal
            placeholder="Key"
            viewStyle={styles.inputView}r
            value={field.key}
            onChangeText={(text) => updateInputField(index, text, field.value)}
          />
          <InputOriginal
            placeholder="Value"
            viewStyle={styles.inputView}
            value={field.value}
            onChangeText={(text) => updateInputField(index, field.key, text)}
          />
        </View>
        <IconButton
          icon="close-circle"
          onPress={() => removeSelectedInput(index)}
          style={styles.removeButton}
          iconColor={color.danger}
          size={40}
        />
      </View>
      ))}
      <View style={styles.actionContainer}>
        <IconButton 
          icon="plus-circle"
          iconColor={color.danger}
          size={40}
          onPress={addInputField}
        />
        <IconButton 
          icon="minus-circle"
          iconColor={color.danger}
          size={40}
          onPress={removeInputField}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main container style
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 5,
    borderWidth: 0.8,
    borderRadius: 10,
    padding: width >= 500 ? 10 : 5,
  },
  // Header text style
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 5, 
    padding: 7,
  },
  // Input group container style
  inputGroup: {
    flex: 1,
    flexDirection: width >= 500 ? "row" : "column",
    padding: 0,
  },
  inputView: {
    flex: 1,
    margin: 5,
  },
  removeButton: {
    margin: 0,
  },
  // Container for the add/remove buttons
  actionContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center", 
    margin: 5,
  },
});

export default DynamicInput;

