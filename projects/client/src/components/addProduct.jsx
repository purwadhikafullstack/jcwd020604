import {
	Center,
	Flex,
	Select,
	Icon,
	Button,
	Input,
	Textarea,
	Text,
	Image,
	Box,
	useToast,
} from "@chakra-ui/react";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { api } from "../api/api";

export default function AddProduct() {
	const [category, setCategory] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const [img, setImg] = useState();
	const inputFileRef = useRef(null);
	const toast = useToast();
	const nav = useNavigate();

	useEffect(() => {
		getCategory();
	}, []);

	async function getCategory() {
		await api.get("/category").then((res) => {
			setCategory(res.data);
		});
	}

	const formik = useFormik({
		initialValues: {
			product_name: "",
			product_detail: "",
			price: "",
			weight: "",
			category_id: "",
			filename: "",
		},
		onSubmit: async () => {
			const {
				product_name,
				product_detail,
				price,
				weight,
				category_id,
				filename,
			} = formik.values;
			const product = new FormData();
			product.append("product_name", product_name);
			product.append("product_detail", product_detail);
			product.append("price", price);
			product.append("weight", weight);
			product.append("category_id", category_id);
			product.append("productImg", filename);

			await api.post("/product", product).then((res) => {
				toast({
					title: `Add Product Success`,
					status: "success",
					duration: 3000,
				});
				nav("/admin/product");
			});
		},
	});

	async function inputHandler(event) {
		const { value, id } = event.target;
		formik.setFieldValue(id, value);
	}

	const handleFile = async (event) => {
		const file = event.target.files[0];
		formik.setFieldValue("filename", file);
		setSelectedFile(file);

		//buat ngemuncuin gambar----------
		const reader = new FileReader();
		reader.onload = () => {
			setImg(reader.result);
		};
		reader.readAsDataURL(file);
		//--------------------------------
	};

	const [isFormFilled, setIsFormFilled] = useState(false);

	// Function to check if all required form fields are filled
	const checkFormFilled = () => {
		const {
			product_name,
			product_detail,
			price,
			weight,
			category_id,
			filename,
		} = formik.values;

		setIsFormFilled(
			product_name.trim() !== "" &&
				product_detail.trim() !== "" &&
				price.trim() !== "" &&
				weight.trim() !== "" &&
				category_id.trim() !== "" &&
				filename
		);
	};

	// Call the checkFormFilled function whenever the form values change
	useEffect(() => {
		checkFormFilled();
	}, [formik.values]);

	return (
		<Center>
			<Flex
				margin={"60px 20px 60px"}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={"15px"}
				w={"1400px"}
				flexDir={"column"}
				gap={"30px"}
				fontWeight={500}
			>
				<Flex fontWeight={600}>Product Information</Flex>
				<Flex flexDir={"column"} gap={"20px"}>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Name:
						</Flex>
						<Input
							placeholder="e.g. MMS Shirt"
							w={"400px"}
							id="product_name"
							onChange={inputHandler}
						/>
					</Flex>
					<Flex>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Description:
						</Flex>
						<Textarea
							placeholder="e.g. A T-shirt with an impressive"
							w={"400px"}
							id="product_detail"
							onChange={inputHandler}
						/>
					</Flex>

					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Price:
						</Flex>
						<Input
							type="number"
							placeholder="e.g. 500000"
							w={"400px"}
							id="price"
							onChange={inputHandler}
						/>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Weight:
						</Flex>
						<Input
							type="number"
							placeholder="e.g. 100 "
							w={"400px"}
							id="weight"
							onChange={inputHandler}
						/>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Category:
						</Flex>
						<Select
							placeholder="Choose category"
							w={"400px"}
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
					</Flex>
					<Flex alignItems={"center"}>
						<Flex flexDir={"column"} marginRight={"170px"}>
							<Flex paddingBottom={"5px"}>Product Image:</Flex>
							<Flex
								w={"180px"}
								fontSize={"12px"}
								fontWeight={400}
								color={"rgba(53, 53, 53, 0.60)"}
							>
								Use a 1:1 photo ratio (10KB-1MB). Acceptable formats are .jpg,
								and .png. You can upload a maximum of 5 photos.
							</Flex>
						</Flex>
						<Input
							accept="image/png, image/jpeg"
							ref={inputFileRef}
							type="file"
							display={"none"}
							id="filename"
						></Input>
						<Box
							display={"flex"}
							flexDir={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							padding={"16px"}
							gap={"16px"}
							w={"140px"}
							h={"160px"}
							border={"1px dashed rgba(53, 53, 53, 0.3);"}
							borderRadius={"8px"}
							textAlign={"center"}
							fontWeight={"400"}
							fontSize={"12px"}
						>
							<Icon as={HiOutlineUpload} w={"16px"} h={"16px"} />
							<Text as={"span"} onClick={() => inputFileRef.current.click()}>
								Drag and Drop File or{" "}
								<Text
									as={"span"}
									cursor={"pointer"}
									color={"#45BB71"}
									textDecor={"underline"}
								>
									Browse
								</Text>
							</Text>
						</Box>
					</Flex>
				</Flex>
				<Flex justifyContent={"flex-end"}>
					<Flex gap={"8px"}>
						<Button
							border={"1px solid #369A64"}
							borderRadius={"8px"}
							color={"#369A64"}
							colorScheme="white"
							onClick={() => nav("/admin/product/")}
						>
							Cancel
						</Button>

						<Button
							borderRadius={"8px"}
							color={"white"}
							bgColor={"#369A64"}
							_hover={{ bgColor: "#358A54" }}
							onClick={formik.handleSubmit}
							isDisabled={!isFormFilled}
						>
							Add Product
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Center>
	);
}
