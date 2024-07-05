import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import ButtonOriginal from '../../components/buttons/buttonOriginal';
import DynamicInput from '../../components/input/dynamicInput';
import InputOriginal from '../../components/input/inputOriginal';

const { width } = Dimensions.get('window');

const UserFields = ({ informations, handleChange, createDataFunction, dynamicType }) => {
  
  // Determine number of columns based on device width
  const numColumns = width >= 500 ? 2 : 1; // Tablet 2 columns, Phone 1 column

  // Render each input field
  const renderItem = ({ item }) => (
      <InputOriginal
        viewStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={informations[item]}
        placeholder={item}
        keyboardType={item === "phone" && "number" }
        secureTextEntry={item === "password" && true}
        onChangeText={(value) => handleChange(item, value)}
      />
    )
  
    // console.log("mock:", informations)
  return (
    <View style={styles.modalContainer}>
      <View style={styles.fieldsContainer}>
        {/* FlatList to render input fields */}
        <FlatList
          data={(Object.keys(informations)).filter(item => item!==dynamicType)}
          keyExtractor={(item, index) => `${item}${index}`}
          renderItem={renderItem}
          numColumns={numColumns}
        />
        <DynamicInput
          dynamicFields={informations[dynamicType]}
          setDynamicFields={(value) => handleChange(dynamicType, value)}
          label="Diğer Özellikler"
        />
        {/* Button to add user data */}
        <ButtonOriginal
          buttonStyle={styles.addButton}
          title="Kullanıcı Ekle"
          onPress={() => createDataFunction(informations)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  fieldsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    margin: 5,
  },
  input: {
    flex: 1,
  },
  addButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});

export default UserFields;


