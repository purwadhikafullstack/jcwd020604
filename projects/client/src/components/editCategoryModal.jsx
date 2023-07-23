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
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [data, setData] = useState({});
	const toast = useToast();

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getCategoryById();
	}, [selectedCategory]);

	async function editCategory() {
		try {
			await api.patch(`/category/${selectedCategory}`, data);

			toast({
				title: "Category updated successfully.",
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

	async function getCategoryById() {
		if (selectedCategory) {
			const res = await api.get(`/category/${selectedCategory}`);
			setData(res.data);
		}
	}

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	const handleWarehouseSelect = (event) => {
		// Update the selectedWarehouse state when a warehouse is selected from the dropdown
		setSelectedCategory(event.target.value);
	};

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
						<Select
							placeholder="Choose Category"
							onChange={handleWarehouseSelect}
						>
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>

						<FormLabel>Category Name:</FormLabel>
						<Input
							placeholder="e.g. Hoodie"
							id="category_name"
							defaultValue={data.category_name}
							onChange={(e) =>
								setData({ ...data, category_name: e.target.value })
							}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={editCategory} colorScheme="blue" mr={3}>
						Edit Warehouse
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
