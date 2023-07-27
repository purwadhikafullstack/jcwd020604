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
	return (
		<Flex
			padding={"7px"}
			borderBottom={"1px"}
			borderColor={"#E6EBF2"}
			gap={"7"}
			alignItems={"center"}
		>
			<Flex gap={"5px"} alignItems={"center"} ml={"55px"}>
				<Flex w={"210px"}>{val?.stock_id}</Flex>
			</Flex>
			<Flex w={"210px"}>{val?.qty}</Flex>
			<Flex w={"210px"}>{val?.status}</Flex>
			<Flex w={"210px"}>{val?.reference}</Flex>
			<Flex w={"210px"}>{val?.createdAt}</Flex>
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
