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

export default function AddCategoryModal({ isOpen, onClose }) {
	const [category, setCategory] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const toast = useToast();
	const nav = useNavigate();

	useEffect(() => {
		getCategory();
	}, []);

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	const formik = useFormik({
		initialValues: {
			product_name: "",
			product_detail: "",
			price: "",
			weight: "",
			category_id: "",
			productImg: [], // To store the selected image files
		},
		validationSchema: Yup.object().shape({
			product_name: Yup.string().required(),
			product_detail: Yup.string().required(),
			price: Yup.number().min(0).required(),
			weight: Yup.number().min(0).required(),
			category_id: Yup.number().required(),
		}),
		onSubmit: async () => {
			try {
				const formData = new FormData();
				formData.append("product_name", formik.values.product_name);
				formData.append("product_detail", formik.values.product_detail);
				formData.append("price", formik.values.price);
				formData.append("weight", formik.values.weight);
				formData.append("category_id", formik.values.category_id);
				for (const files of selectedFiles) {
					formData.append("productImg", files);
				}
				if (formik.isValid) {
					const res = await api.post("/product", formData);
					toast({
						title: `Add Product Success`,
						description: "The product has been added successfully.",
						status: "success",
						duration: 3000,
					});
					onClose();
					nav("/admin/managedata");
				}
			} catch (error) {
				toast({
					title: error.response.data.message,
					status: "error",
					duration: 3000,
				});
			}
		},
	});

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
		formik.setFieldValue("productImg", [...files].slice(0, maxImages)); // Store up to the first 5 selected image files in formik state
	};

	async function inputHandler(event) {
		const { value, id } = event.target;
		formik.setFieldValue(id, value);
	}

	const isAddButtonEnabled =
		formik.dirty && formik.isValid && selectedImages.length > 0;

	const handleModalClose = () => {
		formik.resetForm();
		setSelectedImages([]);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Product</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Product Name:</FormLabel>
						<Input
							placeholder="e.g. MMS T-shirt"
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
						<FormLabel>Product Images:</FormLabel>
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
					<Button
						onClick={formik.handleSubmit}
						colorScheme="green"
						mr={3}
						isDisabled={!isAddButtonEnabled}
					>
						Add Product
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
