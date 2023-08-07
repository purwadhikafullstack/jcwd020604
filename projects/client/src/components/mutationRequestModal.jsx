import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Flex,
	Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function MutationRequestModal({ isOpen, onClose, request }) {
	const toast = useToast();
	const nav = useNavigate();
	console.log(request);

	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent maxH={"700px"}>
				<ModalHeader>Stock Mutation Request</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					{request?.length ? (
						request?.map((request) => {
							return (
								<Flex
									flexDir={"column"}
									border={"1px"}
									p={"15px"}
									mb={"15px"}
									borderRadius={"10px"}
								>
									<Flex></Flex>
									<Flex gap={"15px"}>
										<Image
											borderRadius={"10px"}
											w={"70px"}
											h={"70px"}
											src={
												request?.stock?.product?.product_images[0]
													? request?.stock?.product?.product_images[0]
															.product_image
													: null
											}
										/>
										<Flex flexDir={"column"}>
											<Flex>
												From: {request?.from_warehouse?.warehouse_name}
											</Flex>
											<Flex>To: {request?.to_warehouse?.warehouse_name}</Flex>
											<Flex>
												Product: {request?.stock?.product?.product_name}
											</Flex>
											<Flex>Amount: {request.qty}</Flex>
										</Flex>
									</Flex>
									<Flex justifyContent={"end"} gap={"10px"} pt={"15px"}>
										<Button colorScheme="red" size={"sm"}>
											Decline
										</Button>
										<Button colorScheme="green" size={"sm"}>
											Approve
										</Button>
									</Flex>
								</Flex>
							);
						})
					) : (
						<Flex>No Mutation Request</Flex>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
