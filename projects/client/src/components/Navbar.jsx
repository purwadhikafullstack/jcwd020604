import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Image,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useToast,
  InputRightElement,
  InputGroup,
  useColorMode
} from '@chakra-ui/react';
import {FiLogOut, FiLogIn, FiShoppingCart, FiSearch, FiMoon, FiSun} from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const toast = useToast();

  function logout() {
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
    navigate('/login')
    toast({
      title: "Anda telah logout",
      status: "success",
      position: "top",
      isClosable: true
    })
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image
              src={Logo}
              minW={'50px'}
              w={'20px'}
              cursor={'pointer'}>
              </Image>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {user.role === "ADMIN" ? (
              <>
                <Flex><Link to={'/'}>Dashboard</Link></Flex>
                <Flex><Link to={'/#'}>Products</Link></Flex>
                <Flex cursor={'pointer'} onClick={()=>navigate("/user_list")}>Users</Flex>
              </>) : (
              <>
                <Flex><Link to={'/#'}>Tops</Link></Flex>
                <Flex><Link to={'/#'}>Bottoms</Link></Flex>
                <Flex><Link to={'/#'}>Outerwares</Link></Flex>
                <Flex><Link to={'/#'}>Accerories</Link></Flex>
              </>)}
            <Flex>
                <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <FiSearch color='gray.300' cursor={'pointer'} />
                  </InputRightElement>
                  <Input type='tel' placeholder='Search . . .' />
                </InputGroup>
            </Flex>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
          <IconButton
              icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
              isRound={"true"}
              size={'md'}
              alignSelf={"flex-end"}
              onClick={toggleColorMode}
			    ></IconButton>
          <Box m={2} pr={4} cursor={'pointer'}>
            <FiShoppingCart/>
          </Box>
            <Menu>
              {user.fullname ? (<><Text fontSize={'12px'} mr={2}>Welcome <Text as={'b'}>{user.fullname}</Text></Text>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                {user.role === "ADMIN" ? (
                <><MenuItem onClick={()=>navigate("/admin_profile")}>Manage Profile</MenuItem></>
                ) : (
                <><MenuItem onClick={()=>navigate("/user_profile")}>Manage Profile</MenuItem>,
                <MenuItem onClick={()=>navigate("/reset_password")}>Reset Password</MenuItem></>)}
              </MenuList>
              <Link to={'/'}><Button onClick={logout} size={'sm'} variant={'ghost'} leftIcon={<FiLogOut/>} _hover={{color:'red'}}>Logout</Button></Link>
             </>) : (<> <Link to={'/login'}>
              <Button size={'sm'} variant={'ghost'} leftIcon={<FiLogIn/>}>Login</Button>
              </Link></>)}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {user.role === "ADMIN" ? (
              <>
               <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <FiSearch color='gray.300' />
                  </InputRightElement>
                  <Input type='tel' placeholder='Search . . .' />
                </InputGroup>
                <Flex><Link to={'/'}>Dashboard</Link></Flex>
                <Flex><Link to={'/#'}>Products</Link></Flex>
                <Flex cursor={'pointer'} onClick={()=>navigate("/user_list")}>Users</Flex>
              </>) : (
              <>
                <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <FiSearch color='gray.300' />
                  </InputRightElement>
                  <Input type='tel' placeholder='Search . . .' />
                </InputGroup>
                <Flex><Link to={'/#'}>Tops</Link></Flex>
                <Flex><Link to={'/#'}>Bottoms</Link></Flex>
                <Flex><Link to={'/#'}>Outerwares</Link></Flex>
                <Flex><Link to={'/#'}>Accerories</Link></Flex>
                <Box>
            </Box>
              </>)}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}></Box>
    </>
  );
}