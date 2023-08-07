import {
    Modal, 
    ModalContent, 
    ModalHeader,
    ModalBody,
    Button,
    useToast,
    HStack
} from '@chakra-ui/react';
import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteAddress = (props) => {
    const toast = useToast();
    const {addressId} = useParams();
    const [deleteMessage, setDeleteMessage] = useState('');
    const [address, setAddress] = useState({
      address: "",
      province: "",
      city: "",
      district: ""
    });

    const navigate = useNavigate();

    const Close = () => {
      props.setAddressId(null);
      props.onClose();
    }

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
      Close();
      navigate("/user_profile");
      props.getAddressByUser();
    } catch (error) {
      console.error('Error while deleting address:', error);
      setDeleteMessage('Error deleting address.');
      // toast({
      //   title: "Error while execute this command",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: false,
      //   position: 'top'
      // })
    }
  };

    return (
        <>
        <Modal isOpen={props.isOpen}>
        <ModalContent>
            <ModalHeader>Delete Address</ModalHeader>
            <ModalBody pb={6}>
              <HStack>
                <Button colorScheme='red' size={'xs'} onClick={handleDelete}>Delete</Button>
                <Button colorScheme='yellow' size={'xs'} onClick={Close}>Cancel</Button>
              </HStack>
            </ModalBody>
        </ModalContent>'
        </Modal>
        </>
    );
}

export default DeleteAddress;
