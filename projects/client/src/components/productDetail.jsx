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
	Button,
	Icon,
	useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import CarouselProduct from "./carauselProduct";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function ProductDetail() {
	const userSelector = useSelector((state) => state.auth);
	const [product, setProduct] = useState([]);
	const { uuid } = useParams();
	const [value, setValue] = useState(1);
	const [stock, setStock] = useState(0);
	const nav = useNavigate();
	const toast = useToast();

	const isSoldOut = stock === 0;

	useEffect(() => {
		getProductByUuid();
	}, []);

	async function getProductByUuid() {
		const res = await api.get(`/product/${uuid}`);
		setProduct(res.data);
		console.log(res);
		const totalQty = res.data.stocks.reduce(
			(accumulator, stock) => accumulator + stock.qty,
			0
		);
		setStock(totalQty || 0);
	}
	const handleIncrement = () => {
		if (value < stock) {
			setValue(value + 1);
		}
	};

	const handleDecrement = () => {
		if (value > 1) {
			setValue(value - 1);
		}
	};

	useEffect(() => {
		console.log(value);
	}, [value]);
	const addCart = async () => {
		await api
			.post("/cart/addCart", {
				user_id: userSelector.id,
				product_id: product.id,
				qty: value,
				price: product.price,
			})
			.then((res) => {
				toast({
					title: "product added to cart",
					status: "success",
					duration: 3000,
					position: "top",
				});
				nav("/cart");
			})
			.catch((err) => {
				toast({
					title: err.response.data.message,
					status: "error",
					duration: 3000,
					position: "top",
				});
			});
	};
	return (
		<>
			<Center>
				<Flex w={"1600px"} minW={"390px"} flexDir={"column"}>
					<Center
						margin={"60px 20px 60px"}
						justifyContent={"space-evenly"}
						alignItems={"start"}
						flexWrap={"wrap"}
						gap={"20px"}
						padding={"10px"}
						border={"1px"}
						borderRadius={"15px"}
						borderColor={"#E6EBF2"}
					>
						<CarouselProduct product={product.product_images} />
						<Flex
							flexDir={"column"}
							gap={"25px"}
							minW={"390px"}
							w={"500px"}
							borderRadius={"15px"}
							boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)"
							padding={"15px"}
						>
							<Flex justifyContent={"space-between"} alignItems={"center"}>
								<Flex fontSize={"22px"} fontWeight={"bold"}>
									{product.product_name}
								</Flex>
								{stock === 0 ? "Sold Out" : `Stock: ${stock}`}
							</Flex>
							{isSoldOut ? (
								<Flex fontSize={"18px"} fontWeight={"bold"}>
									<Flex style={{ textDecoration: "line-through" }}>
										Rp{" "}
										{product.price
											? product.price.toLocaleString("id-ID")
											: "Price Not Available"}
										,00
									</Flex>
									<Flex style={{ color: "red", marginLeft: "8px" }}>
										SOLD OUT
									</Flex>
								</Flex>
							) : (
								<Flex fontSize={"18px"} fontWeight={"bold"}>
									Rp{" "}
									{product.price
										? product.price.toLocaleString("id-ID")
										: "Price Not Available"}
									,00
								</Flex>
							)}
							<Flex>
								<Accordion allowMultiple minW={"390px"} w={"100%"}>
									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box
													as="span"
													flex="1"
													textAlign="left"
													fontWeight={"bold"}
												>
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
												<Box
													as="span"
													flex="1"
													textAlign="left"
													fontWeight={"bold"}
												>
													Product Weight:
												</Box>
												<AccordionIcon />
											</AccordionButton>
										</h2>
										<AccordionPanel pb={4}>
											{product.weight} gram
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</Flex>
							<Flex justifyContent={"space-between"} alignItems={"center"}>
								{/* <NumberInput
                defaultValue={value}
                min={1}
                onChange={setValue}
                paddingLeft={"150px"}
                paddingBottom={"50px"}
                isDisabled={isSoldOut}
              >
                <NumberInputStepper
                  w={"160px"}
                  h={"50px"}
                  display={"flex"}
                  flexDir={"row"}
                  gap={"10px"}
                  alignItems={"center"}
                >
                  <NumberDecrementStepper
                    onClick={handleDecrement}
                    fontSize={"15px"}
                    borderColor={"transparent"}
                    marginLeft={"10px"}
                  />
                  <NumberInputField textAlign="center" paddingLeft={"30px"} />

                  <NumberIncrementStepper
                    onClick={handleIncrement}
                    fontSize={"15px"}
                    borderColor={"transparent"}
                    marginRight={"10px"}
                  />
                </NumberInputStepper>
              </NumberInput> */}
								<NumberInput defaultValue={value} min={1} max={stock}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper onClick={handleIncrement} />
										<NumberDecrementStepper onClick={handleDecrement} />
									</NumberInputStepper>
								</NumberInput>

								<Button
									onClick={() => {
										addCart();
									}}
									w={"150px"}
									h={"50px"}
									bgColor={"yellow"}
									fontWeight={"bold"}
									_hover={{ bgColor: "yellow.200" }}
									isDisabled={isSoldOut}
								>
									<Icon as={AiOutlineShoppingCart} fontSize={"25px"} />
									CART
								</Button>
							</Flex>
						</Flex>
					</Center>
				</Flex>
			</Center>
		</>
	);
}
