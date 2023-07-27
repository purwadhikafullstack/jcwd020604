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

export default function HistoryList({ val, getHistory }) {
	console.log(val);
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
						val?.stock?.product?.product_images[0]
							? val?.stock?.product?.product_images[0].product_image
							: null
					}
				/>
				<Flex w={"254px"}>{val?.stock?.product?.product_name}</Flex>
			</Flex>
			<Flex w={"194px"}>{val?.stock?.warehouse?.warehouse_name}</Flex>
			<Flex w={"115px"}>{val?.qty}</Flex>
			<Flex w={"100px"}>{val?.status}</Flex>
			<Flex w={"179px"}>{val?.reference}</Flex>
			<Flex w={"179px"}>{val?.createdAt}</Flex>
			<Menu>
				<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
					<Icon as={BiDotsHorizontalRounded} />
				</MenuButton>
				<MenuList>
					<MenuItem>View / Edit Product</MenuItem>
					<MenuItem color={"red"}>Remove</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
