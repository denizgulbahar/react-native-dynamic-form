import React, { useState, useEffect } from 'react';
import FullScreenLoading from '../../components/loading/FullScreenLoading';
import UserFields from './userFields';
import { getInputFields } from '../../utilities/getInputFields';
import listUserData from '../../API/user/get-users';
import createUserData from '../../API/user/add-user';
import showAlert from '../../utilities/showAlert';

const UserOperations = ({ setModalVisible }) => {
 
  const [informations, setInformations] = useState({});
  const [isLoading, setLoading] = useState(false);

  // DynamicType was determined here
  let dynamicType = "others";

  let users = [
    {
      name: "deniz", 
      email: 'denizg@gmail.com',
      password: '1234',
      phone: "0502 293 12 34",
      others: { 
        bornDate: "01.07.1996", 
        sex: "male", 
        interest: "football"
      },
    },
    {
      name: 'ayse', 
      email: 'ayse_k@hotmail.com',
      password: '5678',
      phone: "0505 487 56 78",
      others: { 
        bornDate: "15.03.1998", 
        sex: "female",
        interest: "music"
      },
    },
    { 
      name: 'ahmet', 
      email: 'ahmet_y@yahoo.com',
      password: 'abcd',
      phone: "0501 123 45 67",
      others: { 
        bornDate: "22.11.1995", 
        sex: "male",
        interest: "basketball",
        domesticAnimal: "cat"
      }

    }
  ];
  
  //Used for Mock API call
  function mockListAPIFunction(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(users);  // return users
        }, ms);
    });
  }

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
  
  const handleDynamicTransform = (informations) => {
    return new Promise((resolve, reject) => {
      try {
        const transformedObject = {};
        // transformation of the Each key-value pair 
        informations[dynamicType].forEach(({ key, value }) => {
          if (key && value) {
            transformedObject[key] = value;
          }
        });
        resolve(transformedObject);
      } catch (error) {
        reject(error);
      }
    });
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
      const transformedObject = await handleDynamicTransform(informations)

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
