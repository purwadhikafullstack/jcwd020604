import {
	Center,
	Flex,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Grid,
	GridItem,
	Button,
	Icon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import CarouselProduct from "./carauselProduct";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductDetail() {
	const [product, setProduct] = useState([]);
	const { id } = useParams();
	const [value, setValue] = useState(1);

	useEffect(() => {
		getProductById();
	}, []);

	async function getProductById() {
		await api.get(`/product/${id}`).then((res) => {
			setProduct(res.data);
		});
	}

	const handleIncrement = () => {
		setValue(value + 1);
	};

	const handleDecrement = () => {
		setValue(value - 1);
	};

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
							<Accordion allowMultiple w={"450px"}>
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
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							<NumberInput
								defaultValue={value}
								min={1}
								max={10}
								onChange={setValue}
								paddingLeft={"150px"}
								paddingBottom={"50px"}
							>
								<NumberInputStepper
									w={"150px"}
									h={"50px"}
									display={"flex"}
									flexDir={"row"}
									gap={"15px"}
									alignItems={"center"}
								>
									<NumberDecrementStepper
										onClick={handleDecrement}
										fontSize={"20px"}
										borderColor={"transparent"}
									/>
									<NumberInputField textAlign="center" />

									<NumberIncrementStepper
										onClick={handleIncrement}
										fontSize={"20px"}
										borderColor={"transparent"}
									/>
								</NumberInputStepper>
							</NumberInput>
							<Flex>Stock: 30</Flex>
							<Button
								w={"150px"}
								h={"50px"}
								bgColor={"yellow"}
								fontWeight={"bold"}
								_hover={{ bgColor: "yellow.200" }}
							>
								<Icon as={AiOutlineShoppingCart} fontSize={"25px"} />
								CART
							</Button>
						</Flex>
					</Flex>
				</Center>
			</Flex>
		</Center>
	);
}
