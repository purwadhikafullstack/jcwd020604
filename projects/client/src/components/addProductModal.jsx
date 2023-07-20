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
	Textarea,
	Select,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function AddCategoryModal({ isOpen, onClose }) {
	const [category, setCategory] = useState([]);
	const [productImages, setProductImages] = useState([]);
	const toast = useToast();

	useEffect(() => {
		getCategory();
	}, []);

	async function getCategory() {
		await api.get("/category").then((res) => {
			setCategory(res.data);
		});
	}

	async function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...category };
		temp[id] = value;
		setCategory(temp);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Product Name:</FormLabel>
						<Input
							placeholder="e.g. MMS Shirt"
							id="product_name"
							onChange={inputHandler}
						/>
						<FormLabel> Product Description:</FormLabel>
						<Textarea
							placeholder="e.g. A T-shirt with an impressive"
							id="product_detail"
							onChange={inputHandler}
						/>
						<FormLabel>Price:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 500000"
							id="price"
							onChange={inputHandler}
						/>
						<FormLabel>Weight:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 100 "
							id="weight"
							onChange={inputHandler}
						/>
						<FormLabel> Product Category:</FormLabel>
						<Select
							placeholder="Choose category"
							id="category_id"
							onChange={inputHandler}
						>
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel>Product Image:</FormLabel>
						<Input
							accept="image/png, image/jpeg"
							type="file"
							id="filename"
							paddingTop={"4px"}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						isDisabled={!category.category_name ? true : false}
						colorScheme="blue"
						mr={3}
					>
						Add Product
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
