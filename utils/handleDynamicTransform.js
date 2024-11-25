
export const handleDynamicTransform = (dynamicFields) => {
  
    return new Promise((resolve, reject) => {
      try {
        const transformedObject = {};
        // transformation of the Each key-value pair 
        dynamicFields.forEach(({ key, value }) => {
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