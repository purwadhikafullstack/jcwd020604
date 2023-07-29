import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Modal, 
  Button, 
  useToast, 
  FormHelperText,
  ModalHeader, 
  ModalContent, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter } from '@chakra-ui/react';

export default function EditUserProfile (props) {
  const [users, setUsers] = useState({
    name: "",
    email: "",
  });
    console.log(users);
    const navigate = useNavigate();
    const toast = useToast();
  
    useEffect(() => {
      if (props.uuid){
        getUserById();
        console.log(props.uuid);
      }
    }, [props.uuid]);

    console.log(props.id);
  
    const updateUser = async () => {
      try {
        await api.patch(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${props.uuid}`, users);
        toast({
          title: "User has been updated",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        navigate("/user_profile");
        props.fetchData();
        props.onClose();
      } catch (error) {
        toast({
          title: "There is an error when updating the user",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        console.log(error);
      }
    };
  
    const getUserById = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${props.uuid}`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error fetching user details",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        console.log(error);
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUsers((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
            <ModalHeader>Edit Data {users.fullname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' name="fullname"
                    value={users.fullname}
                    onChange={handleInputChange}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' name="email"
                    value={users.email}
                    onChange={handleInputChange}/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => updateUser()}>
                Save
              </Button>
              <Button colorScheme='orange' onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
  