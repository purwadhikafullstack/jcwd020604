import {
	Center,
	Flex,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	ButtonGroup,
	useDisclosure,
} from "@chakra-ui/react";
import {
	DeleteIcon,
	AddIcon,
	EditIcon,
	HamburgerIcon,
	PlusSquareIcon,
	UpDownIcon,
} from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import AddCategoryModal from "./addCategoryModal";
import AddWarehouseModal from "./addWarehouseModal";
import DeleteCategoryModal from "./deleteCategoryModal";
import DeleteWarehouseModal from "./deleteWarehouseModal";
import EditWarehouseModal from "./editWarehouseModal";
import EditCategoryModal from "./editCategoryModal";
import AddStockModal from "./addStockModal";
import StockList from "./stockList";

export default function AdminManageData() {
	// const [selectedCategory, setSelectedCategory] = useState("");
	// const [sort, setSort] = useState("");
	// const [search, setSearch] = useState("");
	// const [page, setPage] = useState(1);
	// const [totalPage, setTotalPage] = useState(0);
	const [warehouse, setWarehouse] = useState([]);
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [stock, setStock] = useState([]);
	const inputFileRef = useRef(null);

	const addStockModal = useDisclosure();
	const addCategoryModal = useDisclosure();
	const editCategoryModal = useDisclosure();
	const deleteCategoryModal = useDisclosure();
	const addWarehouseModal = useDisclosure();
	const editWarehouseModal = useDisclosure();
	const deleteWarehouseModal = useDisclosure();

	useEffect(() => {
		getCategory();
		getWarehouse();
		getProduct();
	}, []);

	useEffect(() => {
		getStock();
	}, []);

	async function getStock() {
		const res = await api.get("/stock");
		setStock(res.data);
	}

	async function getProduct() {
		const res = await api.get("/product");
		setProduct(res.data);
	}

	async function getCategory() {
		const res = await api.get("/category");
		setCategory(res.data);
	}

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}

	// const handlePageChange = (newPage) => {
	// 	if (newPage !== page) {
	// 		setPage(newPage);
	// 	}
	// };

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
				<Flex flexDir={"column"}>
					<Flex fontWeight={600} paddingBottom={"15px"} fontSize={"23px"}>
						Manage Data
					</Flex>
					<Flex>
						<Flex gap={"10px"} w={"100%"}>
							<Link to={`/admin/product`}>
								<Button leftIcon={<HamburgerIcon />}>Product Data</Button>
							</Link>
							<Menu>
								<MenuButton
									as={Button}
									paddingLeft={"9px"}
									marginBottom={"15px"}
									rightIcon={<AddIcon />}
								></MenuButton>
								<MenuList>
									<MenuItem onClick={addCategoryModal.onOpen}>
										Add Category
									</MenuItem>
									<MenuItem onClick={addWarehouseModal.onOpen}>
										Add Warehouse
									</MenuItem>
								</MenuList>
							</Menu>
							<Menu>
								<MenuButton
									as={Button}
									paddingLeft={"9px"}
									marginBottom={"15px"}
									rightIcon={<EditIcon />}
								></MenuButton>
								<MenuList>
									<MenuItem onClick={editCategoryModal.onOpen}>
										View / Edit Category
									</MenuItem>
									<MenuItem onClick={editWarehouseModal.onOpen}>
										View / Edit Warehouse
									</MenuItem>
								</MenuList>
							</Menu>
							<Menu>
								<MenuButton
									as={Button}
									colorScheme="red"
									color={"white"}
									paddingLeft={"9px"}
									marginBottom={"15px"}
									rightIcon={<DeleteIcon />}
								></MenuButton>
								<MenuList>
									<MenuItem color={"red"} onClick={deleteCategoryModal.onOpen}>
										Delete Category
									</MenuItem>
									<MenuItem color={"red"} onClick={deleteWarehouseModal.onOpen}>
										Delete Warehouse
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
						<Button
							justifyContent={"end"}
							colorScheme="green"
							onClick={addStockModal.onOpen}
						>
							Add Stock
						</Button>
					</Flex>
					<Center gap={"15px"} paddingBottom={"15px"}>
						<Select placeholder="All Warehouses">
							{warehouse.length
								? warehouse.map((val) => <option>{val.warehouse_name}</option>)
								: null}
						</Select>
						<Select placeholder="All Type of Category">
							{category.length
								? category.map((val) => (
										<option key={val.id} value={val.id}>
											{val.category_name}
										</option>
								  ))
								: null}
						</Select>
						<InputGroup>
							<Input placeholder="Search..." ref={inputFileRef} />
							<InputRightElement cursor={"pointer"}>
								<Button border="none">
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
						<Flex w={"325px"} paddingLeft={"55px"} alignItems={"center"}>
							Product Name
							<UpDownIcon ml={"10px"} />
						</Flex>

						<Flex w={"195px"} alignItems={"center"}>
							Warehouse
							<UpDownIcon ml={"10px"} />
						</Flex>
						<Flex w={"195px"} alignItems={"center"}>
							Category
							<UpDownIcon ml={"10px"} />
						</Flex>
						<Flex w={"195px"} alignItems={"center"}>
							Stock
							<UpDownIcon ml={"10px"} />
						</Flex>
						<Flex w={"195px"} alignItems={"center"}>
							Status
						</Flex>
						<Flex w={"25px"}></Flex>
					</Flex>
					{stock.length
						? stock.map((val) => {
								return <StockList val={val} />;
						  })
						: null}
				</Flex>
				{/* <ButtonGroup
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
				</ButtonGroup> */}
				<AddStockModal
					isOpen={addStockModal.isOpen}
					onClose={addStockModal.onClose}
				/>

				<AddCategoryModal
					isOpen={addCategoryModal.isOpen}
					onClose={addCategoryModal.onClose}
					getCategory={getCategory}
				/>
				<EditCategoryModal
					isOpen={editCategoryModal.isOpen}
					onClose={editCategoryModal.onClose}
				/>
				<DeleteCategoryModal
					isOpen={deleteCategoryModal.isOpen}
					onClose={deleteCategoryModal.onClose}
				/>
				<AddWarehouseModal
					isOpen={addWarehouseModal.isOpen}
					onClose={addWarehouseModal.onClose}
					getWarehouse={getWarehouse}
				/>
				<EditWarehouseModal
					isOpen={editWarehouseModal.isOpen}
					onClose={editWarehouseModal.onClose}
				/>
				<DeleteWarehouseModal
					isOpen={deleteWarehouseModal.isOpen}
					onClose={deleteWarehouseModal.onClose}
				/>
			</Flex>
		</Center>
	);
}
