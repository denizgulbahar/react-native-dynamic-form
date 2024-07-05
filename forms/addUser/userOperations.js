import React, { useState, useEffect } from 'react';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import UserFields from './userFields';
import { getInputFields } from '../../utilities/getInputFields';
import listUserData from '../../API/user/get-users';
import createUserData from '../../API/user/add-user';
import showAlert from '../../utilities/showAlert';
import { users } from '../../data/users';
import { handleDynamicTransform } from '../../utilities/handleDynamicTransform';

const UserOperations = ({ setModalVisible }) => {
 
  const [informations, setInformations] = useState({});
  const [isLoading, setLoading] = useState(false);

  // DynamicType was determined here
  const dynamicType = "others";

  // Used for Mock of User List API call
  function mockListAPIFunction(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(users);  // return users
        }, ms);
    });
  }
  // Used for Mock of Created User API call
  function mockCreateAPIFunction(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, ms);
    });
  }

  // Fetch user data and fill inputs and informations
  const handleUserData = async () => {
    try {
      // For real API call, use the following line
      // const data = await listUserData();

      // Fetch user data (mocked API call with a delay of 500ms)
      const data = await mockListAPIFunction(500)

      // Create inputdata from user API data
      const inputData = getInputFields(data);

      // Create initial User Informations from inputdata
      const initialInformations = Object.fromEntries(inputData.map(item =>  [item, ""]))
      setInformations(initialInformations);
    } catch (error) {
      console.error('Error handling user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle creating user data
  const handleCreateData = async (informations) => {
    setLoading(true)
    try {
      // For real API call, use the following line
      // await createUserData(informations);

      // Created user data (mocked API call with a delay of 500ms)
      await mockCreateAPIFunction(500)

      // Transformation for Dynamic Fields of the User Informations
      const transformedObject = await handleDynamicTransform(informations[dynamicType])

      // User information and show an alert
      console.log("createdUser: ",{...informations, [dynamicType]: transformedObject})
      showAlert("Kullanıcı Eklendi.")
      // Update list of users on the UI 
      // await listUserData();
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
    if(!isValidEmail) {
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
    setLoading(true)
    handleUserData();
  }, []);

  useEffect(() => {
    // Clean up function
    return () => setInformations({});
  }, []);

  return isLoading ? (
    <FullScreenLoading message="Veri yükleniyor, lütfen bekleyin..." />
  ) : (
    <UserFields
      informations={informations}
      handleChange={handleChange}
      createDataFunction={handleRestrictedCreatedData}
      dynamicType={dynamicType}
    />
  );
};

export default UserOperations;
