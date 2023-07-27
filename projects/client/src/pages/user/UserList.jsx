import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Button,
    Tr,
    Th,
    Td,
    TableContainer,
    ButtonGroup,
    Box,
    Text,
    Stack,
    HStack,
    useToast,
    useDisclosure
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import EditUser from './EditUser';
import AssignWarehouse from "../admin/AssignWarehouse";
import Navbar from '../../components/Navbar';

const UserList = () => {
    const editUser = useDisclosure();
    const assignUser = useDisclosure();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    const { role = "W_ADMIN" } = useParams();
    const [adminId, setAdminId] = useState();
    const [warehouseId, setWarehouseId] = useState();
    console.log(adminId);
    
    useEffect(() => {
     fetchData();
    }, []);

    const fetchData = async() => {
        try {
            api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/role/${role}`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        } catch (error) {
            toast({
                title:"There is something error while executing this command",
                status:"error",
                duration:3000,
                isClosable:false
            });
        }
    }

    const deleteUser = async(id) => {
        try {
            await api.delete(`${process.env.REACT_APP_API_BASE_URL}/auth/users/role/${role}/${id}`);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            toast({
                title:"User has been deleted",
                status:"success",
                duration:3000,
                isClosable:false
            });
        } catch (error) {
            toast({
                title:"There is something error while executing this command",
                status:"error",
                duration:3000,
                isClosable:false
            });
        }
    }

    return (
        <>
        <Navbar/>
        <Stack>
            <HStack>
                <Box m={2}>
                    <Button onClick={() => navigate('/add_user')} colorScheme={'messenger'} size={'sm'}>Add Users</Button>
                </Box>
                <Box>
                    <Text cursor={'pointer'} textDecoration={'underline'} _hover={{textColor:'blue.400'}} textColor={'blue'} onClick={() => navigate("/")}>Back to home</Text>
                </Box>
            </HStack>
        </Stack>
            <TableContainer>
                <Table variant={'striped'} size={'sm'}>
                    <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Role</Th>
                        <Th display={'flex'} alignItems={'center'} justifyContent={'center'}>Action</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user, index) => (
                        <Tr key={user.uuid}>
                            <Td>{index + 1}</Td>
                            <Td>{user.fullname}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <ButtonGroup display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Button colorScheme={'green'} size={'sm'} onClick={()=> {editUser.onOpen();setAdminId(user.uuid)} }>Edit</Button>
                                    <Button colorScheme={'facebook'} size={'sm'} onClick={() => {assignUser.onOpen();}}>Assign</Button>
                                    <Button colorScheme={'red'} size={'sm'} onClick={() => {deleteUser(user.uuid); navigate("/user_list")}}>Delete</Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                        ))};
                    </Tbody>
                </Table>
            </TableContainer>
            <EditUser uuid={adminId} isOpen={editUser.isOpen} onClose={editUser.onClose} fetchData={fetchData}/>
            <AssignWarehouse uuid={warehouseId} isOpen={assignUser.isOpen} onClose={assignUser.onClose} fetchData={fetchData}/>
        </>
    );
}

export default UserList;
