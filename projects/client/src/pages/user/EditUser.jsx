import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Box,FormControl, FormLabel, Input, Container, Button, useToast, HStack } from '@chakra-ui/react';

const EditUser = () => {
    const [fullname, setFullName] = useState('');
    
    const navigate = useNavigate();
    const toast = useToast();
    const {id} = useParams();

    useEffect(() => {
        getUserById();
    },[]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`${process.env.REACT_APP_API_BASE_URL}/auth/users/v2/${id}`, {
                fullname
            });
            toast({
                title:"User has been updated",
                status:"success",
                duration:3000,
                position:"top-right",
                isClosable:false
            });
            navigate("/");
        } catch (error) {
            toast({
                title:"There is error when input user",
                status:'error',
                duration:3000,
                position:"top",
                isClosable:false
            });
            console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${id}`);
        setFullName(response.data.fullname);
    }

    return (
        <Container>
            <form onSubmit={updateUser}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={fullname} onChange={(e) => setFullName(e.target.value)} />
                </FormControl>
                <Box mt={2}>
                    <HStack>
                        <Button size={'sm'} w={'20%'} type='submit' colorScheme='twitter' onClick={() => navigate("/user_list")}>Update</Button>
                        <Button size={'sm'} w={'20%'} colorScheme={'orange'} onClick={() => navigate("/user_list")}>Cancel</Button>
                    </HStack>
                </Box>
            </form>
        </Container>
    );
}

export default EditUser;
