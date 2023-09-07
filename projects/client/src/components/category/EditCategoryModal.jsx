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

export default function EditCategoryModal({ isOpen, onClose }) {
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [data, setData] = useState({});
	const toast = useToast();
	const nav = useNavigate();

	useEffect(() => {
		getCategory();
	}, [isOpen]);

	useEffect(() => {
		getCategoryById();
	}, [selectedCategory]);

	async function editCategory() {
		try {
			await api().patch(`/category/${selectedCategory}`, data);

			toast({
				title: "Category updated successfully.",
				status: "success",
				position: "top",
				duration: 3000,
				isClosable: true,
			});
			getCategory();
			resetInputFields();
			onClose();
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

	async function getCategoryById() {
		if (selectedCategory) {
			const res = await api().get(`/category/${selectedCategory}`);
			setData(res.data);
		}
	}

	async function getCategory() {
		const res = await api().get("/category");
		setCategory(res.data);
	}

	const handleWarehouseSelect = (event) => {
		setSelectedCategory(event.target.value);
	};

	const isSaveButtonEnabled = selectedCategory;

	const resetInputFields = () => {
		setData({});
		setSelectedCategory();
	};

	const handleModalClose = () => {
		resetInputFields();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader><Text fontSize={'md'} fontWeight={'bold'} fontFamily={'sans-serif'}>Category Detail</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Select Category:</Text></FormLabel>
						<Select
							placeholder="Choose Category"
							onChange={handleWarehouseSelect}
							size={'sm'}
						>
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>

						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Category Name:</Text></FormLabel>
						<Input
							placeholder="e.g. Hoodie"
							id="category_name"
							size={'sm'}
							defaultValue={data.category_name}
							isDisabled={!isSaveButtonEnabled}
							onChange={(e) =>
								setData({ ...data, category_name: e.target.value })
							}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter display={'flex'} justifyContent={'center'}>
					<Button
						onClick={editCategory}
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
