import React, { useState, useEffect } from 'react';
import ErrorComponent from '../../components/errorComponent';
import Loading from '../../components/loading/loading';
import constants from '../../resources/constants';
import { handleDynamicTransform } from '../handleDynamicTransform';
import useApi from '../hooks/useApi';
import showAlert from '../showAlert';

const withUserCreateForm = (Component) => (props) => {

    const { callApi, error, loading } = useApi()

    const handleCreateUser = async ({ informations, handleCloseModal, dynamicType }) => {
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

    if (loading) {
    // If data loads, return Loading Component
    return <Loading message="Veri yükleniyor, lütfen bekleyin..." />;
    }
  
    if (error) {
    // If any error happens, return Error Component
    return <ErrorComponent message={error} />;
    }

    // If all okey, return Component
    return <Component {...props} handleCreateUser={handleCreateUser} />;
};

export default withUserCreateForm;