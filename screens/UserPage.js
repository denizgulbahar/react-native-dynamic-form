import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import CustomModal from '../components/modal/customModal';
import ButtonOriginal from '../components/buttons/buttonOriginal';
import  UserOperationsContainer  from '../forms/addUser/userOperationsContainer';
import { ScreenWrapper } from '../components/wrapper/screenWrapper';
import { color } from '../styles/color';
import withUser from '../utils/hoc/withUser';
import useModal from '../utils/hooks/useModal';

// Get the width of the device screen
const width = Dimensions.get('window').width;

const UserScreen = ({ userData }) => {

  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal()

  const RenderItem = ({ item }) => {
    // Function to format the field for display
    const formatField = (field) => {
      // Return a string representation if the field is an object
      if (typeof field === 'object' && field !== null) {
        return JSON.stringify(field);
      }
      // Return the field if it's not an object
      return field;
    };
    return (
      <Text style={styles.itemText}>
        {`${item} : ${formatField(userData[userData.length - 1][item])}`}
      </Text>
    );
  };
  
  return (
    // ScreenWrapper component wraps the entire screen
    <ScreenWrapper>
        <View style={styles.main}>
          {/* Title of the screen */}
          <Text style={styles.title}>User Screen</Text>
          {/* FlatList component to display the list of users */}

          <View style={styles.lastUserContainer}>
            <Text style={styles.lastUserTitle}>Last User Informations</Text>
            <FlatList
              data={(userData.length >= 1) && Object.keys(userData[userData.length - 1])} // Array of added last user informations
              keyExtractor={(item, index) => `${item}_${index}`} // Unique key for each item
              renderItem={RenderItem} // Function to render each item
              numColumns={width >= 500 ? 2 : 1} // Responsive Column
            />
          </View>
          
          {/* Button to open the modal for adding a new user */}
          <ButtonOriginal 
            buttonStyle={{ alignSelf: "flex-end" }} 
            title="Kullanıcı Ekle" 
            onPress={handleOpenModal} 
          />
          
          {/* Custom modal for user operations */}
          <CustomModal visible={isModalVisible} onClose={handleCloseModal}>
            <UserOperationsContainer 
              userData={userData} // Pass user data to the UserOperations component
              handleCloseModal={handleCloseModal} // Function to close the modal
            />
          </CustomModal>
        </View>
    </ScreenWrapper>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  main: {
    flex: 1,
    width: "100%",
    justifyContent: 'space-between',
    maxWidth: 960,
    paddingHorizontal: 5,
    paddingVertical: 50,
  },
  lastUserTitle: {
    margin: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastUserContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  itemText: {
    textAlign: 'left',
    fontSize: width >= 500 ? 22 : 18,
    padding: 7,
  },
  title: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default withUser(UserScreen);
