import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Avatar,
  Image,
  Stack,
  Select,
  ButtonGroup,
  useToast
} from '@chakra-ui/react';
import {
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../api/api';
import Navbar from '../../components/Navbar';

export default function UserProfile() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const toast = useToast();
  console.log(city);
  console.log(province);
  console.log(user);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

useEffect(() => {
  if(selectedFile){
    uploadAvatar();
  }
},[selectedFile]);

async function uploadAvatar() {
  const formData = new FormData();
  formData.append("userImg", selectedFile);
  console.log(selectedFile);
  await api
  .post(`${process.env.REACT_APP_API_BASE_URL}/auth/${user.uuid}`, formData)
  .then((res) => {
      navigate("/user_profile")
    });
}

const getAddressById = async () => {
  const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${user.uuid}`)
  console.log(res.data);
}

const getUserCity = async () => {
  const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/city`)
  setCity(res.data);
}

const getUserProvince = async () => {
  const res = await api.get(`${process.env.REACT_APP_API_BASE_URL}/address/getAll/province`)
  setProvince(res.data);
}

useEffect(() => {
  getUserCity();
  getUserProvince();
  getAddressById();
},[])

const handleInputChange = (e) => {
  const { name, value } = e.target;
  user((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  return (
    <>
    <Navbar/>
      <Container maxW="full" centerContent overflow="hidden">
            <Flex>
              <Box
                color="white"
                borderRadius="lg"
                m={{ sm: 4, md: 16, lg: 10 }}
                p={{ sm: 5, md: 5, lg: 2}}
                >
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <Heading color={'facebook.600'}>Profile</Heading>
                    </Flex>
                    <Text display={'flex'} justifyContent={'center'} alignItems={'center'} mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                        Fill up the form below to update
                    </Text>
                <Box p={4}>
                  <Wrap>
                    <WrapItem>
                      <Box>
                          <VStack pl={0} spacing={2} alignItems={"flex-start"}>
                            <Box bg="white" w={'300px'} borderRadius="lg" alignItems={{base:"center", md: "center", sm: "center"}}>
                                <Box m={0} color="#0B0E3F">
                                <VStack spacing={2} maxW={'300px'}
                                    w={'full'}
                                    bg={'whiteAlpha.200'}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                    overflow={'hidden'}>
                                    <Image
                                    h={'120px'}
                                    w={'full'}
                                    src={'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
                                    objectFit={'cover'}
                                    />
                                    <Flex justify={'center'} mt={-12}>
                                    <Avatar
                                        size={'xl'}
                                        src={
                                          user.avatar_url
                                        }
                                        alt={'Author'}
                                        css={{
                                        border: '2px solid white',
                                        }}
                                    />
                                    </Flex>

                                    <Box p={6}>
                                    <Stack spacing={0} align={'center'} mb={5}>
                                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                        {user.fullname}
                                        </Heading>
                                        <Text color={'gray.500'}>{user.email}</Text>
                                    </Stack>
                                    <Stack direction={'row'} justify={'center'} spacing={6}>
                                        <Stack spacing={0} align={'center'}>
                                        <Text fontWeight={600}>Role</Text>
                                        <Text fontSize={'sm'} color={'gray.500'}>
                                            {user.role}
                                        </Text>
                                        </Stack>
                                    </Stack>
                                    <Input
                                        accept="image/png, image/jpeg"
                                        ref={inputFileRef}
                                        type="file"
                                        display={"none"}
                                        onChange={handleFile}
                                      />
                                    <Button
                                        w={'full'}
                                        mt={8}
                                        bg={'gray.900'}
                                        color={'white'}
                                        rounded={'md'}
                                        _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg',
                                        }}
                                        onClick={() => {inputFileRef.current.click(); navigate("/user_profile")}}>
                                        Change Image
                                    </Button>
                                    </Box>
                                </VStack>
                                </Box>
                            </Box>
                          </VStack>
                        {/* <Box py={{ base: 4, sm: 5, md: 8, lg: 10 }}>
                        </Box> */}
                        <HStack
                          mt={{ lg: 10, md: 10 }}
                          spacing={5}
                          px={5}
                          alignItems="flex-start">
                          <IconButton
                            aria-label="facebook"
                            variant="ghost"
                            color={'#97979c'}
                            size="lg"
                            isRound={true}
                            _hover={{ bg: 'white' }}
                            icon={<MdFacebook size="28px" />}
                          />
                          <IconButton
                            aria-label="github"
                            variant="ghost"
                            color={'#97979c'}
                            size="lg"
                            isRound={true}
                            _hover={{ bg: 'white' }}
                            icon={<BsGithub size="28px" />}
                          />
                          <IconButton
                            aria-label="discord"
                            variant="ghost"
                            color={'#97979c'}
                            size="lg"
                            isRound={true}
                            _hover={{ bg: 'white' }}
                            icon={<BsDiscord size="28px" />}
                          />
                        </HStack>
                      </Box>
                    </WrapItem>
                    <WrapItem>
                      <Box bg="white" borderRadius="lg" boxShadow={'2xl'} overflow={'hidden'} h={'83%'}>
                        <Text display={'flex'} justifyContent={'center'} alignItems={'center'} mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                            Edit Your Data
                        </Text>
                        <Box m={8} color="#0B0E3F">
                          <VStack spacing={5}>
                                    <FormControl id="name">
                                      <FormLabel>Your Name</FormLabel>
                                      <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement pointerEvents="none" children={<BsPerson color="gray.800" />} />
                                        <Input type="text" size="md" onChange={handleInputChange} />
                                      </InputGroup>
                                    </FormControl>
                              <FormControl id="email">
                                <FormLabel>Email</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdOutlineEmail color="gray.800" />}
                                  />
                                  <Input type="email" readOnly={true} size="md" placeholder={user.email}/>
                                </InputGroup>
                              </FormControl>
                              <FormControl id="button">
                                      <ButtonGroup>
                                        <Button
                                          type="submit"
                                          variant="solid"
                                          colorScheme='blue'
                                          h={'30px'}
                                          w={'70px'}
                                        >
                                          Save
                                        </Button>
                                        <Button
                                          variant="solid"
                                          colorScheme='orange'
                                          h={'30px'}
                                          w={'70px'}
                                          onClick={() => navigate("/")}
                                        >
                                          Cancel
                                        </Button>
                                    </ButtonGroup>
                                    </FormControl>
                                    <Box>Props alamat disini</Box>
                            </VStack>
                        </Box>
                      </Box>
                    </WrapItem>
                    <WrapItem>
                      <Box  bg="white" borderRadius="lg" boxShadow={'2xl'} overflow={'hidden'} h={'83%'}>
                        <Text display={'flex'} justifyContent={'center'} alignItems={'center'} mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                            Add Address
                        </Text>
                        <Box m={8} color="#0B0E3F">
                        <VStack spacing={5}>
                          <FormControl id="address">
                                    <FormLabel>Address</FormLabel>                                 
                                        <Textarea
                                          borderColor="gray.300"
                                          _hover={{
                                            borderRadius: 'gray.300',
                                          }}
                                          placeholder={'Isi alamat yang sesuai'}
                                        />
                                </FormControl>
                                  <Select name='city'>
                                    {city.length? city.map((val) => (
                                      <option>{val.city_name}</option>
                                    )) : null}
                                  </Select>
                                  <Select name='province'>
                                    {province.length? province.map((val) => (
                                      <option>{val.province}</option>
                                    )) : null}
                                  </Select>
                                      <FormControl id="button">
                                        <ButtonGroup>
                                          <Button
                                            type="submit"
                                            variant="solid"
                                            colorScheme='blue'
                                            w={'100px'}
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            variant="solid"
                                            colorScheme='orange'
                                            w={'100px'}
                                            onClick={() => navigate("/")}
                                          >
                                            Cancel
                                          </Button>
                                      </ButtonGroup>
                                      </FormControl>
                                </VStack>
                            </Box>
                      </Box>
                    </WrapItem>
                  </Wrap>
                </Box>
              </Box>
            </Flex>
      </Container>
    </>
  );
}