import {
	Button,
	Center,
	Flex,
	Grid,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, Suspense, lazy } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";

const ProductCard = lazy(() => import("./productCard"));

export default function ProductCollection() {
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getAll();
	}, [selectedCategory, sort, search, page]);

	async function getAll() {
		await api
			.get("/product", {
				params: {
					category_id: selectedCategory,
					sort: sort,
					search: search,
					page: page,
				},
			})
			.then((res) => {
				setProduct(res.data.rows);
				setTotalPage(Math.ceil(res.data.count / 20));
			});
	}

	async function getCategory() {
		await api.get("/category").then((res) => {
			setCategory(res.data);
		});
	}

	const handleCategoryChange = (categoryId) => {
		if (categoryId !== selectedCategory) {
			setSelectedCategory(categoryId);
		}
	};

	const handleSortChange = (sortOrder) => {
		if (
			sortOrder === "priceAsc" ||
			sortOrder === "priceDesc" ||
			sortOrder === "categoryAsc" ||
			sortOrder === "categoryDesc" ||
			sortOrder === "newest"
		) {
			setSort(sortOrder);
		} else {
			setSort(null);
		}
		setPage(1);
	};

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			setPage(newPage);
		}
	};

	const handleSearchClick = () => {
		getAll();
	};

	// Grid Wrap
	const [pageWidth, setPageWidth] = useState(window.innerWidth);

	useEffect(() => {
		// Update the page width on window resize
		const handleResize = () => {
			setPageWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	let templateColumns;

	if (pageWidth <= 500) {
		templateColumns = "repeat(2, 1fr)";
	} else if (pageWidth <= 600) {
		templateColumns = "repeat(3, 1fr)";
	} else {
		templateColumns = "repeat(4, 1fr)";
	}

	return (
		<Center>
			<Flex
				w={"1600px"}
				minW={"390px"}
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
						onClick={() => handleCategoryChange("")}
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
										onClick={() => handleCategoryChange(val.id)}
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
					flexWrap={"wrap"}
				>
					<Flex fontStyle={"italic"} gap={"5px"} alignItems={"center"}>
						<Flex fontSize={"22px"}>{product.length}</Flex>
						<Flex>cases</Flex>
					</Flex>
					<Flex gap={"15px"} fontSize={"13px"}>
						<Select
							onChange={(e) => handleSortChange(e.target.value)}
							placeholder="Sort product by:"
						>
							<option value="newest">Newest</option>
							<option value="priceAsc">Lowest Price</option>
							<option value="priceDesc">Highest Price</option>
						</Select>
						<InputGroup>
							<Input
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<InputRightElement cursor={"pointer"}>
								<Button border="none" onClick={handleSearchClick}>
									<Icon as={FaSearch} color="gray.400" />
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Flex>

				<Grid padding={"20px"} templateColumns={templateColumns} gap={"10px"}>
					{product.length
						? product.map((val) => {
								return (
									<Link to={`/collection/${val.id}`} borderRadius={"15px"}>
										<Suspense fallback={<Loader />}>
											<ProductCard val={val} borderRadius={"15px"} />
										</Suspense>
									</Link>
								);
						  })
						: null}
				</Grid>
				<Center gap={"15px"}>
					{page === 1 ? null : (
						<Button
							bgColor={"white"}
							border={"1px"}
							w={"117px"}
							onClick={() => handlePageChange(page - 1)}
						>
							PREVIOUS
						</Button>
					)}
					<Flex gap={"10px"}>
						{page === totalPage ? null : (
							<Button
								bgColor={"white"}
								border={"1px"}
								w={"117px"}
								onClick={() => handlePageChange(page + 1)}
							>
								NEXT
							</Button>
						)}
					</Flex>
				</Center>
			</Flex>
		</Center>
	);
}
