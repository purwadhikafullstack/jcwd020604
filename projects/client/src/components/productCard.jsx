import { Box, Flex, Image } from "@chakra-ui/react";

export default function ProductCard({ val }) {
	return (
		<Box
			w={"100%"}
			maxW={"383px"}
			h={"100%"}
			flexDir={"row"}
			borderRadius={"15px"}
			boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
		>
			<Image
				src={val.product_images[0].product_image}
				w={"100%"}
				maxH={"500px"}
				maxWidth={"383px"}
				borderRadius={"15px"}
			/>
			<Flex
				h={"auto"}
				flexDir={"column"}
				padding={"15px"}
				justifyContent={"end"}
			>
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
