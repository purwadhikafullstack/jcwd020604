import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Card,
    CardHeader,
    CardBody,
    Box,
    Text,
    Stack,
    Badge,
    Image,
    HStack,
    useToast
  } from '@chakra-ui/react'
  import { api } from '../../api/api';

const OrderModal = (props) => {
    const [orderById, setOrderById] = useState([]);
    const toast = useToast();

    console.log(orderById);

    useEffect(() => {
        if(props.selectedOrder)
        getDetailById();
       }, [props.selectedOrder]);
       
    const getDetailById = async() => {
        try {
            api.get(`/orders/orders/${props.selectedOrder}`)
            .then((response) => {
                setOrderById(response.data);
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

    return (
        <>
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                 
                    <Card my={2} mx={{base: '12', sm: '6', md: '14'}} size={'sm'} display={'block'} position={'relative'} bgColor={'white'}>
                        <CardHeader>
                            <Stack direction={'row'} px={1} display={'flex'} align={'center'} justifyContent={'flex-end'}>
                                <Badge variant='solid' colorScheme={orderById?.status === "CANCELLED" ? 'red' : orderById?.status === "PAYMENT" ? 'blue' : orderById?.status === "CONFIRM_PAYMENT" ? 'purple' : orderById?.status === "DELIVERY" ? 'grey' : orderById?.status === "PROCESSING" ? 'teal' : 'green'}>
                                    {orderById?.status}
                                </Badge>
                                <Text fontSize={'sm'} fontWeight={'medium'} textColor={'blackAlpha.600'}>No. Invoice: {orderById?.invoice}</Text>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <Flex align={'flex-start'} justifyContent={'flex-start'}>
                                <Text fontSize={'xs'} px={1} bgColor={'blackAlpha.100'} fontWeight={'bold'} textColor={'blackAlpha.600'}>{orderById?.user?.fullname}</Text>
                            </Flex>
                                {orderById?.order_details?.map(detail => (
                                    <Box key={detail.id}>
                                        <HStack>
                                            <Image src={detail?.stock?.product?.product_images[0]?.product_image}
                                                w={"100%"}
                                                boxSize='250px'
                                                objectFit='cover'>   
                                            </Image>
                                            <Stack spacing={'3'}>
                                                <Text fontSize={'sm'} fontWeight={'bold'} textColor={'blackAlpha.600'}>{detail?.stock?.product?.product_name}</Text>
                                                    <Flex w={{base: '50%', sm: '100%', md: '50%'}}>
                                                        <Text textAlign={'justify'} as={'p'} fontSize={'sm'} fontWeight={'semibold'} textColor={'blackAlpha.600'}>{detail?.stock?.product?.product_detail}</Text>
                                                    </Flex>
                                                <Text fontSize={'sm'} fontWeight={'normal'} textColor={'blackAlpha.600'}>{detail?.qty} barang x Rp{detail?.price}</Text>
                                            </Stack>
                                        </HStack>
                                    </Box>
                                ))}
                        </CardBody>
                    </Card>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}

export default OrderModal;
