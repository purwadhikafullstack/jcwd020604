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
	RepeatIcon,
	TimeIcon,
} from "@chakra-ui/icons";
import { useSelector } from "react-redux";

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
import Navbar from "./Navbar";
import { BsFillCircleFill } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";

export default function AdminManageData() {
	const user = useSelector((state) => state.auth);
	const [warehouse, setWarehouse] = useState([]);
	const [category, setCategory] = useState([]);
	const [stock, setStock] = useState([]);
	const inputFileRef = useRef(null);
	const [selectedWarehouse, setSelectedWarehouse] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [product, setProduct] = useState([]);

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
		getAllProduct();
	}, []);

	useEffect(() => {
		getStock();
	}, [selectedWarehouse, selectedProduct, sort, search, page]);

	useEffect(() => {
		if (user.role !== "ADMIN") {
			setPage(1);
			setSelectedWarehouse(user.warehouse_id);
		}
	}, []);

	async function getStock() {
		const res = await api.get("/stock", {
			params: {
				warehouse_id: selectedWarehouse,
				product_id: selectedProduct,
				sort: sort,
				search: search,
				page: page,
			},
		});
		setStock(res.data.rows);
		setTotalPage(Math.ceil(res.data.count / 12));
	}

	async function getAllProduct() {
		const res = await api.get("/product/getAllProduct/getAll");
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

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			setPage(newPage);
		}
	};

	const handleReset = () => {
		getStock();
		getAllProduct();
		getCategory();
		getWarehouse();
		setSelectedProduct("");
		setSelectedWarehouse(user.role === "ADMIN" ? "" : user.warehouse_id);
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
					<Flex flexDir={"column"}>
						<Flex fontWeight={600} paddingBottom={"15px"} fontSize={"23px"}>
							Manage Data
						</Flex>
						<Flex>
							<Flex gap={"10px"} w={"100%"}>
								<Button
									colorScheme="green"
									onClick={addStockModal.onOpen}
									marginBottom={"15px"}
								>
									Add Stock
								</Button>
								{user.role === "ADMIN" ? (
									<Flex gap={"10px"}>
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
												<MenuItem
													color={"red"}
													onClick={deleteCategoryModal.onOpen}
												>
													Delete Category
												</MenuItem>
												<MenuItem
													color={"red"}
													onClick={deleteWarehouseModal.onOpen}
												>
													Delete Warehouse
												</MenuItem>
											</MenuList>
										</Menu>
									</Flex>
								) : null}
							</Flex>
							<Button onClick={handleReset} mr={"15px"}>
								<RepeatIcon />
							</Button>
							<Link to={`/admin/mutation`}>
								<Button
									mr={"15px"}
									leftIcon={<Icon as={FaBoxes} />}
									px={"10px"}
								>
									Stock Mutation
								</Button>
							</Link>
							<Link to={`/admin/product`}>
								<Button mr={"15px"} leftIcon={<HamburgerIcon />}>
									Product Data
								</Button>
							</Link>
							<Link to={`/admin/stockhistory`}>
								<Button leftIcon={<TimeIcon />} px={"10px"}>
									Stock History
								</Button>
							</Link>
						</Flex>
						<Center gap={"15px"} paddingBottom={"15px"}>
							<Select
								placeholder="All Type of Products"
								value={selectedProduct}
								onChange={(event) => {
									setPage(1);
									setSelectedProduct(event.target.value);
								}}
							>
								{product.length
									? product.map((val) => (
											<option key={val.id} value={val.id}>
												{val.product_name}
											</option>
									  ))
									: null}
							</Select>
							{user.role === "ADMIN" ? (
								<Select
									placeholder="All Warehouses"
									value={selectedWarehouse}
									onChange={(event) => {
										setPage(1);
										setSelectedWarehouse(event.target.value);
									}}
								>
									{warehouse.length
										? warehouse.map((val) => (
												<option key={val.id} value={val.id}>
													{val.warehouse_name}
												</option>
										  ))
										: null}
								</Select>
							) : (
								<Select value={user.warehouse_id} isDisabled>
									{warehouse.length
										? warehouse.map((val) => (
												<option key={val.id} value={val.id}>
													{val.warehouse_name}
												</option>
										  ))
										: null}
								</Select>
							)}
							<InputGroup>
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
						</Center>
						<Flex
							padding={"7px"}
							borderBottom={"1px"}
							fontWeight={600}
							borderColor={"#E6EBF2"}
							gap={"7"}
						>
							<Flex w={"325px"} paddingLeft={"55px"}>
								<Flex
									alignItems={"center"}
									onClick={() =>
										handleSortChange(
											"product" + (sort === "productDesc" ? "Asc" : "Desc")
										)
									}
									cursor="pointer"
								>
									Product Name
									<UpDownIcon ml={"10px"} />
									{sort === "productDesc" ? sort === "productAsc" : null}
								</Flex>
							</Flex>

							<Flex w={"195px"} alignItems={"center"}>
								<Flex
									alignItems={"center"}
									onClick={() =>
										handleSortChange(
											"warehouse" + (sort === "warehouseAsc" ? "Desc" : "Asc")
										)
									}
									cursor="pointer"
								>
									Warehouse
									{sort === "warehouseAsc" ? sort === "warehouseDesc" : null}
									<UpDownIcon ml={"10px"} />
								</Flex>
							</Flex>
							<Flex w={"195px"} alignItems={"center"}>
								<Flex
									alignItems={"center"}
									onClick={() =>
										handleSortChange(
											"category" + (sort === "categoryAsc" ? "Desc" : "Asc")
										)
									}
									cursor="pointer"
								>
									Category
									{sort === "categoryAsc" ? sort === "categoryDesc" : null}
									<UpDownIcon ml={"10px"} />
								</Flex>
							</Flex>
							<Flex w={"195px"} alignItems={"center"}>
								<Flex
									alignItems={"center"}
									onClick={() =>
										handleSortChange(
											"qty" + (sort === "qtyAsc" ? "Desc" : "Asc")
										)
									}
									cursor="pointer"
								>
									Stock
									<UpDownIcon ml={"10px"} />
									{sort === "qtyAsc" ? sort === "qtyDesc" : null}
								</Flex>
							</Flex>
							<Flex w={"195px"} alignItems={"center"}>
								<Flex alignItems={"center"}>Status</Flex>
							</Flex>
							<Flex w={"25px"}></Flex>
						</Flex>
						{stock.length
							? stock.map((val) => {
									return <StockList val={val} getStock={getStock} />;
							  })
							: null}
					</Flex>
					<Flex justifyContent={"end"} alignItems={"center"} gap={"30px"}>
						<Flex alignItems={"center"} gap={"5px"} mt={"15px"}>
							<Icon as={BsFillCircleFill} color={"red"} />
							<Flex>Stock = 0</Flex>
						</Flex>
						<Flex alignItems={"center"} gap={"5px"} mt={"15px"}>
							<Icon as={BsFillCircleFill} color={"orange"} />
							<Flex>{`Stock > 0`}</Flex>
						</Flex>
						<Flex alignItems={"center"} gap={"5px"} mt={"15px"}>
							<Icon as={BsFillCircleFill} color={"green"} />

							<Flex>{`Stock > 10`}</Flex>
						</Flex>

						<ButtonGroup paddingTop={"15px"} alignItems={"center"}>
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
					<AddStockModal
						isOpen={addStockModal.isOpen}
						onClose={addStockModal.onClose}
						getStock={getStock}
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
		</>
	);
}
