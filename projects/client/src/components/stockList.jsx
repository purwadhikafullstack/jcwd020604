import {
	Flex,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useState } from "react";

export default function StockList({ val }) {
	const isSoldOut = val.qty === 0;
	const deleteProductModal = useDisclosure();
	const editProductModal = useDisclosure();

	return (
		<Flex
			padding={"7px"}
			borderBottom={"1px"}
			borderColor={"#E6EBF2"}
			gap={"7"}
			alignItems={"center"}
		>
			<Flex gap={"5px"} alignItems={"center"}>
				<Image
					w={"50px"}
					h={"50px"}
					borderRadius={"4px"}
					src={
						val.product.product_images[0]
							? val.product.product_images[0].product_image
							: null
					}
				/>
				<Flex w={"270px"}>{val.product.product_name}</Flex>
			</Flex>
			<Flex w={"195px"}>{val.warehouse.warehouse_name}</Flex>
			<Flex w={"195px"}>{val.product.category_id}</Flex>
			<Flex w={"195px"}>{val.qty}</Flex>
			<Flex w={"195px"}>
				{isSoldOut ? (
					<Flex color={"red"}>Empty</Flex>
				) : (
					<Flex color={"green"}>Available</Flex>
				)}
			</Flex>
			<Menu>
				<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
					<Icon as={BiDotsHorizontalRounded} />{" "}
				</MenuButton>
				<MenuList>
					<MenuItem>View / Edit Stock</MenuItem>
					<MenuItem color={"red"}>Remove</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
