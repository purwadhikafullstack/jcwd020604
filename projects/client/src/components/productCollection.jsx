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
	ButtonGroup,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, Suspense, lazy, useRef } from "react";
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
	const inputFileRef = useRef(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getAll();
	}, [selectedCategory, sort, search, page]);

	async function getAll() {
		setLoading(true);
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
				setTotalPage(Math.ceil(res.data.count / 12));
				setLoading(false);
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

	if (pageWidth <= 600) {
		templateColumns = "repeat(2, 1fr)";
	} else if (pageWidth <= 800) {
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
						borderRadius={"5px"}
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
										borderRadius={"5px"}
										onClick={() => {
											setPage(1);
											handleCategoryChange(val.id);
										}}
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
							<Input placeholder="Search..." ref={inputFileRef} />
							<InputRightElement cursor={"pointer"}>
								<Button
									border="none"
									onClick={() => {
										const searchValue = inputFileRef.current.value;
										setSearch(searchValue);
										setPage(1);
									}}
								>
									<Icon as={FaSearch} color="gray.400" />
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Flex>
				{product.length > 0 ? (
					<Grid padding={"20px"} templateColumns={templateColumns} gap={"25px"}>
						{product.map((val) => {
							return (
								<Link to={`/collection/${val.uuid}`}>
									<Suspense fallback={<Loader />}>
										{loading ? (
											<Loader />
										) : (
											<ProductCard val={val} borderRadius={"15px"} />
										)}
									</Suspense>
								</Link>
							);
						})}
					</Grid>
				) : (
					<Center fontSize={"20px"} fontWeight={"bold"} marginTop={"40px"}>
						Product not available
					</Center>
				)}

				{product.length > 0 && (
					<ButtonGroup
						justifyContent={"center"}
						gap={"25px"}
						marginBottom={"25px"}
					>
						{page === 1 ? (
							<Button
								isDisabled
								bgColor={"white"}
								w={"117px"}
								boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
							>
								PREVIOUS
							</Button>
						) : (
							<Button
								bgColor={"white"}
								w={"117px"}
								boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
								onClick={() => {
									handlePageChange(page - 1);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								PREVIOUS
							</Button>
						)}
						{page === totalPage ? (
							<Button
								isDisabled
								bgColor={"white"}
								w={"117px"}
								boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
							>
								NEXT
							</Button>
						) : (
							<Button
								bgColor={"white"}
								w={"117px"}
								boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
								onClick={() => {
									handlePageChange(page + 1);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								NEXT
							</Button>
						)}
					</ButtonGroup>
				)}
			</Flex>
		</Center>
	);
}
