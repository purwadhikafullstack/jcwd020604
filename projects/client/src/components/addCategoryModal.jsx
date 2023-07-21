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
import { useState } from "react";
import { api } from "../api/api";

export default function AddCategoryModal({ isOpen, onClose, getCategory }) {
	const toast = useToast();
	const nav = useNavigate();
	const [category, setCategory] = useState({
		category_name: "",
	});

	const onSubmit = async () => {
		await api
			.post("/category", category)
			.then(() => {
				toast({
					title: `Add Category Success`,
					status: "success",
					duration: 3000,
				});
				onClose();
				getCategory();
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
		const temp = { ...category };
		temp[id] = value;
		setCategory(temp);
	}

	const resetCategory = () => {
		setCategory({
			category_name: "",
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				resetCategory();
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Category</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Category Name:</FormLabel>
						<Input
							placeholder="e.g. TOPS"
							id="category_name"
							onChange={inputHandler}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						onClick={onSubmit}
						isDisabled={!category.category_name ? true : false}
						colorScheme="blue"
						mr={3}
					>
						Add Category
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
