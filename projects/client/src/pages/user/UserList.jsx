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
    HStack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async() => {
        const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users`);
        console.log(response.data);
        setUsers(response.data);
    };

    useEffect(() => {
        api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                                    <Button colorScheme={'red'} size={'sm'}>Delete</Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                        ))};
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserList;
