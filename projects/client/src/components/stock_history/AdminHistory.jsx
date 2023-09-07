import {
	Center,
	Flex,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
	Grid,
} from "@chakra-ui/react";
import { RepeatIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import HistoryList from "./HistoryList";
import HistoryCard from "./CardHistory";
import ButtonPage from "../ButtonPage";
import SortHistory from "./SortHistory";

export default function AdminHistory() {
	const user = useSelector((state) => state.auth);
	const inputFileRef = useRef(null);
	const [warehouse, setWarehouse] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState("");
	const [selectedReference, setSelectedReference] = useState("");
	const [time, setTime] = useState("");
	const [history, setHistory] = useState();
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);

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
		const res = await api().get("/stockhistory", {
			params: {
				warehouse_id:
					user.role === "ADMIN" ? selectedWarehouse : user.warehouse_id,
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
		const res = await api().get("/warehouse");
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

	let historyListOrGrid;

	if (pageWidth <= 900) {
		historyListOrGrid = (
			<Grid padding={"20px"} templateColumns={templateColumns} gap={"25px"}>
				{history?.length ? (
					history.map((val) => {
						return <HistoryCard val={val} getHistory={getHistory} />;
					})
				) : (
					<Center pt={"20px"} fontWeight={700}>
						Stock history not found
					</Center>
				)}
			</Grid>
		);
	} else {
		historyListOrGrid = (
			<>
				{history?.length ? (
					history?.map((val) => {
						return <HistoryList val={val} getHistory={getHistory} />;
					})
				) : (
					<Center pt={"20px"} fontWeight={700}>
						Stock history not found
					</Center>
				)}
			</>
		);
	}

	return (
		<Center flexDir={"column"} mx={2}>
			<Flex
				margin={8}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={5}
				maxW={"1300px"}
				w={"100%"}
				justifyContent={"center"}
				flexDir={"column"}
			>
				<Flex flexDir={"column"} pb={5}>
					<Flex fontWeight={600} paddingBottom={"15px"} fontSize={'lg'}>
						Stock History
					</Flex>
					<Flex gap={"15px"} my={2}>
						<Flex w={"100%"} marginBottom={"15px"}>
							<Button size={'xs'} rounded={'sm'} leftIcon={<ArrowBackIcon />}>
								<Link to={`/admin/managedata`}>Back</Link>
							</Button>
						</Flex>
						<Button onClick={handleReset} variant={'ghost'} size={'sm'} rounded={'full'} _hover={{color:'blue',bgColor:'chakra-placeholder-color._light'}}>
							<RepeatIcon />
						</Button>

						<Input
							type={"month"}
							w={"520px"}
							size={'sm'}
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
						{user.role === "ADMIN" ? (
							<Select
								placeholder="All Warehouses"
								size={'sm'}
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
							<Select size={'sm'} value={user.warehouse_id} isDisabled>
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
							size={'sm'}
							value={selectedReference}
							onChange={(event) => {
								setPage(1);
								setSelectedReference(event.target.value);
							}}
						>
							<option style={{fontSize: '12px', fontWeight: 'bold'}}>ADD FROM ADMIN</option>
							<option style={{fontSize: '12px', fontWeight: 'bold'}}>EDIT FROM ADMIN</option>
							<option style={{fontSize: '12px', fontWeight: 'bold'}}>INVOICE</option>
							<option style={{fontSize: '12px', fontWeight: 'bold'}} value={"MUT"}>MUTATION</option>
						</Select>
						<InputGroup size={'sm'}>
							<Input placeholder="Search..." ref={inputFileRef} />
							<InputRightElement cursor={"pointer"}>
								<Button
									border="none"
									size={'sm'}
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
					<SortHistory
						pageWidth={pageWidth}
						handleSortChange={handleSortChange}
						sort={sort}
					/>
					{historyListOrGrid}
				</Flex>
				<ButtonPage
					data={history}
					page={page}
					totalPage={totalPage}
					handlePageChange={handlePageChange}
				/>
			</Flex>
		</Center>
	);
}
