import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Box,
    Text,
    Stack,
    useToast,
    Badge,
    Flex,
    Image,
    HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    
    useEffect(() => {
     fetchData();
    }, []);

    const fetchData = async() => {
        try {
            api.get(`/orders/orders`)
            .then((response) => {
                setOrders(response.data);
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

    console.log(orders);

    return (
        <>
            <Navbar/>
                {orders.map((order) => (
                    <Card my={2} mx={{base: '12', sm: '6', md: '14'}} size={'md'} display={'block'} position={'relative'} bgColor={'white'}>
                        <CardHeader key={order.id}>
                            <Stack direction={'row'} display={'flex'} align={'center'} justifyContent={'flex-end'}>
                                <Badge variant='solid' colorScheme={order.status === "CANCELLED" ? 'red' : order.status === "PAYMENT" ? 'blue' : order.status === "CONFIRM_PAYMENT" ? 'purple' : order.status === "DELIVERY" ? 'grey' : order.status === "PROCESSING" ? 'teal' : 'green'}>
                                    {order.status}
                                </Badge>
                                <Text fontSize={'sm'} fontWeight={'medium'} textColor={'blackAlpha.600'}>No. Invoice: {order.invoice}</Text>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <Flex align={'flex-start'} justifyContent={'flex-start'}>
                                <Text fontSize={'xs'} fontWeight={'bold'} textColor={'blackAlpha.600'}>{order.user?.fullname}</Text>
                            </Flex>
                                {order.order_details.map(detail => (
                                    <Box key={detail.id}>
                                        <HStack>
                                            <Image src={detail.stock.product.product_images[0].product_image}
                                                w={"100%"}
                                                boxSize='250px'
                                                objectFit='cover'>   
                                            </Image>
                                            <Stack spacing={'3'}>
                                                <Text fontSize={'sm'} fontWeight={'bold'} textColor={'blackAlpha.600'}>{detail.stock.product.product_name}</Text>
                                                <Flex w={{base: '50%', sm: '100%', md: '50%'}}>
                                                    <Text textAlign={'justify'} as={'p'} fontSize={'sm'} fontWeight={'semibold'} textColor={'blackAlpha.600'}>{detail.stock.product.product_detail}</Text>
                                                </Flex>
                                                <Text fontSize={'sm'} textColor={'blackAlpha.600'}>Quantity : {detail.qty}</Text>
                                                <Text fontSize={'sm'} fontWeight={'bold'} textColor={'blackAlpha.600'}>Price : Rp{detail.price}</Text>
                                            </Stack>
                                            <Stack>
                                            </Stack>
                                        </HStack>
                                    </Box>
                                ))}
                        </CardBody>
                    </Card>
                ))}
            <Footer/>
        </>
    );
}

export default AdminOrder;
