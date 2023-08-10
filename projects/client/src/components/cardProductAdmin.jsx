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
	Card,
	CardBody,
	Stack,
	Heading,
	Text,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DeleteProductModal from "./deleteProductModal";
import { useNavigate } from "react-router-dom";

import { api } from "../api/api";
import EditProductModal from "./editProductModal";
import { useSelector } from "react-redux";

export default function ProductList({ val, getProduct }) {
	const deleteProductModal = useDisclosure();
	const editProductModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();
	const user = useSelector((state) => state.auth);

	async function deleteProduct() {
		try {
			await api.delete(`/product/${val.id}`);

			toast({
				title: "Product Deleted",
				description: "The product has been deleted successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getProduct();
			deleteProductModal.onClose();
			nav("/admin/product");
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	}

	return (
		<Card maxW="xs">
			<CardBody>
				<Image
					src={
						val.product_images[0] ? val.product_images[0].product_image : null
					}
					borderRadius="lg"
				/>
				<Stack mt="6" spacing="2">
					<Flex>
						<Heading size="md">{val.product_name}</Heading>
						<Menu>
							<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
								<Icon as={BiDotsVerticalRounded} />{" "}
							</MenuButton>
							<MenuList>
								{user.role === "ADMIN" ? (
									<MenuItem onClick={editProductModal.onOpen}>
										View / Edit Product
									</MenuItem>
								) : (
									<MenuItem onClick={editProductModal.onOpen}>
										View Detail
									</MenuItem>
								)}
								{user.role === "ADMIN" ? (
									<MenuItem onClick={deleteProductModal.onOpen} color={"red"}>
										Remove
									</MenuItem>
								) : null}
							</MenuList>
						</Menu>
					</Flex>
					<Text>
						{" "}
						{val.product_detail.length > 100
							? val.product_detail.substring(0, 100) + "..."
							: val.product_detail}
					</Text>
					<Text color="blue.600" fontSize="2xl">
						Rp{" "}
						{val.price
							? val.price.toLocaleString("id-ID")
							: "Price Not Available"}
						,00
					</Text>
				</Stack>
			</CardBody>
			<EditProductModal
				isOpen={editProductModal.isOpen}
				onClose={editProductModal.onClose}
				val={val}
				getProduct={getProduct}
			/>
			<DeleteProductModal
				isOpen={deleteProductModal.isOpen}
				onClose={deleteProductModal.onClose}
				deleteProduct={deleteProduct}
			/>
		</Card>
	);
}
