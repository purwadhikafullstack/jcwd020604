import {
    ButtonGroup,
    Grid,
    GridItem,
    Stack,
    Input,
    Heading,
    Avatar,
    Box,
    Card,
    CardHeader,
    CardBody,
    StackDivider,
    Image,
    Flex,
    Text,
    Button,
    useColorModeValue
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  
  export default function AdminProfile() {
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}>
                    <GridItem rowSpan={2} colSpan={1}>
                                <Box
                                    maxW={'270px'}
                                    w={'full'}
                                    m={2}
                                    h={'100%'}
                                    bg={useColorModeValue('white', 'gray.800')}
                                    boxShadow={'2xl'}
                                    rounded={'md'}
                                    overflow={'hidden'}>
                                    <Image
                                    h={'120px'}
                                    w={'full'}
                                    src={
                                        'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                                    }
                                    objectFit={'cover'}
                                    />
                                    <Flex justify={'center'} mt={-12}>
                                    <Avatar
                                        size={'xl'}
                                        src={
                                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
                                        <Text fontWeight={600}>23k</Text>
                                        <Text fontSize={'sm'} color={'gray.500'}>
                                            Followers
                                        </Text>
                                        </Stack>
                                        <Stack spacing={0} align={'center'}>
                                        <Text fontWeight={600}>23k</Text>
                                        <Text fontSize={'sm'} color={'gray.500'}>
                                            Followers
                                        </Text>
                                        </Stack>
                                    </Stack>

                                    <Button
                                        w={'full'}
                                        mt={8}
                                        bg={useColorModeValue('#151f21', 'gray.900')}
                                        color={'white'}
                                        rounded={'md'}
                                        _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'lg',
                                        }}>
                                        Change Profile Picture
                                    </Button>
                                    </Box>
                                </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                                <Card m={2} h={'100%'}>
                                    <CardHeader>
                                        <Heading size='md'>Admin Profile</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Name
                                            </Heading>
                                            <Input variant='flushed' placeholder={user.fullname} />
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Address
                                            </Heading>
                                            <Input variant='flushed' placeholder='Address' />
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Cart History
                                            </Heading>
                                            <Input variant='flushed' placeholder='Cart History' />
                                        </Box>
                                        <Box>
                                        <ButtonGroup variant='outline' spacing='6'>
                                            <Button colorScheme='blue'>Save</Button>
                                            <Button colorScheme='orange' onClick={() => navigate("/")}>Cancel</Button>
                                        </ButtonGroup>
                                        </Box>
                                        </Stack>
                                    </CardBody>
                                </Card>
                    </GridItem>
            </Grid>
    );
  }