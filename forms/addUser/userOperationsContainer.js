import React, { useState, useEffect } from 'react';
import UserFieldsComponent from './userFieldsComponent';
import { getInputFields } from '../../utils/getInputFields';

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

  // Handle input field changes
  const handleChange = (type, value) => {
    setInformations(prevValue => ({
      ...prevValue,
      [type]: value,
    }));
  };

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
      dynamicType={dynamicType}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default UserOperationsContainer;
