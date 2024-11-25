import { useState } from "react";
function useModal() {

    const [isModalVisible, setModalVisible] = useState(false);
    // Modal Functions
    const handleOpenModal = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);
    
    return { isModalVisible, handleOpenModal, handleCloseModal };
} 
export default useModal;