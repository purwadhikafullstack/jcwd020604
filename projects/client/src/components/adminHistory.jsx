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
import { UpDownIcon, RepeatIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import HistoryList from "./historyList";
import { useSelector } from "react-redux";

export default function AdminHistory() {
	const user = useSelector((state) => state.auth);
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState("");
	const [selectedReference, setSelectedReference] = useState("");
	const [time, setTime] = useState("");
	const [history, setHistory] = useState();
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const inputFileRef = useRef(null);

	useEffect(() => {
		getWarehouse();
	}, []);

	useEffect(() => {
		getHistory();
	}, [page, sort, search, selectedWarehouse, selectedReference, time]);

	useEffect(() => {
		if (user.role !== "ADMIN") {
			setPage(1);
			setSelectedWarehouse(user.warehouse_id);
		}
	}, []);

	async function getHistory() {
		const res = await api.get("/stockhistory", {
			params: {
				warehouse_id: selectedWarehouse,
				reference: selectedReference,
				search: search,
				sort: sort,
				page: page,
				time: time,
			},
		});
		setHistory(res.data.rows);
		setTotalPage(Math.ceil(res.data.count / 12));
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
		getHistory();
		getWarehouse();
		setSort("");
		setPage(1);
		setSelectedWarehouse(user.role === "ADMIN" ? "" : user.warehouse_id);
		setSelectedReference("");
		setSearch("");
		setTime("");
	};

	return (
		<Center flexDir={"column"}>
			<Flex
				margin={"60px 20px 60px"}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={"15px"}
				w={"1322 px"}
				justifyContent={"center"}
				flexDir={"column"}
			>
				<Flex flexDir={"column"}>
					<Flex fontWeight={600} paddingBottom={"15px"} fontSize={"23px"}>
						Stock History
					</Flex>
					<Flex>
						<Flex gap={"10px"} w={"100%"} marginBottom={"15px"}>
							<Link to={`/admin/managedata`}>
								<Button leftIcon={<ArrowBackIcon />}>Back</Button>
							</Link>
						</Flex>
						<Button onClick={handleReset} mr={"15px"}>
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
					<Center gap={"15px"} paddingBottom={"15px"}>
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
						<Select
							placeholder="Select Reference"
							value={selectedReference}
							onChange={(event) => {
								setPage(1);
								setSelectedReference(event.target.value);
							}}
						>
							<option>ADD FROM ADMIN</option>
							<option>EDIT FROM ADMIN</option>
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
										"product" + (sort === "productAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Product Name
								<UpDownIcon ml={"10px"} />
								{sort === "productAsc" ? sort === "productDesc" : null}
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
						<Flex w={"115px"}>
							<Flex
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"stockAfter" + (sort === "stockAfterAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Stock
								{sort === "stockAfterAsc" ? sort === "stockAfterDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"100px"} alignItems={"center"}>
							<Flex
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
						</Flex>
						<Flex w={"179px"} alignItems={"center"}>
							<Flex
								alignItems={"center"}
								onClick={() =>
									handleSortChange(
										"reference" + (sort === "referenceAsc" ? "Desc" : "Asc")
									)
								}
								cursor="pointer"
							>
								Reference
								{sort === "referenceAsc" ? sort === "referenceDesc" : null}
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"179px"} alignItems={"center"}>
							<Flex
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
						</Flex>
						<Flex w={"10px"}></Flex>
					</Flex>
					{history?.length
						? history?.map((val) => {
								return <HistoryList val={val} getHistory={getHistory} />;
						  })
						: null}
				</Flex>
				<ButtonGroup
					paddingTop={"15px"}
					justifyContent={"end"}
					alignItems={"center"}
				>
					{page === 1 || history?.length === 0 ? null : (
						<Button
							onClick={() => {
								handlePageChange(page - 1);
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							Previous
						</Button>
					)}
					{page === totalPage || history?.length === 0 ? null : (
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
