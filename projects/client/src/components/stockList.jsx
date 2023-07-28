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
import { BsFillCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useState } from "react";
import DeleteStockModal from "./deleteStockModal";
import EditStockModal from "./editStockModal";

export default function StockList({ val, getStock }) {
	const stock = val.qty;
	const deleteStockModal = useDisclosure();
	const editStockModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();

	async function deleteStock() {
		try {
			await api.delete(`/stock/${val.id}`);

			toast({
				title: "Stock Deleted",
				description: "The stock has been deleted successfully.",
				status: "success",
				duration: 3000,
			});
			getStock();
			deleteStockModal.onClose();
			nav("/admin/managedata");
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				duration: 3000,
			});
		}
	}

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
			<Flex w={"195px"}>
				{!val?.warehouse ? (
					<Flex>Warehouse not found</Flex>
				) : (
					val?.warehouse?.warehouse_name
				)}
			</Flex>
			<Flex w={"195px"}>
				{val.product.category == null ? (
					<Flex>Category not found</Flex>
				) : (
					val.product.category.category_name
				)}
			</Flex>
			<Flex w={"195px"}>{val.qty}</Flex>
			<Flex w={"195px"}>
				{stock > 10 ? (
					<Flex>
						<Icon as={BsFillCircleFill} color={"green"} />
					</Flex>
				) : stock > 0 ? (
					<Flex>
						<Icon as={BsFillCircleFill} color={"orange"} />
					</Flex>
				) : (
					<Flex>
						<Icon as={BsFillCircleFill} color={"red"} />
					</Flex>
				)}
			</Flex>
			<Menu>
				<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
					<Icon as={BiDotsHorizontalRounded} />{" "}
				</MenuButton>
				<MenuList>
					<MenuItem onClick={editStockModal.onOpen} getStock={getStock}>
						Edit
					</MenuItem>
					<MenuItem onClick={deleteStockModal.onOpen} color={"red"}>
						Remove
					</MenuItem>
				</MenuList>
			</Menu>
			<EditStockModal
				isOpen={editStockModal.isOpen}
				onClose={editStockModal.onClose}
				val={val}
			/>
			<DeleteStockModal
				isOpen={deleteStockModal.isOpen}
				onClose={deleteStockModal.onClose}
				deleteStock={deleteStock}
			/>
		</Flex>
	);
}
