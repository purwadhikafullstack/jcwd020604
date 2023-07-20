import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import { api } from '../api/api';
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const toast = useToast();
    const nav = useNavigate();
    const inputHandler = (e) => {
        const { id, value } = e.target;
        const tempUser = { ...user };
        tempUser[id] = value;
        setUser(tempUser);
    };
    
    let token;
    const login = async () => {
        try {
          if (!user.email || !user.password) {
            toast({
              title: "Isi data dengan benar",
              status: "warning",
              position: "top",
              duration: 3000,
              isClosable: false,
            });
          } else {
            await api
              .post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, user)
              .then((res) => {
                localStorage.setItem("auth", JSON.stringify(res.data.token));
                token = res.data.token;
              });
            console.log(token);
            await api
              .get(`${process.env.REACT_APP_API_BASE_URL}/auth/v2`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                dispatch({
                  type: "login",
                  payload: res.data,
                });
                toast({
                  title: "Selamat datang",
                  status: "success",
                  position: "top",
                  duration: 3000,
                  isClosable: false,
                })
                nav("/");
              });
          }
        } catch (err) {
          console.log(err.message);
        }
      };
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign In
                </Heading>
            </Stack>
              <HStack>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder='Email' id='email' onChange={inputHandler}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' onChange={inputHandler}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                  <Link to={'/login'}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      w={'100%'}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }} onClick={login}>
                      Sign In
                    </Button>
                  </Link>
                  <Link to={'/register'}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      w={'100%'}
                      bg={'green.400'}
                      color={'white'}
                      _hover={{
                        bg: 'green.500',
                      }}>
                      Register
                    </Button>
                  </Link>
                  <Stack>
                    <Text align={'center'}>
                      Back to 
                      <Link to={'/'}>
                        <Text cursor={'pointer'} textColor={'blue.500'} _hover={{textColor: 'blue.600'}}
                        >Homepage</Text>
                      </Link>
                    </Text>
                  </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }