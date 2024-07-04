import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomModal from '../components/modal/customModal';
import ButtonOriginal from '../components/buttons/buttonOriginal';
import  UserOperations  from '../forms/addUser/userOperations';
import { ScreenWrapper } from '../components/wrapper/screenWrapper';

const UserScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <ScreenWrapper>
      <View style={styles.main}>
        <Text style={styles.title}>User Screen</Text>
        <ButtonOriginal 
          buttonStyle={{ alignSelf: "flex-end" }} 
          title="Kullanıcı Ekle" 
          onPress={handleOpenModal} 
        />
        <CustomModal visible={isModalVisible} onClose={handleCloseModal}>
          <UserOperations setModalVisible={setModalVisible} />
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
  title: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default UserScreen;
