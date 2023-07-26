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
	Toast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditProductModal({ isOpen, onClose, val }) {
	const [selectedImages, setSelectedImages] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [product, setProduct] = useState(val);
	const imagesProduct = val.product_images;
	const toast = useToast();
	const nav = useNavigate();

	useEffect(() => {
		getCategory();
	}, []);

	const editProduct = async () => {
		const formData = new FormData();
		formData.append("product_name", product.product_name);
		formData.append("product_detail", product.product_detail);
		formData.append("price", product.price);
		formData.append("weight", product.weight);
		formData.append("category_id", product.category_id);
		if (selectedFiles) {
			for (const files of selectedFiles) {
				formData.append("productImg", files);
			}
		}
		try {
			await api.patch(`/product/${val.id}`, formData);
			toast({
				title: "Product updated successfully.",
				status: "success",
				duration: 3000,
			});
			nav("/admin/product");
			onClose();
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				duration: 3000,
			});
		}
	};

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

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

		const productImages = [];
		for (const file of files) {
			productImages.push(file);
		}
		setProduct((prevProduct) => ({
			...prevProduct,
			product_images: productImages,
		}));
	};

	function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...product };
		temp[id] = value;
		setProduct(temp);
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
							defaultValue={val.product_name}
							onChange={inputHandler}
						/>
						<FormLabel>Product Description:</FormLabel>
						<Textarea
							placeholder="e.g. A T-shirt with an impressive"
							id="product_detail"
							defaultValue={val.product_detail}
							onChange={inputHandler}
						/>
						<FormLabel>Price:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 500000"
							id="price"
							defaultValue={val.price}
							onChange={inputHandler}
						/>
						<FormLabel>Weight:</FormLabel>
						<Input
							type="number"
							placeholder="e.g. 100 "
							id="weight"
							defaultValue={val.weight}
							onChange={inputHandler}
						/>
						<FormLabel> Product Category:</FormLabel>
						<Select
							placeholder="Choose category"
							id="category_id"
							defaultValue={val.category_id}
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
							id="product_images"
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
