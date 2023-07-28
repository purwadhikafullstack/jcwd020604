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
	ArrowBackIcon,
} from "@chakra-ui/icons";

import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import HistoryList from "./historyList";

export default function StockHistory() {
	const [history, setHistory] = useState();

	useEffect(() => {
		getHistory();
	}, []);

	async function getHistory() {
		const res = await api.get("/stockhistory");
		setHistory(res.data);
	}

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
						<Button mr={"10px"}>
							<RepeatIcon />
						</Button>

						<Input type={"month"} w={"525px"} />
					</Flex>
					<Center gap={"15px"} paddingBottom={"15px"}>
						<Select placeholder="Select Warehouse">
							{/* {warehouse.length
								? warehouse.map((val) => (
                                    <option key={val.id} value={val.id}>
											{val.warehouse_name}
										</option>
								  ))
								: null} */}
						</Select>
						<Select placeholder="Select Reference">
							{/* {product.length
                                ? product.map((val) => (
                                    <option key={val.id} value={val.id}>   
                                            {val.warehouse_name}                                     {val.product_name}
                                      </option>
                                  ))
                                : null} */}
						</Select>
						<InputGroup>
							<Input
								placeholder="Search..."
								// ref={inputFileRef}
							/>
							<InputRightElement cursor={"pointer"}>
								<Button
								// border="none"
								// onClick={() => setSearch(inputFileRef.current.value)}
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
						<Flex w={"309px"} pl={"55px"}>
							<Flex alignItems={"center"} cursor="pointer">
								Product Name
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"194px"}>
							<Flex alignItems={"center"} cursor="pointer">
								Warehouse Name
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"115px"}>
							<Flex alignItems={"center"} cursor="pointer">
								Amount
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"100px"} alignItems={"center"}>
							<Flex alignItems={"center"} cursor="pointer">
								Status
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"179px"} alignItems={"center"}>
							<Flex alignItems={"center"} cursor="pointer">
								Reference
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"179px"} alignItems={"center"}>
							<Flex alignItems={"center"} cursor="pointer">
								Date
								<UpDownIcon ml={"10px"} />
							</Flex>
						</Flex>
						<Flex w={"25px"}></Flex>
					</Flex>
					{history?.length
						? history?.map((val) => {
								return <HistoryList val={val} getHistory={getHistory} />;
						  })
						: null}
				</Flex>
			</Flex>
		</Center>
	);
}
