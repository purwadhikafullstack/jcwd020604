import {
	Center,
	Flex,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
} from "@chakra-ui/react";
import "../css/addProduct.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function ProductList() {
	return (
		<Center>
			<Flex
				margin={"60px 20px 60px"}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={"10px"}
				w={"1235px"}
				justifyContent={"center"}
			>
				<Flex flexDir={"column"}>
					<Center gap={"15px"} paddingBottom={"15px"}>
						<Select placeholder="All Warehouses">
							<option value="newest">Newest</option>
							<option value="priceAsc">Lowest Price</option>
							<option value="priceDesc">Highest Price</option>
						</Select>
						<Select placeholder="All Type of Category">
							<option value="newest">Newest</option>
							<option value="priceAsc">Lowest Price</option>
							<option value="priceDesc">Highest Price</option>
						</Select>
						<Select placeholder="All Status">
							<option value="priceAsc">Avaiable</option>
							<option value="newest">Sold Out</option>
						</Select>
						<InputGroup>
							<Input placeholder="Search..." />
							<InputRightElement cursor={"pointer"}>
								<Button border="none">
									<Icon as={FaSearch} color="gray.400" />
								</Button>
							</InputRightElement>
						</InputGroup>
					</Center>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						fontWeight={500}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>Product Name</Flex>
						<Flex w={"200px"}>Warehouse</Flex>
						<Flex w={"200px"}>Stock</Flex>
						<Flex w={"200px"}>Category</Flex>
						<Flex w={"200px"}>Price</Flex>
						<Flex w={"200px"}>Status</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
					<Flex
						justifyContent={"space-between"}
						padding={"7px"}
						borderBottom={"1px"}
						borderColor={"#E6EBF2"}
					>
						<Flex w={"200px"}>DEEP FAKE T-shirt</Flex>
						<Flex w={"200px"}>MMS Jogja</Flex>
						<Flex w={"200px"}>30</Flex>
						<Flex w={"200px"}>TOPS</Flex>
						<Flex w={"200px"}>Rp 821.000,00</Flex>
						<Flex w={"200px"}>Avaibale</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Center>
	);
}
