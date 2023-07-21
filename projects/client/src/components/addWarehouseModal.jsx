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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddWarehouseModal({ isOpen, onClose }) {
	const toast = useToast();
	const nav = useNavigate();
	const [city, setCity] = useState([]);
	const [province, setProvince] = useState([]);

	useEffect(() => {
		getAllProvince();
	}, []);

	useEffect(() => {
		getAllCity();
	}, []);

	const formik = useFormik({
		initialValues: {
			warehouse_name: "",
			address: "",
			province: "",
			city: "",
			district: "",
		},
		// validationSchema: Yup.object().shape({
		// 	warehouse_name: Yup.string().required(),
		// 	address: Yup.string().required(),
		// 	province: Yup.string().required(),
		// 	city: Yup.string().required(),
		// 	district: Yup.string().required(),
		// }),
		onSubmit: async () => {
			const { warehouse_name, address, province, city, district } =
				formik.values;
			const warehouse = { warehouse_name, address, province, city, district };
			await api
				.post("/warehouse", warehouse)
				.then(() => {
					toast({
						title: `Add Warehouse Success`,
						status: "success",
						duration: 3000,
					});
					onClose();
					nav("/admin/product");
				})
				.catch((err) => {
					toast({
						title: err.response.data.message,
						status: "error",
						duration: 3000,
					});
				});
		},
	});

	async function getAllProvince() {
		await api.get("/warehouse/getAll/province").then((res) => {
			setProvince(res.data);
		});
	}
	async function getAllCity() {
		await api.get("/warehouse/getAll/city").then((res) => {
			setCity(res.data);
		});
	}

	async function inputHandler(event) {
		const { value, id } = event.target;
		console.log({ id, value });
		formik.setFieldValue(id, value);
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Warehouse</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Warehouse Name:</FormLabel>
						<Input
							placeholder="e.g. MMS Jogja"
							id="category_name"
							onChange={inputHandler}
						/>
						<FormLabel>Address:</FormLabel>
						<Input
							placeholder="e.g. Jalan Malioboro"
							id="address"
							onChange={inputHandler}
						/>
						<FormLabel>District:</FormLabel>
						<Input
							placeholder="e.g. Gedongtengen "
							id="district"
							onChange={inputHandler}
						/>
						<FormLabel>City:</FormLabel>
						<Select placeholder="Choose City" id="city" onChange={inputHandler}>
							{city.length
								? city.map((val) => (
										<option key={val.id} value={val.id}>
											{val.city_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel>Province:</FormLabel>
						<Select
							placeholder="Choose Province"
							id="province"
							onChange={inputHandler}
						>
							{province.length
								? province.map((val) => (
										<option key={val.id} value={val.id}>
											{val.province}
										</option>
								  ))
								: null}
						</Select>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={formik.handleSubmit} colorScheme="blue" mr={3}>
						Add Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
