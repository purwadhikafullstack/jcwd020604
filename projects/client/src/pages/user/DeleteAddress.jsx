import {
    Modal, 
    ModalContent, 
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    useToast
} from '@chakra-ui/react';
import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useParams } from 'react-router-dom';



const DeleteAddress = (props) => {
    const toast = useToast();
    const {addressId} = useParams();
    const [deleteMessage, setDeleteMessage] = useState('');

    const handleDelete = async () => {
    try {
      const response = await api.delete(`/address/${props.addressId}`);
      setDeleteMessage(response.data.message);
      toast({
        title: "Delete address success",
        status: "success",
        duration: 3000,
        isClosable: false,
        position: 'top'
      });
      props.onClose();
    } catch (error) {
      console.error('Error while deleting address:', error);
      setDeleteMessage('Error deleting address.');
      toast({
        title: "Error while execute this command",
        status: "error",
        duration: 3000,
        isClosable: false,
        position: 'top'
      })
    }
  };

    return (
        <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
        <ModalCloseButton />
            <ModalHeader>Delete Address</ModalHeader>
            <ModalBody pb={6}>
                <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
            </ModalBody>
        </ModalContent>'
        </Modal>
        </>
    );
}

export default DeleteAddress;
