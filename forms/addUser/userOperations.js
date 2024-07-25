import React, { useState, useEffect } from 'react';
import UserFields from './userFields';
import { getInputFields } from '../../utilities/getInputFields';
import listUserData from '../../API/user/get-users';
import createUserData from '../../API/user/add-user';
import showAlert from '../../utilities/showAlert';
import { handleDynamicTransform } from '../../utilities/handleDynamicTransform';

const UserOperations = ({ userData, setLoading, setModalVisible }) => {
 
  const [informations, setInformations] = useState({});
  
  // DynamicType was determined here
  const dynamicType = "others";

  // Fetch user data and fill inputs and informations
  const handleInputData = () => {
    try {
      // Create inputdata from user API data
      const inputData = getInputFields(userData);

      // Create initial User Informations from inputdata
      const initialInformations = Object.fromEntries(
        inputData.map(item =>  [item, ""])
      )
      setInformations(initialInformations);
    } catch (error) {
      console.error('Error handling user data:', error);
    } 
  };

  // Handle creating user data
  const handleCreateData = async (informations) => {
    setLoading(true)
    try {
      // Make an API call to create a new user with the provided information
      await createUserData({...informations, [dynamicType]: transformedObject});

      // Transformation for Dynamic Fields of the User Informations
      const transformedObject = await handleDynamicTransform(informations[dynamicType])

      // User information and show an alert
      showAlert("Kullanıcı Eklendi.")

      // Update list of users on the UI 
      await listUserData();
    } catch (error) {
      console.error('Error creating user data:', error);
    } finally {
      setLoading(false)
      setModalVisible(false) // Close modal after operation completes
    }
  };

  // Handle input field changes
  const handleChange = (type, value) => {
    setInformations(prevValue => ({
      ...prevValue,
      [type]: value,
    }));
  };
  // Valid PhoneNumber Function 
  function isValidPhoneNumber(phoneNumber) {
    // Remove spaces
    phoneNumber = phoneNumber.replace(/\s+/g, '');

    // Check if the phone number consists only of digits
    const regex = /^\d+$/;

    // Check the length of the number (11 digits for Turkey)
    const isValidLength = phoneNumber.length === 11;

    return regex.test(phoneNumber) && isValidLength;
  }
  function isValidEmail(email) {
    return email.includes("@");
  }
  // Check if all fields are filled
  function areAllFieldsFilled(fields) {
    return !Object.values(fields).some(value => value === "");
  }
  // Restriction Functions
  function handleRestrictedCreatedData () {
    if (!areAllFieldsFilled(informations)) {
      showAlert("Lütfen tüm alanları doldurunuz.");
      return false;
    }
    if(informations.name === informations.password) {
      showAlert('İsim ile şifre aynı olamaz');
      return false;
    } 
    if(!isValidEmail(informations.email)) {
      showAlert('Lütfen geçerli bir email giriniz.');
      return false;
    }
    if(!isValidPhoneNumber(informations.phone)) {
      showAlert('Lütfen 11 haneli ve geçerli bir telefon numarası giriniz.');
      return false;
    }
    // If all conditions ok, user will create
    handleCreateData(informations)
    return true;
  }

  useEffect(() => {
    handleInputData();
  }, []);

  useEffect(() => {
    // Clean up function
    return () => setInformations({});
  }, []);
  
  return (
    <UserFields
      informations={informations}
      handleChange={handleChange}
      createDataFunction={handleRestrictedCreatedData}
      dynamicType={dynamicType}
    />
  );
};

export default UserOperations;
