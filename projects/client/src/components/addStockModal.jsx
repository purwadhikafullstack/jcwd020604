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

export default function AddStockModal({ isOpen, onClose }) {
	const toast = useToast();
	const nav = useNavigate();
	const [product, setProduct] = useState([]);
	const [warehouse, setWarehouse] = useState([]);

	useEffect(() => {
		getWarehouse();
		getProduct();
	}, []);

	const formik = useFormik({
		initialValues: {
			qty: "",
			warehouse_id: "",
			product_id: "",
		},
		validationSchema: Yup.object().shape({
			qty: Yup.number().min(0).required(),
			warehouse_id: Yup.number().required(),
			product_id: Yup.number().required(),
		}),
		onSubmit: async () => {
			try {
				const { qty, warehouse_id, product_id } = formik.values;
				if (formik.isValid) {
					const res = await api.post("/stock", formik.values);
					toast({
						title: `Add Stock Success`,
						description: "The stock has been added successfully.",
						status: "success",
						duration: 3000,
					});
					onClose();
					nav("/admin/managedata");
				}
			} catch (error) {
				toast({
					title: error.response.data.message,
					status: "error",
					duration: 3000,
				});
			}
		},
	});

	async function getProduct() {
		const res = await api.get("/product", {});
		setProduct(res.data.rows);
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
				<ModalHeader>Add Stock</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl w={"100%"}>
						<FormLabel>Select Warehouse:</FormLabel>
						<Select
							placeholder="All Warehouses"
							id="warehouse_id"
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
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"18px"}>Stock Amount:</FormLabel>
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
