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
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams } from "react-router-dom";

export default function EditWarehouseModal({ isOpen, onClose }) {
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const [data, setData] = useState({});
	const [city, setCity] = useState([]);
	const [province, setProvince] = useState([]);
	const { id } = useParams();
	const toast = useToast();

	useEffect(() => {
		getWarehouse();
		getAllProvince();
		getAllCity();
	}, []);

	useEffect(() => {
		getWarehouseById();
	}, [selectedWarehouse]);

	async function editWarehouse() {
		try {
			await api.patch(`/warehouse/${selectedWarehouse}`, data);

			toast({
				title: "Warehouse updated successfully.",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				duration: 3000,
			});
		}
	}

	async function getWarehouseById() {
		if (selectedWarehouse) {
			const res = await api.get(`/warehouse/${selectedWarehouse}`);
			setData(res.data);
		}
	}

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}

	async function getAllProvince() {
		const res = await api.get("/warehouse/getAll/province");
		setProvince(res.data);
	}

	async function getAllCity() {
		const res = await api.get("/warehouse/getAll/city");
		setCity(res.data);
	}

	async function inputHandler(event) {
		const { value, id } = event.target;
		const temp = { ...data };
		temp[id] = value;
		setData(temp);
		setSelectedWarehouse(value);
	}

	const handleModalClose = () => {
		// formik.resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Warehouse</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Select Warehouse:</FormLabel>
						<Select onChange={inputHandler} placeholder="Choose Warehouse">
							{warehouse.length
								? warehouse.map((val) => (
										<option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel>Warehouse Name:</FormLabel>
						<Input
							placeholder="e.g. MMS Jogja"
							id="warehouse_name"
							onChange={inputHandler}
							defaultValue={data.warehouse_name}
						/>
						<FormLabel>Address:</FormLabel>
						<Input
							placeholder="e.g. Jalan Malioboro"
							id="address"
							onChange={inputHandler}
							defaultValue={data.address}
						/>
						<FormLabel>District:</FormLabel>
						<Input
							placeholder="e.g. Gedongtengen "
							id="district"
							onChange={inputHandler}
							defaultValue={data.district}
						/>
						<FormLabel>City:</FormLabel>
						<Select
							id="city"
							onChange={inputHandler}
							value={data.city}
							placeholder="Choose City"
						>
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
							id="province"
							onChange={inputHandler}
							value={data.province}
							placeholder="Choose Province"
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
					<Button onClick={editWarehouse} colorScheme="blue" mr={3}>
						Edit Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
