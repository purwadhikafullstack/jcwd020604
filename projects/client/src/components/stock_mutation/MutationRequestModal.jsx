import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
	Flex,
	Image,
} from "@chakra-ui/react";
import { api } from "../../api/api";

export default function MutationRequestModal({
	isOpen,
	onClose,
	request,
	getMutation,
	getRequest,
}) {
	const toast = useToast();

	const handleApprove = async (requestId) => {
		try {
			await api().patch(`/stockmutation/mutation/handle/${requestId}`, {
				status: "APPROVED",
			});
			toast({
				title: "Mutation request approved.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getMutation();
			getRequest();
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	};
	const handleReject = async (requestId) => {
		try {
			await api().patch(`/stockmutation/mutation/handle/${requestId}`, {
				status: "REJECTED",
			});
			toast({
				title: "Mutation request rejected.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getMutation();
			getRequest();
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent maxH={"700px"}>
				<ModalHeader fontSize={'md'} fontWeight={'bold'}>Stock Mutation Request</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					{request?.length ? (
						request?.map((request) => {
							return (
								<>
									{request?.stock?.id ? (
										<Flex
											flexDir={"column"}
											border={"1px"}
											p={"15px"}
											mb={"15px"}
											borderRadius={"10px"}
											borderColor={"#E6EBF2"}
											id="id"
										>
											<Flex gap={"15px"}>
												<Image
													borderRadius={"10px"}
													w={"70px"}
													h={"70px"}
													src={
														`${process.env.REACT_APP_API_BASE_URL}/${request?.stock?.product?.product_images[0]}`
															? `${process.env.REACT_APP_API_BASE_URL}/${request?.stock?.product?.product_images[0].product_image}`
															: null
													}
												/>
												<Flex flexDir={"column"}>
													<Flex fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>
														From:{" "}
														{request?.from_warehouse?.warehouse_name
															? request?.from_warehouse?.warehouse_name
															: "Undefined warehouse"}
													</Flex>
													<Flex fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>
														To:{" "}
														{request?.to_warehouse?.warehouse_name
															? request?.to_warehouse?.warehouse_name
															: "Undefined warehouse"}
													</Flex>
													<Flex fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>
														Product: {request?.stock?.product?.product_name}
													</Flex>
													<Flex fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Amount: {request.qty}</Flex>
												</Flex>
											</Flex>
											<Flex justifyContent={"end"} gap={"10px"} pt={"15px"}>
												<Button
													colorScheme="red"
													rounded={'sm'}
													size={'xs'}
													id="id"
													onClick={() => handleReject(request.id)}
												>
													Reject
												</Button>
												<Button
													colorScheme="green"
													rounded={'sm'}
													size={'xs'}
													id="id"
													onClick={() => handleApprove(request.id)}
												>
													Approve
												</Button>
											</Flex>
										</Flex>
									) : null}
								</>
							);
						})
					) : (
						<Flex fontSize={'sm'} fontWeight={'medium'}>No Mutation Request</Flex>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
