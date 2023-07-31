import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
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

export default function Assign (props) {
  const [warehouse, setWarehouse] = useState([]);
  const [wAdmin, setWAdmin] = useState({warehouse_id: "", uuid: props.uuid});
  const toast = useToast();
  console.log(wAdmin);
  console.log(props);


    async function getWarehouse() {
        const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse`);
        setWarehouse(res.data);
    };

    const assignUser = async () => {
      try {
        await api.post(`/warehouse/assign`,
          wAdmin
        )
        .then((res) => {
          toast({
            title:"Assign admin success",
            status:"success",
            duration:3000,
            position:'top',
            isClosable:false
          });
        });
      } catch (error) {
        toast({
          title:"The Warehouse has a active admin",
          status:'warning',
          duration:3000,
          position:'top',
          isClosable:false
      });
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
                    <Select id='warehouse_id' name='warehouse' placeholder='Select warehouse' onChange={handleInputChange}>
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
  