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
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import DeleteStockModal from "./DeleteStockModal";
import EditStockModal from "./EditStockModal";

export default function StockList({ val, getStock }) {
	const user = useSelector((state) => state.auth);
	const stock = val.qty;
	const deleteStockModal = useDisclosure();
	const editStockModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();

	async function deleteStock() {
		try {
			await api().delete(`/stock/${val.id}`);

			toast({
				title: "Stock Deleted",
				description: "The stock has been deleted successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getStock();
			deleteStockModal.onClose();
			nav("/admin/managedata");
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
		<Flex
			padding={"7px"}
			borderBottom={"1px"}
			borderColor={"#E6EBF2"}
			gap={"7"}
			alignItems={"center"}
			_hover={{color: 'black',
				backgroundColor: "#E6EBF2",
			}}
		>
			<Flex gap={"5px"} alignItems={"center"}>
				<Image
					w={"50px"}
					h={"50px"}
					borderRadius={"4px"}
					src={
						`${process.env.REACT_APP_API_BASE_URL}/${val.product.product_images[0]}`
							? `${process.env.REACT_APP_API_BASE_URL}/${val.product.product_images[0].product_image}`
							: null
					}
				/>
				<Flex w={"270px"} fontSize={'sm'} fontWeight={'medium'}>{val.product.product_name}</Flex>
			</Flex>
			<Flex w={"190px"} fontSize={'sm'} fontWeight={'medium'}>
				{!val?.warehouse ? (
					<Flex>Undefined warehouse</Flex>
				) : (
					val?.warehouse?.warehouse_name
				)}
			</Flex>
			<Flex w={"190px"} fontSize={'xs'} fontWeight={'medium'}>
				{val.product.category == null ? (
					<Flex>Category not found</Flex>
				) : (
					val.product.category.category_name
				)}
			</Flex>
			<Flex w={"190px"} fontSize={'sm'} fontWeight={'medium'}>{val.qty}</Flex>
			<Flex w={"190px"} fontSize={'xs'} fontWeight={'medium'}>
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
				<MenuList fontSize={'xs'}>
					<MenuItem onClick={editStockModal.onOpen} getStock={getStock} fontWeight={'bold'} color={"green"} _hover={{color:'#00cc00'}}>
						Edit
					</MenuItem>
					{user.role === "ADMIN" ? (
						<MenuItem onClick={deleteStockModal.onOpen} fontWeight={'bold'} color={"red"} _hover={{color: '#ff4d4d'}}>
							Remove
						</MenuItem>
					) : null}
				</MenuList>
			</Menu>
			<EditStockModal
				isOpen={editStockModal.isOpen}
				onClose={editStockModal.onClose}
				val={val}
				getStock={getStock}
			/>
			<DeleteStockModal
				isOpen={deleteStockModal.isOpen}
				onClose={deleteStockModal.onClose}
				deleteStock={deleteStock}
			/>
		</Flex>
	);
}
