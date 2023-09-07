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
	HStack,
	Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api/api";

export default function EditStockModal({ isOpen, onClose, val, getStock }) {
	const [stock, setStock] = useState(val);
	const toast = useToast();
	const nav = useNavigate();

	const editStock = async () => {
		try {
			await api().patch(`/stock/${val.id}`, { qty: stock.qty });
			toast({
				title: "Stock updated successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			onClose();
			getStock();
			nav("/admin/managedata");
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	};

	function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...stock };
		temp[id] = value;
		setStock(temp);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize={'md'} fontWeight={'bold'}>Edit Stock</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel fontSize={'sm'}>Warehouse</FormLabel>
						<Input size={'sm'} value={val?.warehouse?.warehouse_name} />
						<FormLabel fontSize={'sm'}>Product</FormLabel>
						<Input size={'sm'} value={val.product.product_name} />
						<Center flexDir={"column"} pt={"15px"}>
							<FormLabel pl={"15px"} fontSize={'sm'}>Stocks</FormLabel>
							<HStack w="100px">
								<Input
									textAlign={"center"}
									type="number"
									id="qty"
									size={'xs'}
									defaultValue={val.qty}
									onChange={inputHandler}
								/>
							</HStack>
						</Center>
					</FormControl>
				</ModalBody>
				<ModalFooter display={'flex'} justifyContent={'center'}>
					<Button colorScheme="blue" size={'xs'} w={'25%'} rounded={'sm'} onClick={editStock}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
