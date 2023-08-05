import {
	Flex,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import moment from "moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export default function MutationList({ val }) {
	return (
		<>
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
					<Flex w={"270px"}>{val?.stock?.product?.product_name}</Flex>
				</Flex>
				<Flex w={"195px"}></Flex>
				<Flex w={"195px"}>{val?.mutation_code}</Flex>
				<Flex w={"100px"}>{val?.qty}</Flex>
				<Flex w={"100px"}>{val?.status}</Flex>
				<Flex w={"170px"}>
					{moment(val?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
				</Flex>
				<Menu>
					<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
						<Icon as={BiDotsHorizontalRounded} />
					</MenuButton>
					<MenuList>
						<MenuItem>View / Edit Mutation</MenuItem>

						<MenuItem>Remove</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</>
	);
}
