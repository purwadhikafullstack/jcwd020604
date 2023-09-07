import {
	Flex,
	Image,
	Card,
	CardBody,
	Stack,
	Heading,
	Text,
} from "@chakra-ui/react";
import moment from "moment";

export default function HistoryCard({ val }) {
	return (
		<>
			{val?.stock?.id ? (
				<Card
					maxW="xs"
					_hover={{
						backgroundColor: "#E6EBF2",
					}}
				>
					<CardBody>
						<Image
							src={
								`${process.env.REACT_APP_API_BASE_URL}/${val?.stock?.product?.product_images[0]}`
									? `${process.env.REACT_APP_API_BASE_URL}/${val?.stock?.product?.product_images[0].product_image}`
									: null
							}
							borderRadius="lg"
						/>
						<Stack mt="6" spacing="2">
							<Flex flexDir={"column"} justifyContent={"space-between"}>
								<Text>
									<Heading size="sm">
										{val?.stock?.product?.product_name}
									</Heading>
								</Text>

								<Flex flexDir={"column"}>
									<Flex gap={"5px"}>
										<Flex fontSize={'xs'} fontWeight={'bold'} fontFamily={'sans-serif'}>
											{" "}
											{val?.stock?.warehouse?.warehouse_name
												? val?.stock?.warehouse?.warehouse_name
												: "Undefined warehouse"}
										</Flex>
										<Flex fontSize={'xs'} fontWeight={'medium'} fontFamily={'sans-serif'}>{`(${val?.status})`}</Flex>
									</Flex>
									<Flex gap={"5px"}>
										<Flex fontSize={'xs'} fontWeight={'bold'} fontFamily={'sans-serif'}>{val?.stock_after} </Flex>
										<Flex fontSize={'xs'} fontWeight={'bold'} fontFamily={'sans-serif'} style={{ color: val?.qty < 0 ? "red" : "green" }}>
											{val?.qty === 0 ? null : `(${val?.qty})`}
										</Flex>
									</Flex>

									<Flex fontSize={'xs'} fontWeight={'bold'} fontFamily={'sans-serif'}>{val?.reference}</Flex>
									<Flex fontSize={'xs'} fontWeight={'bold'} fontFamily={'sans-serif'}>
										{moment(val?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
									</Flex>
								</Flex>
							</Flex>
						</Stack>
					</CardBody>
				</Card>
			) : null}
		</>
	);
}
