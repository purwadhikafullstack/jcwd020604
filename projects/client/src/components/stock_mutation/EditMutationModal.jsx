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
	Center,
	HStack,
	Flex,
	Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";

export default function EditMutationModal({
	isOpen,
	onClose,
	val,
	getMutation,
	getRequest,
}) {
	const [warehouse, setWarehouse] = useState([]);
	const [mutation, setMutation] = useState(val);
	const toast = useToast();
	const nav = useNavigate();
	const user = useSelector((state) => state.auth);

	useEffect(() => {
		getWarehouse();
	}, [isOpen]);

	const editMutation = async () => {
		try {
			await api().patch(`/stockmutation/${val.id}`, { qty: mutation.qty });
			toast({
				title: "Mutation updated successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getMutation();
			getRequest();
			nav("/admin/mutation");
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	};

	async function getWarehouse() {
		const res = await api().get("/warehouse");
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
				<ModalHeader fontSize={'md'} fontWeight={'bold'}>Edit Mutation</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Product Name:</Text></FormLabel>
						<Input
							placeholder="e.g. MMS T-shirt"
							id="stock_id"
							size={'sm'}
							onChange={inputHandler}
							value={val.stock.product.product_name}
							isDisabled
						/>

						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>From Warehouse:</Text></FormLabel>
						<Select
							placeholder="Choose warehouse"
							id="from_warehouse_id"
							size={'sm'}
							value={val.from_warehouse_id}
							onChange={inputHandler}
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
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>To Warehouse:</Text></FormLabel>
						<Select
							placeholder="Choose warehouse"
							id="to_warehouse_id"
							size={'sm'}
							value={val.to_warehouse_id}
							onChange={inputHandler}
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
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"18px"}><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Mutation Amount:</Text></FormLabel>
							<HStack w="100px">
								<Input
									textAlign={"center"}
									placeholder="0"
									type="number"
									size={'sm'}
									id="qty"
									defaultValue={val.qty}
									onChange={inputHandler}
								/>
							</HStack>
						</Center>
					</FormControl>
				</ModalBody>
				<ModalFooter justifyContent={"space-between"}>
					<Flex fontSize={'sm'} fontWeight={'bold'} textColor={'blackAlpha.500'}>Max Amount: {val.stock.qty}</Flex>
					{user.role === "ADMIN" || "ADMIN" ? (
						<Button colorScheme="blue" mr={3} rounded={'sm'}
						size={'xs'} onClick={editMutation}>
							Save
						</Button>
					) : null}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
