import React from 'react';
import {
  Box,
  Text,
  Button,
  ButtonGroup,
  VStack,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Select,
  useToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import {
  MdOutlineEmail,
} from 'react-icons/md';
import { useState, useRef, useEffect } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import {BsPerson } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';

export default function EditUserProfile (props) {
  const user = useSelector((state) => state.auth);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [users, setUsers] = useState({
    name: "",
    email: ""
  });

  console.log(props.user);

  const getUserCity = async () => {
    const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/city`)
    setCity(res.data);
  }
  
  const getUserProvince = async () => {
    const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/province`)
    setProvince(res.data);
  }

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
  
  useEffect(() => {
    getUserCity();
    getUserProvince();
  },[]);

  useEffect(() => {
    if (props.uuid){
      getUserById();
      console.log(props.uuid);
    }
  }, [props.uuid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    try {
        await api.post(`${process.env.REACT_APP_API_BASE_URL}/address/`, users);
        toast({
            title:"User has been updated",
            status:"success",
            duration:3000,
            isClosable:false
        });
        navigate("/user_profile");
    } catch (error) {
        toast({
            title:"There is an error when input user",
            status:'error',
            duration:3000,
            isClosable:false
        });
        console.log(error);
    }
  }

  return (
    <>
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
                <VStack spacing={5}>
                    <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement pointerEvents="none" children={<BsPerson color="gray.800" />} />
                                    <Input type="text" size="md" 
                                    value={user.fullname}
                                    onChange={handleInputChange}/>
                                </InputGroup>
                          </FormControl>
                    <FormControl id="email">
                          <FormLabel>Email</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement
                                pointerEvents="none"
                                children={<MdOutlineEmail color="gray.800" />}
                                />
                              <Input type="email" size="md" placeholder={''}
                                   value={user.email}
                                   onChange={handleInputChange}/>
                              </InputGroup>
                          </FormControl>
                          <FormControl id="address">
                              <FormLabel>Address</FormLabel>
                                <Textarea
                                  borderColor="gray.300"
                                  _hover={{
                                  borderRadius: 'gray.300',}}
                                  placeholder={''}/>
                                </FormControl>
                                <Select name='city'>
                                  {city.length? city.map((val) => (
                                    <option>{val.city_name}</option>
                                  )) : null}
                               </Select>
                              <Select name='province'>
                                {province.length? province.map((val) => (
                                  <option>{val.province}</option>
                                )) : null}
                              </Select>
                              <FormControl id="button">
                                <ButtonGroup>
                                  <Button
                                    type="submit"
                                    variant="solid"
                                    colorScheme='blue'
                                    w={'100px'}
                                    onClick={() => saveUser()}
                                  >
                                    Save
                                </Button>
                                <Button
                                    variant="solid"
                                    colorScheme='orange'
                                    w={'100px'}
                                    onClick={() => props.onClose()}
                                  >
                                    Cancel
                                </Button>
                            </ButtonGroup>
                          </FormControl>
                      </VStack>
                  </ModalBody>
                </ModalHeader>
            </ModalContent>
        </Modal>
    </>
  );
}

