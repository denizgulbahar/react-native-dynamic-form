import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import CustomModal from '../components/modal/customModal';
import ButtonOriginal from '../components/buttons/buttonOriginal';
import  UserOperations  from '../forms/addUser/userOperations';
import { ScreenWrapper } from '../components/wrapper/screenWrapper';
import Loading from '../components/loading/loading';
import listUserData from '../API/user/get-users'
import { color } from '../styles/color';

// Get the width of the device screen
const width = Dimensions.get('window').width;

const UserScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState([])
  const [isLoading, setLoading] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleUserData = async () => {
    try {
      const data = await listUserData()
      setUserData(data);
    } catch (error) {
      console.error('Error handling user data:', error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    handleUserData();
  }, []);

  useEffect(() => {
    // Clean up function
    return () => setUserData([]);
  }, []);

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
      <View style={styles.itemContainer}>
        {Object.values(item).map((field, index) => (
          <Text key={index} style={styles.itemText}>
            {formatField(field)}
          </Text>
        ))}
      </View>
    );
  };
  return (
    // ScreenWrapper component wraps the entire screen
    <ScreenWrapper>
      {isLoading ? (
        // Conditional rendering: if isLoading is true, show the Loading component
        <Loading message="Veri yükleniyor, lütfen bekleyin..." />
      ) : (
        // If isLoading is false, show the main content
        <View style={styles.main}>
          {/* Title of the screen */}
          <Text style={styles.title}>User Screen</Text>
          
          {/* FlatList component to display the list of users */}
          <FlatList
            data={userData[0]} // Array of user data
            keyExtractor={(item, index) => `${item}_${index}`} // Unique key for each item
            renderItem={RenderItem} // Function to render each item
            numColumns={width >= 500 ? 2 : 1} // Responsive Column
          />
          
          {/* Button to open the modal for adding a new user */}
          <ButtonOriginal 
            buttonStyle={{ alignSelf: "flex-end" }} 
            title="Kullanıcı Ekle" 
            onPress={handleOpenModal} 
          />
          
          {/* Custom modal for user operations */}
          <CustomModal visible={isModalVisible} onClose={handleCloseModal}>
            <UserOperations 
              userData={userData} // Pass user data to the UserOperations component
              setLoading={setLoading} // Function to set loading state
              setModalVisible={setModalVisible} // Function to close the modal
            />
          </CustomModal>
        </View>
      )}
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
  itemContainer: {
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

export default UserScreen;
