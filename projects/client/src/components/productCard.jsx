import { Box, Flex, Image } from "@chakra-ui/react";

export default function ProductCard({ val, stock }) {
	const isSoldOut = stock === 0;

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
					{isSoldOut ? (
						<Flex flexWrap={"wrap"}>
							<Flex style={{ textDecoration: "line-through" }}>
								Rp{" "}
								{val.price
									? val.price.toLocaleString("id-ID")
									: "Price Not Available"}
								,00
							</Flex>
							<Flex style={{ color: "red", marginLeft: "8px" }}>SOLD OUT</Flex>
						</Flex>
					) : (
						<Flex>
							Rp{" "}
							{val.price
								? val.price.toLocaleString("id-ID")
								: "Price Not Available"}
							,00
						</Flex>
					)}
				</Flex>
			</Flex>
		</Box>
	);
}
