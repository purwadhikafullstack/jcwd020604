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
  const [warehouse, setWarehouse] = useState("");

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setWarehouse((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    async function getWarehouse() {
        const res = await api.get("/warehouse");
        setWarehouse(res.data);
    }

    useEffect(() => {
        getWarehouse();
    },[]);
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
            <ModalHeader>Assign Warehouse Admin</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl isRequired>
                    <FormLabel>Warehouse</FormLabel>
                    <Select name='warehouse' placeholder='Select warehouse' onChange={handleInputChange}>
                        {warehouse.length? warehouse.map((val) => (
                            <option>{val.warehouse_name}</option>
                        )) : null}
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button colorScheme='orange' onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
  