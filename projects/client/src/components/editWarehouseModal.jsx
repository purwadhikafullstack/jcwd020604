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

export default function EditWarehouseModal({ isOpen, onClose }) {
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const [city, setCity] = useState([]);
	const [province, setProvince] = useState([]);
	console.log(selectedWarehouse);

	useEffect(() => {
		getWarehouse();
		getAllProvince();
		getAllCity();
	}, []);
	useEffect(() => {
		getWarehouseById();
	}, [selectedWarehouse]);

	async function getWarehouseById() {
		if (selectedWarehouse) {
			const res = await api.get(`/warehouse/${selectedWarehouse}`);
			setSelectedWarehouse(res.data);
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
		const { value } = event.target;
		setSelectedWarehouse(value); // Set the selected warehouse ID
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
					<Button
						// onClick={formik.handleSubmit}
						colorScheme="blue"
						mr={3}
					>
						Edit Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
