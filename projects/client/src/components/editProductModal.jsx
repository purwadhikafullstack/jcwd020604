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
	Flex,
	Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditProductModal({
	isOpen,
	onClose,
	editProduct,
	val,
}) {
	const [selectedImages, setSelectedImages] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const imagesProduct = val.product_images;

	useEffect(() => {
		getCategory();
	}, []);

	const handleImageChange = (event) => {
		const files = event.target.files;
		setSelectedFiles(files);
		const images = [];
		const maxImages = 5; // Set the maximum number of images to 5

		for (let i = 0; i < Math.min(files.length, maxImages); i++) {
			const file = files[i];
			const imageUrl = URL.createObjectURL(file);
			images.push(imageUrl);
		}

		setSelectedImages(images);
	};

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Product Name:</FormLabel>
						<Input
							placeholder="e.g. MMS T-shirt"
							id="product_name"
							value={val.product_name}
						/>
						<FormLabel>Product Description:</FormLabel>
						<Textarea
							placeholder="e.g. A T-shirt with an impressive"
							id="product_detail"
							value={val.product_detail}
						/>
						<FormLabel>Price:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 500000"
							id="price"
							value={val.price}
						/>
						<FormLabel>Weight:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 100 "
							id="weight"
							value={val.weight}
						/>
						<FormLabel> Product Category:</FormLabel>
						<Select
							placeholder="Choose category"
							id="category_id"
							value={val.category_id}
						>
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>
						<FormLabel>Product Images:</FormLabel>
						{imagesProduct.length ? (
							<Flex
								flexWrap={"wrap"}
								flexDir={"row"}
								justifyContent={"center"}
								mt={"10px"}
								border={"1px"}
								borderRadius={"9px"}
								borderColor={"#E6EBF2"}
							>
								{imagesProduct.map((val) => (
									<Image
										src={val.product_image}
										style={{ width: "100px", height: "100px", margin: "8px" }}
									/>
								))}
							</Flex>
						) : null}
						<FormLabel>Change Product Images:</FormLabel>
						<Input
							accept="image/png, image/jpeg"
							type="file"
							id="productImg"
							paddingTop={"4px"}
							multiple
							onChange={handleImageChange}
						/>
						{/* Preview the selected images */}
						{selectedImages.length ? (
							<Flex
								flexWrap={"wrap"}
								flexDir={"row"}
								justifyContent={"center"}
								mt={"10px"}
								border={"1px"}
								borderRadius={"9px"}
								borderColor={"#E6EBF2"}
							>
								{selectedImages.map((imageUrl, index) => (
									<Image
										key={index}
										src={imageUrl}
										alt={`Product Image ${index + 1}`}
										style={{ width: "100px", height: "100px", margin: "8px" }}
									/>
								))}
							</Flex>
						) : null}
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={editProduct}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
