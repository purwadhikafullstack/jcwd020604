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
	Grid,
} from "@chakra-ui/react";
import {
	UpDownIcon,
	RepeatIcon,
	ArrowBackIcon,
	AddIcon,
	BellIcon,
} from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import { useSelector } from "react-redux";
import MutationList from "./MutationList";
import AddMutationModal from "./AddMutationModal";
import MutationRequestModal from "./MutationRequestModal";
import MutationCard from "./CardMutation";

export default function AdminMutation() {
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState("");
	const [selectedToWarehouse, setSelectedToWarehouse] = useState("");
	const [selectedFromWarehouse, setSelectedFromWarehouse] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [time, setTime] = useState("");
	const [mutation, setMutation] = useState();
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [request, setRequest] = useState([]);
	const user = useSelector((state) => state.auth);
	const inputFileRef = useRef(null);

	const addMutationModal = useDisclosure();
	const mutationRequestModal = useDisclosure();

	useEffect(() => {
		getWarehouse();
		getRequest();
	}, [selectedFromWarehouse]);

	console.log();

	useEffect(() => {
		getMutation();
	}, [
		page,
		sort,
		search,
		time,
		selectedStatus,
		selectedWarehouse,
		selectedToWarehouse,
	]);

	useEffect(() => {
		if (user.role !== "ADMIN") {
			setPage(1);
			setSelectedToWarehouse(user.warehouse_id);
			setSelectedFromWarehouse(user.warehouse_id);
		}
	}, []);

	async function getMutation() {
		const res = await api.get("/stockmutation", {
			params: {
				from_warehouse_id: selectedWarehouse,
				to_warehouse_id: user.role === "ADMIN" ? "" : user.warehouse_id,
				status: selectedStatus,
				search: search,
				sort: sort,
				page: page,
				time: time,
			},
		});
		setMutation(res.data.rows);
		setTotalPage(Math.ceil(res.data.count / 12));
	}

	async function getRequest() {
		const res = await api.get("/stockmutation/mutation/request", {
			params: {
				from_warehouse_id: user.role === "ADMIN" ? "" : user.warehouse_id,
			},
		});
		setRequest(res.data);
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
		getMutation();
		getWarehouse();
		getRequest();
		setSort("");
		setPage(1);
		setSelectedWarehouse("");
		setSelectedStatus("");
		setSearch("");
		setTime("");
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

	if (pageWidth <= 700) {
		templateColumns = "repeat(2, 1fr)";
	} else {
		templateColumns = "repeat(3, 1fr)";
	}

	let mutationListOrGrid;

	if (pageWidth <= 900) {
		mutationListOrGrid = (
			<Grid padding={"20px"} templateColumns={templateColumns} gap={"25px"}>
				{mutation?.length ? (
					mutation.map((val) => {
						return <MutationCard val={val} getMutation={getMutation} />;
					})
				) : (
					<Center pt={"20px"} fontWeight={700}>
						Stock mutation not found
					</Center>
				)}
			</Grid>
		);
	} else {
		mutationListOrGrid = (
			<>
				{mutation?.length ? (
					mutation?.map((val) => {
						return <MutationList val={val} getMutation={getMutation} />;
					})
				) : (
					<Center pt={"20px"} fontWeight={700}>
						Stock mutation not found
					</Center>
				)}
			</>
		);
	}

	return (
		<Center flexDir={"column"}>
			<Flex
				margin={"30px 20px 30px"}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={"15px"}
				maxW={"1300px"}
				w={"100%"}
				justifyContent={"center"}
				flexDir={"column"}
			>
				<Flex flexDir={"column"}>
					<Flex fontWeight={600} paddingBottom={"15px"} fontSize={"23px"}>
						Stock Mutation
					</Flex>
					<Flex
						justifyContent={"space-between"}
						gap={"15px"}
						paddingBottom={"15px"}
					>
						<Flex gap={"15px"} w={"100%"}>
							<Link to={`/admin/managedata`}>
								<Button leftIcon={<ArrowBackIcon />}>Back</Button>
							</Link>
							<Button
								as={Button}
								colorScheme="green"
								onClick={addMutationModal.onOpen}
							>
								<AddIcon />
							</Button>
							<Flex style={{ position: "relative", display: "inline-block" }}>
								<Button as={Button} onClick={mutationRequestModal.onOpen}>
									<BellIcon />
								</Button>
								{request.length ? (
									<Flex
										style={{
											position: "absolute",
											top: "0",
											right: "0",
											borderRadius: "50%",
											backgroundColor: "red",
											color: "white",
											width: "20px",
											height: "20px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontSize: "12px",
										}}
									>
										{request.length}
									</Flex>
								) : null}
							</Flex>
						</Flex>
						<Button onClick={handleReset}>
							<RepeatIcon />
						</Button>
						<Input
							type={"month"}
							w={"520px"}
							value={time}
							onChange={(e) => {
								setPage(1);
								setTime(e.target.value);
							}}
						/>
					</Flex>
					<Center
						gap={"15px"}
						paddingBottom={"15px"}
						w={["100%", null, "auto"]} // Adjust width based on breakpoints
						flexWrap={["wrap", null, "nowrap"]}
					>
						<Select
							placeholder="From Warehouse"
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
						<Select
							placeholder="Select Status"
							value={selectedStatus}
							onChange={(event) => {
								setPage(1);
								setSelectedStatus(event.target.value);
							}}
						>
							<option>APPROVED</option>
							<option>PENDING</option>
							<option>REJECT</option>
						</Select>
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
					{pageWidth > 900 ? (
						<Flex
							padding={"7px"}
							borderBottom={"1px"}
							fontWeight={600}
							borderColor={"#E6EBF2"}
							gap={"7"}
						>
							<Flex
								w={"325px"}
								minW={"275px"}
								paddingLeft={"55px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"product" + (sort === "productAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Product Name
								<UpDownIcon ml={"10px"} />
								{sort === "productAsc" ? sort === "productDesc" : null}
							</Flex>
							<Flex
								w={"195px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"from_Warehouse" +
											(sort === "from_WarehouseDesc" ? "Asc" : "Desc")
									)
								}
								cursor="pointer"
							>
								Warehouse (From-To)
								{sort === "from_WarehouseDesc"
									? sort === "from_WarehouseAsc"
									: null}
								<UpDownIcon ml={"10px"} />
							</Flex>
							<Flex
								w={"195px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"mutation_code" +
											(sort === "mutation_codeAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Mutation Code
								{sort === "mutation_codeAsc"
									? sort === "mutation_codeDesc"
									: null}
								<UpDownIcon ml={"10px"} />
							</Flex>
							<Flex
								w={"100px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange("qty" + (sort === "qtyAsc" ? "Desc" : "Asc"))
								}
								cursor="pointer"
							>
								Amount
								{sort === "qtyAsc" ? sort === "qtyDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
							<Flex
								w={"100px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"status" + (sort === "statusAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Status
								{sort === "statusAsc" ? sort === "statusDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
							<Flex
								w={"170px"}
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"date" + (sort === "dateAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Date
								{sort === "dateAsc" ? sort === "dateDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
							<Flex w={"25px"}></Flex>
						</Flex>
					) : null}
					{mutationListOrGrid}
				</Flex>
				<ButtonGroup
					paddingTop={"15px"}
					justifyContent={"end"}
					alignItems={"center"}
				>
					{page === 1 || mutation?.length === 0 ? null : (
						<Button
							onClick={() => {
								handlePageChange(page - 1);
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Previous
						</Button>
					)}
					{page === totalPage || mutation?.length === 0 ? null : (
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
			<AddMutationModal
				isOpen={addMutationModal.isOpen}
				onClose={addMutationModal.onClose}
				getMutation={getMutation}
				getRequest={getRequest}
			/>
			<MutationRequestModal
				isOpen={mutationRequestModal.isOpen}
				onClose={mutationRequestModal.onClose}
				request={request}
				getMutation={getMutation}
				getRequest={getRequest}
			/>
		</Center>
	);
}
