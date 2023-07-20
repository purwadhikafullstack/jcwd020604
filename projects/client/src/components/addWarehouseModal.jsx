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

export default function AddWarehouseModal({ isOpen, onClose, getWarehouse }) {
	const toast = useToast();
	const nav = useNavigate();
	const [city, setCity] = useState([]);
	const [province, setProvince] = useState([]);
	const [warehouse, setWarehouse] = useState({
		warehouse_name: "",
	});
	console.log(province.rajaongkir);
	// console.log(city);

	useEffect(() => {
		getAllProvince();
	}, []);

	useEffect(() => {
		getAllCity();
	}, []);

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

	const onSubmit = async () => {
		await api
			.post("/warehouse", warehouse)
			.then((res) => {
				toast({
					title: `Add Warehouse Success`,
					status: "success",
					duration: 3000,
				});
				onClose();
				getWarehouse();
				nav("/admin/product");
			})
			.catch((err) => {
				toast({
					title: err.response.data.message,
					status: "error",
					duration: 3000,
				});
			});
	};

	async function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...warehouse };
		temp[id] = value;
		setWarehouse(temp);
	}

	const resetWarehouse = () => {
		setWarehouse({
			warehouse_name: "",
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				resetWarehouse();
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
											{val.city}
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
						onClick={onSubmit}
						isDisabled={!warehouse.warehouse_name ? true : false}
						colorScheme="blue"
						mr={3}
					>
						Add Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
