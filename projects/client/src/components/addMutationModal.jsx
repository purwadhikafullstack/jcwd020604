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
	Select,
	useNumberInput,
	HStack,
	Center,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export default function AddMutationModal({ isOpen, onClose, getMutation }) {
	const user = useSelector((state) => state.auth);
	const toast = useToast();
	const nav = useNavigate();
	const [product, setProduct] = useState([]);
	const [warehouse, setWarehouse] = useState([]);

	useEffect(() => {
		getWarehouse();
		getAllProduct();
	}, []);

	const formik = useFormik({
		initialValues: {
			qty: "",
			from_warehouse_id: "",
			to_warehouse_id: "",
			product_id: "",
		},
		validationSchema: Yup.object().shape({
			qty: Yup.number().min(0).required(),
			from_warehouse_id: Yup.number().required(),
			to_warehouse_id: Yup.number().required(),
			product_id: Yup.number().required(),
		}),
		onSubmit: async () => {
			try {
				const { qty, from_warehouse_id, to_warehouse_id, stock_id } =
					formik.values;
				if (formik.isValid) {
					const res = await api.post("/stockmutation", formik.values);
					toast({
						title: `Request Mutation Success`,
						description: "Stock mutation request submitted for confirmation.",
						status: "success",
						position: "top",
						duration: 3000,
					});
					getMutation();
					onClose();
					nav("/admin/mutation");
				}
			} catch (error) {
				toast({
					title: error.response.data.message,
					status: "error",
					position: "top",
					duration: 3000,
				});
			}
		},
	});

	async function getAllProduct() {
		const res = await api.get("/product/getAllProduct/getAll");
		setProduct(res.data);
	}

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}

	async function inputHandler(event) {
		const { value, id } = event.target;
		formik.setFieldValue(id, value);
	}

	const isAddButtonEnabled = formik.dirty && formik.isValid;

	const handleModalClose = () => {
		formik.resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Mutation</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl w={"100%"}>
						<FormLabel>Select Product:</FormLabel>
						<Select
							placeholder="All Product"
							id="product_id"
							onChange={inputHandler}
						>
							{product.length
								? product.map((val) => (
										<option key={val.id} value={val.id}>
											{val.product_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel>From Warehouse:</FormLabel>
						<Select
							placeholder="Select Source Warehouse"
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
						<FormLabel>To Warehouse:</FormLabel>
						<Select
							placeholder="Select Destination Warehouse"
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
					<Button
						colorScheme="green"
						mr={3}
						onClick={formik.handleSubmit}
						isDisabled={!isAddButtonEnabled}
					>
						Add Stock
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
