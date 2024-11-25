import React, { useState, useEffect } from 'react';
import UserFieldsComponent from './userFieldsComponent';
import { getInputFields } from '../../utils/getInputFields';
import showAlert from '../../utils/showAlert';
import { handleDynamicTransform } from '../../utils/handleDynamicTransform';
import useApi from '../../utils/hooks/useApi';
import constants from '../../resources/constants';
const UserOperationsContainer = ({ userData, handleCloseModal }) => {
 
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

  const { callApi, error, loading } = useApi()

  const handleCreateUser = async (informations) => {
    try {
      // Transformation for Dynamic Fields of the User Informations
      const transformedObject = await handleDynamicTransform(informations[dynamicType])
      // Make an API call to create a new user with the provided information
      await callApi({
        url: `${constants.API_URL_USER}`,
        method: "POST",
        body: JSON.stringify({...informations, [dynamicType]: transformedObject})
    });
      // Update list of users on the UI 
      await callApi({
        url: `${constants.API_URL_USER}`,
    });
      // User information and show an alert
      showAlert("Kullanıcı Eklendi.")
    } catch (error) {
      console.error('Error creating user data:', error);
    } finally {
      handleCloseModal() // Close modal after operation completes
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
  function handleRestrictedCreatedData() {
    if (!areAllFieldsFilled(informations)) {
      showAlert("Lütfen tüm alanları doldurunuz.");
      return false;
    }
  
    if (informations.name && informations.password && informations.name === informations.password) {
      showAlert('İsim ile şifre aynı olamaz');
      return false;
    }
  
    if (informations.email && !isValidEmail(informations.email)) {
      showAlert('Lütfen geçerli bir email giriniz.');
      return false;
    }
  
    if (informations.phone && !isValidPhoneNumber(informations.phone)) {
      showAlert('Lütfen 11 haneli ve geçerli bir telefon numarası giriniz.');
      return false;
    }
  
    // If all conditions are ok, create the data
    handleCreateUser(informations);
    return true;
  }  

  useEffect(() => {
    handleInputData();
  }, []);

  useEffect(() => {
    // Clean up State
    return () => setInformations({});
  }, []);
  
  return (
    <UserFieldsComponent
      informations={informations}
      handleChange={handleChange}
      createDataFunction={handleRestrictedCreatedData}
      dynamicType={dynamicType}
    />
  );
};

export default UserOperationsContainer;
