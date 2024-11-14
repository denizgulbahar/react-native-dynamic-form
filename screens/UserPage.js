import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import CustomModal from '../components/modal/customModal';
import ButtonOriginal from '../components/buttons/buttonOriginal';
import  UserOperationsContainer  from '../forms/addUser/userOperationsContainer';
import { ScreenWrapper } from '../components/wrapper/screenWrapper';
import Loading from '../components/loading/loading';
import listUserData from '../API/user/get-users'
import { color } from '../styles/color';

// Get the width of the device screen
const width = Dimensions.get('window').width;

const UserScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  // const mockData = [
  //   {
  //   "name":"Berkan Bulut",
  //   "email": "berkan.bulut@gmail.com",
  //   "phone": "05065122500",
  //   "password":"berkan123",
  //   "others": {
  //       "city": "Ankara",
  //       "birthDate":"01.07.1992"
  //   }
  //   },
  //   {
  //     "name":"Berkans Bulut",
  //     "email": "berkan.bulut@gmail.com",
  //     "phone": "05065122500",
  //     "password":"berkan123",
  //     "others": {
  //         "city": "Ankara",
  //         "birthDate":"01.07.1992"
  //     }
  //   },
  //   {
  //     "name":"Berkansss Bulut",
  //     "email": "berkan.bulut@gmail.com",
  //     "phone": "05065122500",
  //     "password":"berkan123",
  //     "others": {
  //         "city": "Ankara",
  //         "birthDate":"01.07.1992"
  //     }
  //   }
  // ]
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
      <Text style={styles.itemText}>
        {`${item} : ${formatField(userData[userData.length - 1][item])}`}
      </Text>
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

          <View style={styles.lastUserContainer}>
            <Text style={styles.lastUserTitle}>Last User Informations</Text>
            <FlatList
              data={Object.keys(userData[userData.length - 1])} // Array of added last user informations
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

export default UserScreen;
