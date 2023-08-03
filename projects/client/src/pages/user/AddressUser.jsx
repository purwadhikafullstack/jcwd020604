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
import { useSelector } from 'react-redux';

export default function AddressUser (props) {
  const user = useSelector((state) => state.auth);
  const [changes, setChanges] = useState('');
  const [address, setAddress] = useState({
    address: "",
    province: "",
    city: "",
    district: ""
  });
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
    
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
      getAddressByUser();
    }, []);

    useEffect(() => {
      getUserCity();
      getUserProvince();
    }, []);

    const getUserCity = async () => {
      const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/city`)
      setCity(res.data);
    }
    
    const getUserProvince = async () => {
      const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/province`)
      setProvince(res.data);
    }
  
    const saveAddress = async () => {
      try {
        await api.post(`${process.env.REACT_APP_API_BASE_URL}/address/users`,{...address, user_id: user.id});
        toast({
          title: "Address addedd",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        navigate("/user_profile");
        props.onClose();
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        console.log(error);
      }
    };
  
    const getAddressByUser = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE_URL}/address/users/${user.id}`
        );
        setAddress(response.data);
      } catch (error) {
        console.error(error);
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
      setAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log(address);
    };
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
            <ModalHeader>Add Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' name="address"
                    onChange={(val) => handleInputChange(val)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>District</FormLabel>
                    <Input type='text' name="district"
                    onChange={(val) => handleInputChange(val)}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Province</FormLabel>
                    <Select name='province' onChange={(val) => handleInputChange(val)}>
                        {province.length? province.map((val) => (
                          <option value={val.province}>{val.province}</option>
                        )) : null}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Select name='city' onChange={(val) => handleInputChange(val)}>
                        {city.length? city.map((val) => (
                            <option value={val.city_name}>{val.city_name}</option>
                        )) : null}
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => saveAddress()}>
                Save
              </Button>
              <Button colorScheme='orange' onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
  