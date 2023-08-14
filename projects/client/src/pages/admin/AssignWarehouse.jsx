import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { 
  FormControl, 
  FormLabel, 
  Modal, 
  Button, 
  Select, 
  ModalHeader, 
  ModalContent, 
  ModalCloseButton, 
  ModalBody,
  useToast, 
  ModalFooter, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Assign (props) {
  const [warehouse, setWarehouse] = useState([]);
  const [wAdmin, setWAdmin] = useState({warehouse_id: ""});
  const [message, setMessage] = useState('');
  const toast = useToast();
  const nav = useNavigate();

    async function getWarehouse() {
      try {
        const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse`);
        if (res && res.data) {
          setWarehouse(res.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const assignUser = async () => {
      try {
        const res = await api.post(`${process.env.REACT_APP_API_BASE_URL}/warehouse/assign`, {...wAdmin, uuid: props.uuid});
        setMessage(res.data.message);
        toast({
          title: "Assign admin success",
          status: "success",
          duration: 3000,
          position: 'top',
          isClosable: false
        });
        nav('/user_list');
        props.fetchData();
        props.onClose();
      } catch (error) {
        setMessage('Error occurred while assigning admin to the warehouse');
        console.error(error);
        toast({
          title: "User is already assigned to another warehouse",
          status: 'warning',
          duration: 3000,
          position: 'top',
          isClosable: false
        });
        props.onClose();
        props.fetchData();
      }
    }

    useEffect(() => {
      getWarehouse();
      if (props.uuid){
        console.log(props.uuid);
      }
    },[props.uuid]);

    function handleInputChange(e) {
      const { id, value } = e.target;
      const temp = { ...wAdmin };
      temp[id] = value;
      setWAdmin(temp);
  }
  
    return (
      <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalContent>
            <ModalHeader>Assign Warehouse Admin</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl isRequired>
                    <FormLabel>Warehouse</FormLabel>
                    <Select id='warehouse_id' name='warehouse' placeholder='Select warehouse' onClick={handleInputChange}>
                        {warehouse.length? warehouse.map((val) => (
                            <option key={val.id} value={val.id}>{val.warehouse_name}</option>
                        )) : null}
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={assignUser}>
                Save
              </Button>
              <Button colorScheme='orange' onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
      </>
    );
  };
  