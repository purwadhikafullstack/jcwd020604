import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Image,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import {FiLogOut, FiLogIn} from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              w={'20px'}>
              </Image>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
                <Flex><Link to={'/'}>Dashboard</Link></Flex>
                <Flex><Link to={'/#'}>Products</Link></Flex>
                  {/* {user && user.role === "ADMIN" && (
                    <Flex><Link to={'/users'}></Link>Users</Flex>
                  )}; */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
             
              {user.fullname ? (<> <Text mr={2}><Text as={'b'}>{user.fullname}</Text></Text>
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
              <Link to={'/'}> <Button onClick={logout} size={'sm'} variant={'ghost'} leftIcon={<FiLogOut/>}>Logout</Button></Link>
             </>) : (<> <Link to={'/login'}>
              <Button size={'sm'} variant={'ghost'} leftIcon={<FiLogIn/>}>Login</Button>
              </Link></>)}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Text>Dashboard</Text>
              <Text><Link to={'#'}>Products</Link></Text>
              {/* {user && user.role === "ADMIN" && (
                <Flex><Link to={'/users'}></Link>Users</Flex>
              )}; */}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}