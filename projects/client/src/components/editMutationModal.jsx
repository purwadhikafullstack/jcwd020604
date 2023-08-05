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
	Textarea,
	Select,
	Flex,
	Image,
	Toast,
	Center,
	HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export default function EditMutationModal({
	isOpen,
	onClose,
	val,
	getMutation,
}) {
	const [warehouse, setWarehouse] = useState([]);
	const [mutation, setMutation] = useState(val);
	const toast = useToast();
	const nav = useNavigate();
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		getWarehouse();
	}, []);

	// const editProduct = async () => {
	// 	const formData = new FormData();
	// 	formData.append("product_name", product.product_name);
	// 	formData.append("product_detail", product.product_detail);
	// 	formData.append("price", product.price);
	// 	formData.append("weight", product.weight);
	// 	formData.append("category_id", product.category_id);
	// 	if (selectedFiles) {
	// 		for (const files of selectedFiles) {
	// 			formData.append("productImg", files);
	// 		}
	// 	}
	// 	try {
	// 		await api.patch(`/product/${val.id}`, formData);
	// 		toast({
	// 			title: "Product updated successfully.",
	// 			status: "success",
	// 			position: "top",
	// 			duration: 3000,
	// 		});
	// 		getProduct();
	// 		nav("/admin/product");
	// 		onClose();
	// 	} catch (error) {
	// 		toast({
	// 			title: error.response.data.message,
	// 			status: "error",
	// 			position: "top",
	// 			duration: 3000,
	// 		});
	// 	}
	// };

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}

	function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...mutation };
		temp[id] = value;
		setMutation(temp);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Mutation</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Product Name:</FormLabel>
						<Input placeholder="e.g. MMS T-shirt" id="product_id" />

						<FormLabel> From Warehouse:</FormLabel>
						<Select
							placeholder="Choose warehouse"
							id="from_warehouse_id"
							onChange={inputHandler}
						>
							{warehouse.length
								? warehouse.map((val) => (
										<option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel> To Warehouse:</FormLabel>
						<Select
							placeholder="Choose warehouse"
							id="to_warehouse_id"
							onChange={inputHandler}
						>
							{warehouse.length
								? warehouse.map((val) => (
										<option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null}
						</Select>
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"18px"}>Mutation Amount:</FormLabel>
							<HStack w="100px">
								<Input
									textAlign={"center"}
									placeholder="0"
									type="number"
									id="qty"
									onChange={inputHandler}
								/>
							</HStack>
						</Center>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					{user.role === "ADMIN" || "ADMIN" ? (
						<Button colorScheme="blue" mr={3}>
							Save
						</Button>
					) : null}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
