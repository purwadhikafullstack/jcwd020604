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
  InputGroup,
  Select, 
  ModalHeader, 
  ModalContent, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter } from '@chakra-ui/react';

export default function EditUser (props) {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    verified: true,
    role: "",
  });

    const navigate = useNavigate();
    const toast = useToast();
  
    useEffect(() => {
      if (props.uuid){
        getUserById();
      }
    }, [props.uuid]);
  
    const updateUser = async () => {
      try {
        await api().patch(`/auth/users/${props.uuid}`, users);
        toast({
          title: "User has been updated",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        navigate("/user_list");
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
      }
    };
  
    const getUserById = async () => {
      try {
        const response = await api().get(`/auth/users/${props.uuid}`);
        setUsers(response.data);
      } catch (error) {
        toast({
          title: "Error fetching user details",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
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
            <ModalHeader fontSize={'md'} fontWeight={'bold'} fontFamily={'sans-serif'}>Edit Data {users.fullname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl isRequired>
                    <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Name</FormLabel>
                    <Input type='text' name="fullname" size={'sm'}
                    value={users.fullname}
                    onChange={handleInputChange}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Email address</FormLabel>
                    <Input type='email' name="email" size={'sm'}
                    value={users.email}
                    onChange={handleInputChange}/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Phone</FormLabel>
                    <Input type='tel' name="phone_number" size={'sm'}
                    value={users.phone_number}
                    onChange={handleInputChange}/>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Password</FormLabel>
                  <InputGroup>
                    <Input  type="password"
                    name="password"
                    size={'sm'}
                    placeholder="Password"
                    readOnly={true}
                    id="password"
                    onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
              <FormControl isRequired>
                    <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Verified</FormLabel>
                    <Select placeholder='Select Option' size={'sm'} name="verified" defaultValue={users.verified} onChange={handleInputChange}>
                        <option value={true}>Verified</option>
                        <option value={false}>Unverified</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Role</FormLabel>
                    <Select placeholder='Select Role' size={'sm'} name='role' defaultValue={users.role} onChange={handleInputChange}>
                        <option value={'W_ADMIN'}>Warehouse Admin</option>
                        <option value={'USER'}>User</option>
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} w={'25%'}
						            rounded={'sm'}
						            size={'xs'} onClick={() => updateUser()}>
                Save
              </Button>
              <Button colorScheme='orange' w={'25%'}
						            rounded={'sm'}
						            size={'xs'} onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
