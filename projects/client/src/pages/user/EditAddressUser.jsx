import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { 
  FormControl, 
  FormLabel, 
  Input, 
  Modal, 
  Button, 
  useToast, 
  Select, 
  ModalHeader, 
  ModalContent, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter } from '@chakra-ui/react';

export default function AddressUser (props) {
  const user = useSelector((state) => state.auth);
  const {id} = useParams();
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
      if(props.addressId){
        getUserCity();
        getUserProvince();
        getAddressByUser();
      }
    }, [props.addressId]);

    const Close = () => {
      props.setAddressId(null);
      props.onClose();
    }

    const getUserCity = async () => {
      const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/city`)
      setCity(res.data);
    }
    
    const getUserProvince = async () => {
      const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/province`)
      setProvince(res.data);
    }
  
    const editAddress = async () => {
      try {
        await api.patch(`${process.env.REACT_APP_API_BASE_URL}/address/${props.addressId}`, address);
        toast({
          title: "Address updated",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        navigate("/user_profile");
        props.getAddressByUser();
        Close();
      } catch (error) {
        toast({
          title: "Address cannot more than 2, must delete 1 address",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
      }
    };
  
    const getAddressByUser = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE_URL}/address/${props.addressId}`
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
      const { id, value } = e.target;
      setAddress((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={Close}>
        <ModalContent>
            <ModalHeader>Add Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input type='text' id="address" value={address.address}
                    onChange={handleInputChange}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>District</FormLabel>
                    <Input type='text' id="district" value={address.district}
                    onChange={handleInputChange}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Province</FormLabel>
                    <Select id='province' onChange={handleInputChange}>
                        {province.length? province.map((val) => (
                          val.province == address.province ? (<option selected value={val.province}>{val.province}</option>)
                           : (<option value={val.province}>{val.province}</option>)
                        )) : null}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Select id='city' onChange={handleInputChange}>
                       {city.length? city.map((val) => (
                         val.province == address.province ? 
                         val.city_name == address.city ? 
                         (<option selected value={val.city_name}>{val.city_name}</option>)
                         : (<option value={val.city_name}>{val.city_name}</option>) : null
                         )) : null}
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} size={'sm'} onClick={() => editAddress()}>
                Edit
              </Button>
              <Button colorScheme='orange' size={'sm'} onClick={Close}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
  