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
	Select,
	useNumberInput,
	HStack,
	Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddStockModal({
	isOpen,
	onClose,
	getWarehouse,
	getProduct,
}) {
	const toast = useToast();
	const nav = useNavigate();
	const [product, setProduct] = useState([]);
	const [warehouse, setWarehouse] = useState([]);

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			defaultValue: 1,
			min: 1,
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	useEffect(() => {
		getWarehouse();
		getProduct();
	}, []);

	async function getProduct() {
		const res = await api.get("/product", {});
		setProduct(res.data.rows);
	}

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Stock</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl w={"100%"}>
						<FormLabel>Select Warehouse:</FormLabel>
						<Select placeholder="All Warehouses">
							{warehouse.length
								? warehouse.map((val) => <option>{val.warehouse_name}</option>)
								: null}
						</Select>
						<FormLabel>Select Product:</FormLabel>
						<Select placeholder="All Product">
							{product.length
								? product.map((val) => <option>{val.product_name}</option>)
								: null}
						</Select>
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"18px"}>Stock Amount:</FormLabel>
							<HStack w="170px">
								<Button {...dec}>-</Button>
								<Input textAlign={"center"} type="number" {...input} />
								<Button {...inc}>+</Button>
							</HStack>
						</Center>{" "}
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="green" mr={3}>
						Add Stock
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
