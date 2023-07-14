import { Box, Flex, Image } from "@chakra-ui/react";
import img from "../assets/tshirt.webp";

export default function ProductCard({ val }) {
	return (
		<Box flexWrap={"wrap"} h={"auto"} w={"100%"} maxW={"370px"} flexDir={"row"}>
			<Image src={img} w={"100%"} h={"auto"} maxWidth={"370px"} />
			<Flex h={"auto"} flexDir={"column"} padding={"15px"}>
				<Flex>{val.product_name}</Flex>
				<Flex fontSize={"18px"} fontWeight={"bold"}>
					Rp{" "}
					{val.price
						? val.price.toLocaleString("id-ID")
						: "Price Not Available"}
					,00
				</Flex>
			</Flex>
		</Box>
	);
}
