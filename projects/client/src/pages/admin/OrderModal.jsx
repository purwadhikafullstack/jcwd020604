import React, { useEffect, useState } from "react";
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
	useToast,
	VStack,
	Spacer,
	Divider,
	ButtonGroup,
	Select,
} from "@chakra-ui/react";
import { api } from "../../api/api";

const OrderModal = (props) => {
	const [orderById, setOrderById] = useState([]);
	const toast = useToast();
	const orderDate = orderById?.createdAt ? new Date(orderById.createdAt) : null;
	const [action, setAction] = useState("");
	const [sending, setSending] = useState("");

	useEffect(() => {
		if (props.selectedOrder) getDetailById();
	}, [props.selectedOrder]);

	const getDetailById = async () => {
		try {
			await api()
				.get(`/orders/orders/${props.selectedOrder}`)
				.then((response) => {
					setOrderById(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (error) {
			toast({
				title: "There is something error while executing this command",
				status: "error",
				duration: 3000,
				isClosable: false,
			});
		}
	};

	const confirmOrReject = async () => {
		try {
			await api().patch(
				`/orders/orders/confirm-payment/${props.selectedOrder}`,
				{ action }
			);
			if (action === "accept") {
				toast({
					title: "Payment received, order status updated to Processing",
					status: "success",
					position: "top",
					duration: 3000,
					isClosable: false,
				});
				getDetailById();
				props.onClose();
				props.fetchData();
			} else {
				toast({
					title:
						"Payment is rejected, order status is updated to Waiting for Payment",
					status: "error",
					duration: 3000,
					position: "top",
					isClosable: false,
				});
				getDetailById();
				props.onClose();
				props.fetchData();
			}
		} catch (error) {
			toast({
				title: "Payment has been accepted or Done",
				status: "info",
				position: "top",
				duration: 3000,
				isClosable: false,
			});
			props.onClose();
			props.fetchData();
		}
	};

	const handleActionChange = (e) => {
		setAction(e.target.value);
	};

	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						fontSize={"sm"}
						color={"blackAlpha.700"}
						fontWeight={"bold"}
						fontFamily={"sans-serif"}
					>
						Detail Product
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Card
							my={2}
							mx={{ base: "12", sm: "6", md: "10" }}
							size={"md"}
							display={"block"}
							position={"relative"}
							bgColor={"white"}
						>
							<CardHeader>
								<Stack
									direction={{ base: "column", md: "column", sm: "row" }}
									px={1}
									display={"flex"}
									align={"flex-start"}
									justifyContent={"flex-start"}
								>
									<Badge
										variant="solid"
										colorScheme={
											orderById?.status === "CANCELLED"
												? "red"
												: orderById?.status === "PAYMENT"
												? "blue"
												: orderById?.status === "WAITING_PAYMENT"
												? "purple"
												: orderById?.status === "WAITING_STOCK_TRANSFER"
												? "orange"
												: orderById?.status === "DELIVERY"
												? "blue"
												: orderById?.status === "PROCESSING"
												? "teal"
												: "green"
										}
									>
										{orderById?.status}
									</Badge>
									<Text
										fontSize={"xs"}
										fontWeight={"medium"}
										textColor={"green.400"}
									>
										No.Invoice:{orderById?.invoice}
									</Text>
								</Stack>
								<Flex m={1}>
									<Text
										fontSize={"xs"}
										fontWeight={"medium"}
										textColor={"blackAlpha.600"}
									>
										Order Date: {orderDate ? orderDate.toDateString() : "N/A"}
									</Text>
								</Flex>
								<Flex m={1}>
										{orderById.status === "CANCELLED" ? 
										(<></>) : (
										<>
											<Select
												placeholder="Select action ..."
												textColor={"blackAlpha.600"}
												fontWeight={"bold"}
												cursor={"pointer"}
												w={"sm"}
												fontSize={"xs"}
												variant="unstyled"
												value={action}
												onChange={handleActionChange}
											>
												<option value="accept" style={{ fontWeight: "bold" }}>
													Accept Payment
												</option>
												<option value="reject" style={{ fontWeight: "bold" }}>
													Reject Payment
												</option>
											</Select>
										</>
										)}	
								</Flex>
							</CardHeader>
							<CardBody>
								<Flex align={"flex-start"} justifyContent={"flex-start"}>
									<Text
										fontSize={"xs"}
										px={1}
										bgColor={"blackAlpha.100"}
										fontWeight={"bold"}
										textColor={"blackAlpha.600"}
									>
										{orderById?.user?.fullname}
									</Text>
								</Flex>
								{orderById?.order_details?.map((detail) => (
									<Box key={detail.id}>
										<VStack>
											<Image
												src={`${process.env.REACT_APP_API_BASE_URL}/${detail?.stock?.product?.product_images[0]?.product_image}`}
												w={"100%"}
												boxSize="250px"
												objectFit="cover"
											></Image>
											<Stack spacing={"3"}>
												<Text
													fontSize={"sm"}
													fontWeight={"bold"}
													textColor={"blackAlpha.600"}
												>
													{detail?.stock?.product?.product_name}
												</Text>
												<Flex w={{ base: "100%", sm: "100%", md: "100%" }}>
													<Text
														textAlign={"justify"}
														as={"p"}
														fontSize={"sm"}
														fontWeight={"semibold"}
														textColor={"blackAlpha.600"}
													>
														{detail?.stock?.product?.product_detail}
													</Text>
												</Flex>
												<HStack
													display={"flex"}
													flexDir={{ base: "column", md: "row" }}
													bgColor={"green.300"}
													rounded={"md"}
													boxShadow={"2xl"}
												>
													<Text
														fontSize={"sm"}
														fontWeight={"normal"}
														textColor={"white"}
													>
														{detail?.qty} barang x Rp{detail?.price}
													</Text>
													<Spacer />
													<Text
														fontSize={"sm"}
														fontWeight={"normal"}
														textColor={"white"}
													>
														Total Harga : {detail?.price}
													</Text>
												</HStack>
											</Stack>
											<Divider orientation="horizontal" />
											<Flex
												flexWrap={"wrap"}
												flexDir={"column"}
												alignItems={"flex-start"}
												justifyContent={"flex-start"}
												my={2}
											>
												<Text
													fontWeight={"bold"}
													textColor={"blackAlpha.600"}
													my={2}
												>
													Shipping Information
												</Text>
												<Text
													fontSize={"sm"}
													fontWeight={"semibold"}
													textColor={"blackAlpha.600"}
												>
													Kurir : {orderById?.courier}
												</Text>
												<Divider orientation="horizontal" my={2} />
												<Flex w={{ base: "100%", sm: "100%", md: "100%" }}>
													<Text
														textAlign={"justify"}
														as={"p"}
														fontSize={"sm"}
														fontWeight={"semibold"}
														textColor={"blackAlpha.600"}
													>
														No. Resi : {orderById?.payment_proof}
													</Text>
												</Flex>
												<Divider orientation="horizontal" my={2} />
												<Stack
													display={"flex"}
													flexDir={{ base: "column", md: "column" }}
												>
													<Text
														fontSize={"sm"}
														fontWeight={"semibold"}
														textColor={"blackAlpha.600"}
													>
														Alamat :{" "}
													</Text>
													<Divider orientation="horizontal" />
													<Text
														fontSize={"sm"}
														fontWeight={"semibold"}
														textColor={"blackAlpha.600"}
													>
														{orderById?.user?.addresses[0]?.address},{" "}
														{orderById?.user?.addresses[0]?.district}
													</Text>
													<Text
														fontSize={"sm"}
														fontWeight={"semibold"}
														textColor={"blackAlpha.600"}
													>
														{orderById?.user?.addresses[0]?.city},{" "}
														{orderById?.user?.addresses[0]?.province}
													</Text>
												</Stack>
												<Divider orientation="horizontal" />
											</Flex>
										</VStack>
									</Box>
								))}
							</CardBody>
						</Card>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup mx={{ base: "12", sm: "6", md: "10" }}>
							<Button colorScheme="green" size={"xs"} onClick={confirmOrReject}>
								Confirm
							</Button>
							<Button colorScheme="orange" size={"xs"} onClick={props.onClose}>
								Close
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default OrderModal;
