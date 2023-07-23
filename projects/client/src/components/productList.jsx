import {
	Flex,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function ProductList({ val }) {
	const stock = val.stocks[0]?.qty || 0;
	const isSoldOut = stock === 0;

	// const editModal = useDisclosure();

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
					src={val.product_images[0].product_image}
				/>
				<Flex w={"270px"}>{val.product_name}</Flex>
			</Flex>
			<Flex w={"230px"}>MMS</Flex>
			<Flex w={"150px"}>{stock}</Flex>
			<Flex w={"230px"}>{val.category.category_name}</Flex>
			<Flex w={"230px"}>
				<Flex>
					{val.price
						? val.price.toLocaleString("id-ID")
						: "Price Not Available"}
				</Flex>
			</Flex>
			<Flex w={"230px"}>
				{isSoldOut ? (
					<Flex style={{ color: "red" }}>SOLD OUT</Flex>
				) : (
					<Flex style={{ color: "green" }}>AVAILABLE</Flex>
				)}
			</Flex>
			<Menu>
				<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
					<Icon as={BiDotsHorizontalRounded} />{" "}
				</MenuButton>
				<MenuList>
					<MenuItem
					// onClick={editModal.onOpen}
					>
						Edit
					</MenuItem>
					<MenuItem>Remove</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
