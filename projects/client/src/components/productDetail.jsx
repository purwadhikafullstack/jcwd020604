import {
	Center,
	Flex,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import CarouselProduct from "./carauselProduct";

export default function ProductDetail() {
	const [product, setProduct] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		getProductById();
	}, []);

	async function getProductById() {
		await api.get(`/product/${id}`).then((res) => {
			setProduct(res.data);
		});
	}

	return (
		<Center>
			<Flex w={"1600px"} minW={"400px"} flexDir={"column"}>
				<Center
					margin={"60px 20px 60px"}
					justifyContent={"space-between"}
					alignItems={"start"}
					flexWrap={"wrap"}
				>
					<CarouselProduct product={product.product_images} />
					<Flex flexDir={"column"} gap={"25px"} w={"450px"}>
						<Flex fontSize={"22px"} fontWeight={"bold"}>
							{product.product_name}
						</Flex>
						<Flex fontSize={"18px"} fontWeight={"bold"}>
							Rp{" "}
							{product.price
								? product.price.toLocaleString("id-ID")
								: "Price Not Available"}
							,00
						</Flex>
						<Flex>
							<Accordion defaultIndex={[0]} allowMultiple w={"450px"}>
								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box as="span" flex="1" textAlign="left">
												Product Description:
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										{product.product_detail}
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box as="span" flex="1" textAlign="left">
												Product Weight:
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>{product.weight} gram</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Flex>
					</Flex>
				</Center>
			</Flex>
		</Center>
	);
}
