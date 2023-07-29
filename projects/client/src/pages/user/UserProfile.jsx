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
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import {
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson, BsCamera } from 'react-icons/bs';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { api } from '../../api/api';
import Navbar from '../../components/Navbar';
import EditUserProfile from './EditUserProfile';

export default function UserProfile() {
  const user = useSelector((state) => state.auth);
  const editUserProfile = useDisclosure();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const toast = useToast();
  const [userId, setUserId] = useState("");
  const {uuid} = useParams();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

const [isFormSubmitted, setIsFormSubmitted] = useState(false);

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
});

const initialValues = {
  name: user.fullname,
  email: user.email,
  address: '',
  province: '',
  city: ''
};

const [users, setUsers] = useState([]);

useEffect(() => {
  if(selectedFile){
    uploadAvatar();
  }
},[selectedFile]);

const handleSubmit = (values, { setSubmitting }) => {
  setIsFormSubmitted(true);
  saveUser(values);
  setSubmitting(false);
};

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
},[]);

useEffect(() => {
  fetchData();
 }, []);

const fetchData = async() => {
  try {
      api.get(`${process.env.REACT_APP_API_BASE_URL}/auth/users/${uuid}`)
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

const saveUser = async (values) => {
  try {
      await api.post(`${process.env.REACT_APP_API_BASE_URL}/address/`, values);
      toast({
          title:"User has been updated",
          status:"success",
          duration:3000,
          isClosable:false
      });
      navigate("/user_profile");
  } catch (error) {
      toast({
          title:"There is an error when input user",
          status:'error',
          duration:3000,
          isClosable:false
      });
      console.log(error);
  }
}

  return (
    <>
    <Navbar/>
      <Container maxW="full" centerContent overflow="hidden">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
          <Form>
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
                  <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                    <WrapItem>
                      <Box>
                          <VStack pl={0} spacing={2} alignItems={"flex-start"}>
                            <Box bg="white" w={'300px'} borderRadius="lg" alignItems={{base:"flex-start", md: "center", sm: "center"}}>
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
                                    <Button
                                        w={'full'}
                                        mt={8}
                                        bg={'green.400'}
                                        color={'white'}
                                        rounded={'md'}
                                        _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg',
                                        }}
                                        onClick={() => {editUserProfile.onOpen(); setUserId(user.uuid)}}
                                        >
                                        Edit Data
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
                      <Box bg="white" borderRadius="lg" boxShadow={'2xl'} overflow={'hidden'}>
                        <Box m={8} color="#0B0E3F">
                          <> 
                          <VStack spacing={5}>
                            <Field name="name">
                                  {({ field }) => (
                                    <FormControl id="name" isInvalid={isFormSubmitted && !!field.error}>
                                      <FormLabel>Your Name</FormLabel>
                                      <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement pointerEvents="none" children={<BsPerson color="gray.800" />} />
                                        <Input {...field} type="text" size="md" readOnly={true}/>
                                      </InputGroup>
                                      <ErrorMessage name="name" component={Text} color="red.500" />
                                    </FormControl>
                                  )}
                              </Field>
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
                              <FormControl id="address">
                                  <FormLabel>Address</FormLabel>
                                  <Field name="address">
                                    {({ field }) => (
                                      <Textarea
                                        {...field}
                                        borderColor="gray.300"
                                        _hover={{
                                          borderRadius: 'gray.300',
                                        }}
                                        placeholder={''}
                                      />
                                    )}
                                  </Field>
                                  <ErrorMessage name="address" component={Text} color="red.500" />
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
                                          isLoading={isSubmitting}
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
                            </>
                        </Box>
                      </Box>
                    </WrapItem>
                  </Wrap>
                </Box>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
      </Container>
      <EditUserProfile uuid={userId} isOpen={editUserProfile.isOpen} onClose={editUserProfile.onClose} fetchData={fetchData}/>
    </>
  );
}