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
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
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
              duration: 1000,
              isClosable: true,
            });
          } else {
            await axios
              .post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, user)
              .then((res) => {
                localStorage.setItem("auth", JSON.stringify(res.data.token));
                token = res.data.token;
              })
              .catch((err) =>
                console.log(err.response.data),
                // toast({
                //   title: err.response.data,
                //   status: "error",
                //   position: "top",
                //   duration: 1000,
                //   isClosable: true,
                // })
                );
    console.log(token);
            await axios
              .get(`${process.env.REACT_APP_API_BASE_URL}/auth/v2`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                // params: {
                //   token,
                // },
              })
              .then((res) => {
                console.log(res.data);
                dispatch({
                  type: "login",
                  payload: res.data,
                });
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
              <Stack spacing={10} pt={2}>
                <Link to={'/'}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={login}>
                  Sign In
                </Button>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }