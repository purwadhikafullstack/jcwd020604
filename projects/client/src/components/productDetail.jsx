import { Center, Flex, Image } from "@chakra-ui/react";
import img from "../assets/tshirt.webp";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function ProductDetail() {
	const [product, setProduct] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		getProductById();
	}, []);

	async function getProductById() {
		await api.get(`/product/${id}`).then((res) => {
			console.log(res.data);
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
					<Flex flexDir={"column"}>
						<Image src={img} w={"100%"} h={"auto"} maxWidth={"900px"} />
						<Flex maxW={"180px"}>
							<Image src={img} />
							<Image src={img} />
							<Image src={img} />
							<Image src={img} />
							<Image src={img} />
						</Flex>
					</Flex>
					<Flex flexDir={"column"} gap={"25px"} w={"450px"}>
						<Flex fontSize={"22px"} fontWeight={"bold"}>
							{/* {product.product_name} */}
						</Flex>
						<Flex fontSize={"18px"} fontWeight={"bold"}>
							{/* {`Rp ${product.price.toLocaleString("id-ID")},00`} */}
						</Flex>
						<Flex>
							<Flex>Product Detail</Flex>
							{/* <Flex>Product Desciption: {product.product_detail}</Flex> */}
						</Flex>
					</Flex>
				</Center>
			</Flex>
		</Center>
	);
}
