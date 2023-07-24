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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ProductList from "./productList";

export default function AdminProduct() {
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const inputFileRef = useRef(null);

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getAll();
	}, [selectedCategory, sort, search, page]);

	async function getAll() {
		try {
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
		} catch (error) {
			console.log(error);
		}
	}

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			setPage(newPage);
		}
	};

	return (
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
						Manage Product
					</Flex>
				</Flex>
				<Flex pb={"15px"}>
					<Link to={`/admin/managedata`}>
						<Button leftIcon={<ArrowBackIcon />}>Back</Button>
					</Link>
				</Flex>
				<Center gap={"15px"} paddingBottom={"15px"}>
					<Select
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
					<Select placeholder="All Status">
						<option value="priceAsc">Available</option>
						<option value="newest">Sold Out</option>
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
				</Center>
				<Flex
					padding={"7px"}
					borderBottom={"1px"}
					fontWeight={600}
					borderColor={"#E6EBF2"}
					gap={"7"}
				>
					<Flex w={"325px"} paddingLeft={"55px"}>
						Product Name
					</Flex>

					<Flex w={"230px"}>Description</Flex>
					<Flex w={"230px"}>Category</Flex>
					<Flex w={"230px"}>Price (Rp)</Flex>
					<Flex w={"230px"}>Weight</Flex>
					<Flex w={"25px"}></Flex>
				</Flex>
				{product.length
					? product.map((val) => {
							return <ProductList val={val} />;
					  })
					: null}
				<ButtonGroup
					paddingTop={"15px"}
					justifyContent={"end"}
					alignItems={"center"}
				>
					<Flex>{product.length} from (BUTUH DI FIX) Products</Flex>
					{page === 1 ? null : (
						<Button
							onClick={() => {
								handlePageChange(page - 1);
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Previous
						</Button>
					)}
					{page === totalPage ? null : (
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
	);
}
