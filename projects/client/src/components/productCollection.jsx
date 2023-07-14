import { Center, Flex, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import ProductCard from "./productCard";
import { Link } from "react-router-dom";

export default function ProductCollection() {
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getAll();
	}, [selectedCategory]);

	async function getAll() {
		await api
			.get("/product", { params: { category_id: selectedCategory } })
			.then((res) => {
				setProduct(res.data);
			});
	}

	async function getCategory() {
		await api.get("/category").then((res) => {
			setCategory(res.data);
		});
	}

	const handleClick = (categoryId) => {
		if (categoryId !== selectedCategory) {
			setSelectedCategory(categoryId);
		}
	};

	return (
		<Center>
			<Flex
				w={"1600px"}
				minW={"400px"}
				flexDir={"column"}
				justifyContent={"center"}
			>
				<Center margin={"60px 20px 60px"} fontSize={"32px"} fontWeight={"bold"}>
					{selectedCategory
						? category.find((val) => val.id === selectedCategory).category_name
						: "ALL ITEMS"}
				</Center>
				<Center gap={"10px"} marginBottom={"20px"} flexWrap={"wrap"}>
					<Flex
						padding={"7px 12px"}
						border={"1px"}
						fontSize={"15px"}
						fontWeight={"bold"}
						cursor={"pointer"}
						style={{
							backgroundColor: selectedCategory === "" ? "yellow" : "white",
							border: selectedCategory === "" ? "1px solid white" : "1px solid",
						}}
						onClick={() => handleClick("")}
					>
						ALL ITEMS
					</Flex>

					{category.length
						? category.map((val) => {
								return (
									<Flex
										padding={"7px 12px"}
										border={"1px"}
										fontSize={"15px"}
										fontWeight={"bold"}
										cursor={"pointer"}
										style={{
											backgroundColor:
												selectedCategory === val.id ? "yellow" : "white",
											border:
												selectedCategory === val.id
													? "1px solid white"
													: "1px solid",
										}}
										onClick={() => handleClick(val.id)}
									>
										{val.category_name}
									</Flex>
								);
						  })
						: null}
				</Center>
				<Flex
					justifyContent={"space-between"}
					paddingX={"40px"}
					alignItems={"center"}
					fontSize={"15px"}
					fontWeight={"bold"}
				>
					<Flex fontStyle={"italic"} gap={"5px"} alignItems={"center"}>
						<Flex fontSize={"22px"}>{product.length}</Flex>
						<Flex>cases</Flex>
					</Flex>
					<Flex gap={"15px"} fontSize={"13px"}>
						<Flex>Newest</Flex>
						<Flex>Narrowing </Flex>
					</Flex>
				</Flex>

				<Grid padding={"20px"} templateColumns={"repeat(4, 1fr)"}>
					{product.length
						? product.map((val) => {
								return (
									<Link to={`/collection/${val.id}`}>
										<ProductCard val={val} />
									</Link>
								);
						  })
						: null}
				</Grid>
			</Flex>
		</Center>
	);
}
