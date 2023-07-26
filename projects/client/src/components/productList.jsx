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
import DeleteProductModal from "./deleteProductModal";
import { useNavigate } from "react-router-dom";

import { api } from "../api/api";
import EditProductModal from "./editProductModal";

export default function ProductList({ val }) {
	const deleteProductModal = useDisclosure();
	const editProductModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();

	async function deleteProduct() {
		try {
			await api.delete(`/product/${val.id}`);

			toast({
				title: "Product Deleted",
				description: "The product has been deleted successfully.",
				status: "success",
				duration: 3000,
			});
			deleteProductModal.onClose();
			nav("/admin/product");
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
						val.product_images[0] ? val.product_images[0].product_image : null
					}
				/>
				<Flex w={"270px"}>{val.product_name}</Flex>
			</Flex>
			<Flex
				w={"300px"}
				style={{
					overflow: "hidden",
					whiteSpace: "nowrap",
					textOverflow: "ellipsis",
				}}
			>
				{val.product_detail.length > 35
					? val.product_detail.substring(0, 35) + "..."
					: val.product_detail}
				{/* {val.product_detail} */}
			</Flex>
			<Flex w={"160px"}>{val.category.category_name}</Flex>
			<Flex w={"160px"}>
				<Flex>
					{val.price
						? val.price.toLocaleString("id-ID")
						: "Price Not Available"}
				</Flex>
			</Flex>
			<Flex w={"160px"}>{val.weight}</Flex>
			<Menu>
				<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
					<Icon as={BiDotsHorizontalRounded} />{" "}
				</MenuButton>
				<MenuList>
					<MenuItem onClick={editProductModal.onOpen}>
						View / Edit Product
					</MenuItem>
					<MenuItem onClick={deleteProductModal.onOpen} color={"red"}>
						Remove
					</MenuItem>
				</MenuList>
			</Menu>
			<EditProductModal
				isOpen={editProductModal.isOpen}
				onClose={editProductModal.onClose}
				val={val}
			/>
			<DeleteProductModal
				isOpen={deleteProductModal.isOpen}
				onClose={deleteProductModal.onClose}
				deleteProduct={deleteProduct}
			/>
		</Flex>
	);
}
