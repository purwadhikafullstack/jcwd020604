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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function EditStockModal({ isOpen, onClose, val }) {
	const [stock, setStock] = useState(val);
	const toast = useToast();
	const nav = useNavigate();

	const editStock = async () => {
		try {
			await api.patch(`/stock/${val.id}`, { qty: stock.qty });
			toast({
				title: "Stock updated successfully.",
				status: "success",
				duration: 3000,
			});
			nav("/admin/managedata");
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
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
				<ModalHeader>Edit Stock</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Warehouse</FormLabel>
						<Input value={val.warehouse.warehouse_name} />
						<FormLabel>Product</FormLabel>
						<Input value={val.product.product_name} />
						<FormLabel>Stocks</FormLabel>
						<Input
							type="number"
							id="qty"
							defaultValue={val.qty}
							onChange={inputHandler}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={editStock}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
