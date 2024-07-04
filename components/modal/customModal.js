import React from 'react';
import { 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Dimensions,
} from 'react-native';
import { Portal, Modal, IconButton } from 'react-native-paper';
import { color } from '../../styles/color';

const { width } = Dimensions.get("window")

const CustomModal = ({ visible, onClose, children }) => {
  // Determine keyboard behavior based on platform
  const behavior = Platform.OS === 'ios' ? 'padding' : 'height';

  return (
    <Portal>
      {/* Modal component from React Native Paper */}
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        {/* KeyboardAvoidingView to handle keyboard visibility */}
        <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={0}>
          {/* Close Icon Button */}
          <IconButton
            icon="close-circle"
            onPress={onClose}
            style={styles.closeButton}
            iconColor={color.danger}
            size={40}
          />
          {/* Scrollable content inside the modal */}
          {/* Responsive height depend on Device */}
          <ScrollView 
            style={{ height: width>500 ? "95%" : "90%" }} 
            contentContainerStyle={{ flexGrow: 1, padding: 10 }}
          >
          {/* Render children components */}
            {children} 
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: color.white,
    borderRadius: 8,
    margin: width>=500 ? 10 : 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default CustomModal;

