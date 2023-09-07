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
	HStack,
	Center,
	useToast,
	Flex,
	Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

export default function AddMutationModal({
	isOpen,
	onClose,
	getMutation,
	getRequest,
}) {
	const user = useSelector((state) => state.auth);
	const toast = useToast();
	const nav = useNavigate();
	const [stock, setStock] = useState([]);
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState("");
	const [selectedStock, setSelectedStock] = useState(null);

	useEffect(() => {
		getWarehouse();
	}, [isOpen]);

	useEffect(() => {
		getAllStock();
	}, [selectedWarehouse]);

	const formik = useFormik({
		initialValues: {
			qty: "",
			from_warehouse_id: "",
			to_warehouse_id: user.role === "ADMIN" ? "" : user.warehouse_id,
			stock_id: "",
		},
		validationSchema: Yup.object().shape({
			qty: Yup.number().min(0).required(),
			from_warehouse_id: Yup.number().required(),
			to_warehouse_id: Yup.number().required(),
			stock_id: Yup.number().required(),
		}),
		onSubmit: async () => {
			try {
				const { qty, from_warehouse_id, to_warehouse_id, stock_id } =
					formik.values;
				if (formik.isValid) {
					const res = await api().post("/stockmutation", formik.values);
					toast({
						title: `Request Mutation Success`,
						description: "Stock mutation request submitted for confirmation.",
						status: "success",
						position: "top",
						duration: 3000,
					});

					getMutation();
					getRequest();
					handleModalClose();
					setSelectedWarehouse("");
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

	async function getAllStock() {
		const res = await api().get("/stock/getAll/stock", {
			params: {
				warehouse_id: selectedWarehouse,
			},
		});
		setStock(res.data);
	}

	async function getWarehouse() {
		const res = await api().get("/warehouse");
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
		setSelectedStock(null);
		setSelectedWarehouse("");
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader><Text fontSize={'md'} fontWeight={'bold'} fontFamily={'sans-serif'}>Add Mutation</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl w={"100%"}>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>From Warehouse:</Text></FormLabel>
						<Select
							placeholder="Select Source Warehouse"
							id="from_warehouse_id"
							size={'sm'}
							value={selectedWarehouse}
							onChange={(event) => {
								setSelectedWarehouse(event.target.value);
								inputHandler(event);
							}}
						>
							{warehouse.length
								? warehouse.map((val) => (
										<option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>To Warehouse:</Text></FormLabel>
						{user.role === "ADMIN" ? (
							<Select
								placeholder="All Warehouses"
								id="to_warehouse_id"
								size={'sm'}
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
						) : (
							<Select
								placeholder="Select Destination Warehouse"
								id="to_warehouse_id"
								size={'sm'}
								defaultValue={user.warehouse_id}
								isDisabled
							>
								{warehouse.length
									? warehouse.map((val) => (
											<option key={val.id} value={val.id}>
												{val.warehouse_name}
											</option>
									  ))
									: null}
							</Select>
						)}
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Select Product:</Text></FormLabel>
						<Select
							placeholder="All Product"
							id="stock_id"
							size={'sm'}
							onChange={(event) => {
								inputHandler(event);
								const selectedStock = stock.find(
									(val) => val.id === parseInt(event.target.value)
								);
								setSelectedStock(selectedStock);
							}}
						>
							{stock.length
								? stock.map((val) => (
										<option key={val.id} value={val.id}>
											{val.product?.product_name}
										</option>
								  ))
								: null}
						</Select>
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"18px"}><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Mutation Amount:</Text></FormLabel>
							<HStack w="100px">
								<Input
									textAlign={"center"}
									placeholder="0"
									type="number"
									size={'xs'}
									id="qty"
									onChange={inputHandler}
								/>
							</HStack>
						</Center>
					</FormControl>
				</ModalBody>
				<ModalFooter justifyContent={selectedStock ? "space-between" : null}>
					{selectedStock ? 
					<Flex>
						<Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Max Amount: {selectedStock?.qty}</Text> 
					</Flex> : null}
					<Button
						position={'sticky'}
						colorScheme="green"
						w={'25%'}
						rounded={'sm'}
						size={'xs'}
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
