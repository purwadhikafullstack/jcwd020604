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

export default function AddCategory() {
	const toast = useToast();
	const nav = useNavigate();

	const formik = useFormik({
		initialValues: {
			category_name: "",
		},
		onSubmit: async () => {
			const { category_name } = formik.values;
			const category = new FormData();
			category.append("category_name", category_name);

			await api.post("/category", category).then((res) => {
				toast({
					title: `Add Category Success`,
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

	const [isFormFilled, setIsFormFilled] = useState(false);

	// Function to check if all required form fields are filled
	const checkFormFilled = () => {
		const { category_name } = formik.values;

		setIsFormFilled(category_name.trim() !== "");
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
				<Flex fontWeight={600}>Category Information</Flex>
				<Flex flexDir={"column"} gap={"20px"}>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Category Name:
						</Flex>
						<Input
							placeholder="e.g. TOPS"
							w={"400px"}
							id="category_name"
							onChange={inputHandler}
						/>
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
