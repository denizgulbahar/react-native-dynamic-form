import React, { useState, useEffect } from 'react';
import ErrorComponent from '../../components/errorComponent';
import Loading from '../../components/loading/loading';
import constants from '../../resources/constants';
import useApi from '../hooks/useApi';

const withUserDetails = (Component) => (props) => {
    const [userData, setUserData] = useState([])
    const { callApi, loading, error } = useApi();
  
    const fetchUsers = async () => {
      try {
        const users = await callApi({
            url: `${constants.API_URL_USER}`,
        });
        console.log(users);
        setUserData(users);
      } catch (err) {
        console.error(err);
    }
    }
    useEffect(() => {
      fetchUsers();
    }, []);
  
    useEffect(() => {
      // Clean up State
      return () => setUserData([]);
    }, []);

    if (loading) {
    // If data loads, return Loading Component
    return <Loading message="Veri yükleniyor, lütfen bekleyin..." />;
    }
  
    if (error) {
    // If any error happens, return Error Component
    return <ErrorComponent message={error} />;
    }

    // If all okey, return Component
    return <Component {...props} userData={userData} />;
};

export default withUserDetails;