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
    useToast
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    
    useEffect(() => {
        api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const deleteUser = async(id) => {
        try {
            await api.delete(`${process.env.REACT_APP_API_BASE_URL}/auth/users/v3/${id}`);
            toast({
                title:"User has been deleted",
                status:"success",
                duration:3000,
                isClosable:false
            });
            setUsers();
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
        <form onSubmit={deleteUser}>
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
                        <Tr key={user.id}>
                            <Td>{index + 1}</Td>
                            <Td>{user.fullname}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <ButtonGroup display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                    <Button colorScheme={'green'} size={'sm'} onClick={() => navigate("/edit_user")}>Edit</Button>
                                    <Button colorScheme={'facebook'} size={'sm'}>Assign</Button>
                                    <Button colorScheme={'red'} size={'sm'}type='submit' onClick={() => navigate("/user_list")}>Delete</Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                        ))};
                    </Tbody>
                </Table>
            </TableContainer>
        </form>
        </>
    );
}

export default UserList;
