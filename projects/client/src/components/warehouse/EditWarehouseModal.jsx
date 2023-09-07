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
	Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export default function EditWarehouseModal({ isOpen, onClose }) {
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const [selectedProvince, setSelectedProvince] = useState("");
	const [data, setData] = useState({});
	const [city, setCity] = useState([]);
	const [province, setProvince] = useState([]);
	const toast = useToast();
	const nav = useNavigate();

	useEffect(() => {
		getWarehouse();
		getAllProvince();
		getAllCity();
	}, [isOpen]);

	useEffect(() => {
		getWarehouseById();
	}, [selectedWarehouse]);

	async function editWarehouse() {
		try {
			await api().patch(`/warehouse/${selectedWarehouse}`, data);
			toast({
				title: "Warehouse updated successfully.",
				status: "success",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			getWarehouse();
			handleModalClose();
			nav("/admin/managedata");
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	}

	async function getWarehouseById() {
		if (selectedWarehouse) {
			const res = await api().get(`/warehouse/${selectedWarehouse}`);
			setData(res.data);
		}
	}

	async function getWarehouse() {
		const res = await api().get("/warehouse");
		setWarehouse(res.data);
	}

	async function getAllProvince() {
		const res = await api().get("/warehouse/getAll/province");
		setProvince(res.data);
	}

	async function getAllCity() {
		const res = await api().get("/warehouse/getAll/city");
		setCity(res.data);
	}

	const handleWarehouseSelect = (event) => {
		setSelectedWarehouse(event.target.value);
	};

	const resetInputFields = () => {
		setData({});
		setSelectedWarehouse();
		setSelectedProvince("");
	};

	const handleModalClose = () => {
		resetInputFields();
		onClose();
	};
	const isSaveButtonEnabled = selectedWarehouse;

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader><Text fontSize={'md'} fontWeight={'bold'} fontFamily={'sans-serif'}>Warehouse Detail</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Select Warehouse:</Text></FormLabel>
						<Select
							placeholder="Choose Warehouse"
							onChange={handleWarehouseSelect}
							size={'sm'}
						>
							{warehouse.length
								? warehouse.map((val) => (
										<option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Warehouse Name:</Text></FormLabel>
						<Input
							placeholder="e.g. MMS Jogja"
							id="warehouse_name"
							size={'sm'}
							defaultValue={data.warehouse_name}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) =>
								setData({ ...data, warehouse_name: e.target.value })
							}
						/>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Address:</Text></FormLabel>
						<Input
							placeholder="e.g. Jalan Malioboro"
							id="address"
							size={'sm'}
							defaultValue={data.address}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) => setData({ ...data, address: e.target.value })}
						/>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>District:</Text></FormLabel>
						<Input
							placeholder="e.g. Gedongtengen "
							id="district"
							size={'sm'}
							defaultValue={data.district}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) => setData({ ...data, district: e.target.value })}
						/>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Province:</Text></FormLabel>
						<Select
							id="province"
							value={data.province}
							placeholder="Choose Province"
							size={'sm'}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) => {
								setData({ ...data, province: e.target.value });
								setSelectedProvince(e.target.value);
							}}
						>
							{province.length
								? province.map((val) => (
										<option key={val.id} value={val.id}>
											{val.province}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>City:</Text></FormLabel>
						<Select
							id="city"
							placeholder="Choose City"
							size={'sm'}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) => {
								const [cityName, cityId] = e.target.value.split("|");
								setData({ ...data, city: cityName, city_id: cityId });
							}}
						>
							{city &&
								city
									.filter((val) => val.province === data.province)
									.map((val) =>
										data.city != val.city_name ? (
											<option
												key={val.city_id}
												value={`${val.city_name}|${val.city_id}`}
											>
												{val.city_name}
											</option>
										) : (
											<option
												selected
												key={val.city_id}
												value={`${val.city_name}|${val.city_id}`}
											>
												{val.city_name}
											</option>
										)
									)}
						</Select>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Phone Number:</Text></FormLabel>
						<Input
							placeholder="08.. "
							type="number"
							size={'sm'}
							id="phone_number"
							defaultValue={data.phone_number}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) =>
								setData({ ...data, phone_number: e.target.value })
							}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter display={'flex'} justifyContent={'center'}>
					<Button
						onClick={editWarehouse}
						colorScheme="blue"
						w={'25%'}
						rounded={'sm'}
						size={'xs'}
						isDisabled={!isSaveButtonEnabled}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
