import {
	Center,
	Flex,
	Button,
	Input,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export default function AddCategory() {
	const toast = useToast();
	const nav = useNavigate();
	const [category, setCategory] = useState({
		category_name: "",
	});

	const onSubmit = async () => {
		await api
			.post("/category", category)
			.then((res) => {
				toast({
					title: `Add Category Success`,
					status: "success",
					duration: 3000,
				});
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
							onClick={onSubmit}
							isDisabled={!category.category_name ? true : false}
						>
							Add Product
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Center>
	);
}
