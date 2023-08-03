import {
	Center,
	Flex,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
	ButtonGroup,
	useDisclosure,
} from "@chakra-ui/react";
import {
	AddIcon,
	ArrowBackIcon,
	RepeatIcon,
	UpDownIcon,
} from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ProductList from "./productList";
import AddProductModal from "./addProductModal";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function AdminProduct() {
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const inputFileRef = useRef(null);
	const user = useSelector((state) => state.auth);

	const addProductModal = useDisclosure();

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getProduct();
	}, [selectedCategory, sort, search, page]);

	async function getProduct() {
		const res = await api.get("/product", {
			params: {
				category_id: selectedCategory,
				sort: sort,
				search: search,
				page: page,
			},
		});
		setProduct(res.data.rows);
		setTotalPage(Math.ceil(res.data.count / 12));
	}

	const handleSortChange = (sortOrder) => {
		if (sortOrder === sort) {
			setSort(
				sortOrder.includes("Asc")
					? sortOrder.replace("Asc", "Desc")
					: sortOrder.replace("Desc", "Asc")
			);
		} else {
			setSort(sortOrder);
		}
		setPage(1);
	};

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			setPage(newPage);
		}
	};

	const handleReset = () => {
		getProduct();
		setSelectedCategory("");
		setSort("");
		setSearch("");
		setPage(1);
	};

	return (
		<>
			<Center flexDir={"column"}>
				<Flex
					margin={"60px 20px 60px"}
					border={"1px"}
					borderRadius={"15px"}
					borderColor={"#E6EBF2"}
					padding={"15px"}
					w={"1400 px"}
					justifyContent={"center"}
					flexDir={"column"}
				>
					<Flex flexDir={"column"} paddingBottom={"15px"}>
						<Flex fontWeight={600} fontSize={"23px"}>
							Product Data
						</Flex>
					</Flex>
					<Flex pb={"15px"} w={"100%"} justifyContent={"space-between"}>
						<Flex gap={"10px"}>
							<Link to={`/admin/managedata`}>
								<Button leftIcon={<ArrowBackIcon />}>Back</Button>
							</Link>
							{user.role === "ADMIN" ? (
								<Button
									as={Button}
									paddingLeft={"9px"}
									marginBottom={"15px"}
									rightIcon={<AddIcon />}
									colorScheme="green"
									onClick={addProductModal.onOpen}
								/>
							) : null}
							<AddProductModal
								isOpen={addProductModal.isOpen}
								onClose={addProductModal.onClose}
								getProduct={getProduct}
							/>
						</Flex>
						<Flex gap={"15px"} paddingBottom={"15px"}>
							<Button onClick={handleReset}>
								<RepeatIcon />
							</Button>
							<Select
								w={"418px"}
								placeholder="All Type of Category"
								value={selectedCategory}
								onChange={(event) => {
									setPage(1);
									setSelectedCategory(event.target.value);
								}}
							>
								{category.length
									? category.map((val) => (
											<option key={val.id} value={val.id}>
												{val.category_name}
											</option>
									  ))
									: null}
							</Select>
							<InputGroup w={"418px"}>
								<Input placeholder="Search..." ref={inputFileRef} />
								<InputRightElement cursor={"pointer"}>
									<Button
										border="none"
										onClick={() => {
											setPage(1);
											setSearch(inputFileRef.current.value);
										}}
									>
										<Icon as={FaSearch} color="gray.400" />
									</Button>
								</InputRightElement>
							</InputGroup>
						</Flex>
					</Flex>
					<Flex
						padding={"7px"}
						borderBottom={"1px"}
						fontWeight={600}
						borderColor={"#E6EBF2"}
						gap={"7"}
					>
						<Flex w={"325px"} paddingLeft={"55px"}>
							<Flex
								onClick={() =>
									handleSortChange(
										"product" + (sort === "productDesc" ? "Asc" : "Desc")
									)
								}
								cursor="pointer"
								alignItems={"center"}
							>
								Product Name
								<UpDownIcon ml={"10px"} />
								{sort === "productDesc" ? sort === "productAsc" : null}
							</Flex>
						</Flex>

						<Flex w={"300px"} alignItems={"center"}>
							<Flex>Description</Flex>
						</Flex>
						<Flex w={"160px"}>
							<Flex
								onClick={() =>
									handleSortChange(
										"category" + (sort === "categoryAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
								alignItems={"center"}
							>
								Category
								{sort === "categoryAsc" ? sort === "categoryDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"160px"}>
							<Flex
								onClick={() =>
									handleSortChange(
										"price" + (sort === "priceAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
								alignItems={"center"}
							>
								Price (Rp)
								{sort === "priceAsc" ? sort === "priceDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"160px"}>
							<Flex
								onClick={() =>
									handleSortChange(
										"weight" + (sort === "weightAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
								alignItems={"center"}
							>
								Weight (g)
								{sort === "weightAsc" ? sort === "weightDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"25px"}></Flex>
					</Flex>
					{product.length ? (
						product.map((val) => {
							return <ProductList val={val} getProduct={getProduct} />;
						})
					) : (
						<Center fontSize={"20px"} fontWeight={"bold"} marginTop={"40px"}>
							Product not found
						</Center>
					)}
					<ButtonGroup
						paddingTop={"15px"}
						justifyContent={"end"}
						alignItems={"center"}
					>
						{/* <Flex>{product.length} from (BUTUH DI FIX) Products</Flex> */}
						{page === 1 || product.length === 0 ? null : (
							<Button
								onClick={() => {
									handlePageChange(page - 1);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Previous
							</Button>
						)}
						{page === totalPage || product.length === 0 ? null : (
							<Button
								onClick={() => {
									handlePageChange(page + 1);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Next
							</Button>
						)}
					</ButtonGroup>
				</Flex>
			</Center>
		</>
	);
}
