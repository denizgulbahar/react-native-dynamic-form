import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ErrorComponent = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message || "Bir hata oluştu. Daha sonra tekrar deneyin."}</Text>
      {onRetry && (
        <Button
          title="Tekrar Dene"
          onPress={onRetry}
          color="#FF4D4D" 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF5F5'
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4D4D',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default ErrorComponent;
