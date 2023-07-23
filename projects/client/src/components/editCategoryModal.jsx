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

export default function EditCategoryModal({ isOpen, onClose }) {
	const [category, setCategory] = useState([]);
	const toast = useToast();

	useEffect(() => {
		getCategory();
	}, []);

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	const handleModalClose = () => {
		// formik.resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Category</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Select Category:</FormLabel>
						<Select placeholder="Choose Category">
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>

						<FormLabel>Category Name:</FormLabel>
						<Input placeholder="e.g. Hoodie" id="category_name" />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3}>
						Edit Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
