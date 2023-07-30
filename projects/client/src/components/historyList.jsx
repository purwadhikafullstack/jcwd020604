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

export default function HistoryList({ val, getHistory }) {
	console.log(val);
	return (
		<>
			{val?.stock?.id ? (
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
					<Flex w={"115px"} gap={"5px"}>
						<Flex>{val?.stock_after}</Flex>
						<Flex style={{ color: val?.qty < 0 ? "red" : "green" }}>
							{val?.qty === 0 ? null : `(${val?.qty})`}
						</Flex>
					</Flex>
					<Flex w={"100px"}>{val?.status}</Flex>
					<Flex w={"179px"}>{val?.reference}</Flex>
					<Flex w={"179px"}>{val?.createdAt}</Flex>
					<Flex w={"25px"} h={"25px"}></Flex>
				</Flex>
			) : null}
		</>
	);
}