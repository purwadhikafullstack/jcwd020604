import { Box, Flex, Image } from "@chakra-ui/react";
import img from "../assets/tshirt.webp";

export default function ProductCard({ val }) {
	return (
		<Box flexWrap={"wrap"} w={"100%"} maxW={"370px"} flexDir={"row"}>
			<Image
				src={val.product_images[0].product_image}
				w={"100%"}
				h={"100%"}
				maxH={"395px"}
				maxWidth={"370px"}
			/>
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
