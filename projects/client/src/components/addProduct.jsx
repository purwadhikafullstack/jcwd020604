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

export default function AddProduct() {
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
			></Flex>
		</Center>
	);
}
