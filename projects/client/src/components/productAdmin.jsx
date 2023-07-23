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
import { DeleteIcon, AddIcon, EditIcon } from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ProductList from "./productList";
import AddCategoryModal from "./addCategoryModal";
import AddProductModal from "./addProductModal";
import AddWarehouseModal from "./addWarehouseModal";
import DeleteCategoryModal from "./deleteCategoryModal";
import DeleteWarehouseModal from "./deleteWarehouseModal";
import EditWarehouseModal from "./editWarehouseModal";

export default function AdminProduct() {
	const nav = useNavigate();
	const [product, setProduct] = useState([]);
	const [category, setCategory] = useState([]);
	const [warehouse, setWarehouse] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const inputFileRef = useRef(null);
	const {
		isOpen: isAddProductModalOpen,
		onOpen: onAddProductModalOpen,
		onClose: onAddProductModalClose,
	} = useDisclosure();
	const {
		isOpen: isAddCategoryModalOpen,
		onOpen: onAddCategoryModalOpen,
		onClose: onAddCategoryModalClose,
	} = useDisclosure();
	const {
		isOpen: isAddWarehouseModalOpen,
		onOpen: onAddWarehouseModalOpen,
		onClose: onAddWarehouseModalClose,
	} = useDisclosure();
	const {
		isOpen: isEditWarehouseModalOpen,
		onOpen: onEditWarehouseModalOpen,
		onClose: onEditWarehouseModalClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteCategoryModalOpen,
		onOpen: onDeleteCategoryModalOpen,
		onClose: onDeleteCategoryModalClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteWarehouseModalOpen,
		onOpen: onDeleteWarehouseModalOpen,
		onClose: onDeleteWarehouseModalClose,
	} = useDisclosure();

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		getWarehouse();
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

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
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
				<Flex flexDir={"column"}>
					<Flex fontWeight={600} paddingBottom={"15px"} fontSize={"23px"}>
						Manage Data
					</Flex>
					<Flex gap={"10px"}>
						<Menu>
							<MenuButton
								as={Button}
								paddingLeft={"9px"}
								marginBottom={"15px"}
								rightIcon={<AddIcon />}
							></MenuButton>
							<MenuList>
								<MenuItem onClick={onAddProductModalOpen}>Add Product</MenuItem>
								<MenuItem onClick={onAddCategoryModalOpen}>
									Add Category
								</MenuItem>
								<MenuItem onClick={onAddWarehouseModalOpen}>
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
								<MenuItem>Edit Category</MenuItem>
								<MenuItem onClick={onEditWarehouseModalOpen}>
									Edit Warehouse
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
								<MenuItem color={"red"} onClick={onDeleteCategoryModalOpen}>
									Delete Category
								</MenuItem>
								<MenuItem color={"red"} onClick={onDeleteWarehouseModalOpen}>
									Delete Warehouse
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
					<Center gap={"15px"} paddingBottom={"15px"}>
						<Select placeholder="All Warehouses">
							{warehouse.length
								? warehouse.map((val) => <option>{val.warehouse_name}</option>)
								: null}
						</Select>
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

						<Flex w={"230px"}>Warehouse</Flex>
						<Flex w={"150px"}>Stock</Flex>
						<Flex w={"230px"}>Category</Flex>
						<Flex w={"230px"}>Price (Rp)</Flex>
						<Flex w={"230px"}>Status</Flex>
						<Flex w={"25px"}></Flex>
					</Flex>
					{product.map((val) => {
						return <ProductList val={val} />;
					})}
				</Flex>
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
				<AddProductModal
					isOpen={isAddProductModalOpen}
					onClose={onAddProductModalClose}
				/>
				<AddCategoryModal
					isOpen={isAddCategoryModalOpen}
					onClose={onAddCategoryModalClose}
					getCategory={getCategory}
				/>
				<AddWarehouseModal
					isOpen={isAddWarehouseModalOpen}
					onClose={onAddWarehouseModalClose}
					getWarehouse={getWarehouse}
				/>
				<EditWarehouseModal
					isOpen={isEditWarehouseModalOpen}
					onClose={onEditWarehouseModalClose}
					getWarehouse={getWarehouse}
				/>
				<DeleteWarehouseModal
					isOpen={isDeleteWarehouseModalOpen}
					onClose={onDeleteWarehouseModalClose}
				/>
				<DeleteCategoryModal
					isOpen={isDeleteCategoryModalOpen}
					onClose={onDeleteCategoryModalClose}
				/>
			</Flex>
		</Center>
	);
}