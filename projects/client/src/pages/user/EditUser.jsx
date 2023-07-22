import React,{useState, useEffect} from 'react';
import { api } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Box,FormControl, FormLabel, Input, Container, Button, useToast, HStack,FormHelperText,InputGroup,Select } from '@chakra-ui/react';

const EditUser = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verified, setVerified] = useState(true);
    const [role, setRole] = useState('W_ADMIN');
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
  
    useEffect(() => {
      getUserById();
    }, []);
  
    const updateUser = async (e) => {
      e.preventDefault();
      try {
        await api.patch(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${id}`, {
          fullname, email, password, verified, role
        });
        toast({
          title: "User has been updated",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: false,
        });
        navigate("/user_list");
      } catch (error) {
        toast({
          title: "There is an error when updating the user",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: false,
        });
        console.log(error);
      }
    };
  
    const getUserById = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${id}`);
        setFullName(response.data.fullname);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setVerified(response.data.verified);
        setRole(response.data.role);
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
        navigate("/user_list");
      }
    };
  
    return (
      <Container>
        <form onSubmit={updateUser}>
        <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type='text' value={fullname} onChange={(e) => setFullName(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type='password' placeholder='Password' id='password'
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                    <FormLabel>Verified</FormLabel>
                    <Select placeholder='Select Role' value={verified} onChange={(e) => setVerified(e.target.value)}>
                        <option value={true}>Verified</option>
                        <option value={false}>Unverified</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Role</FormLabel>
                    <Select placeholder='Select Role' value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value={'W_ADMIN'}>Warehouse Admin</option>
                        <option value={'USER'}>User</option>
                    </Select>
                </FormControl>
          <Box mt={2}>
            <HStack>
              <Button size={'sm'} w={'20%'} type="submit" colorScheme="twitter">
                Update
              </Button>
              <Button size={'sm'} w={'20%'} colorScheme="orange" onClick={() => navigate("/user_list")}>
                Cancel
              </Button>
            </HStack>
          </Box>
        </form>
      </Container>
    );
  };
  
  export default EditUser;