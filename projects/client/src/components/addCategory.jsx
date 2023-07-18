import {
	Center,
	Flex,
	Select,
	Icon,
	Button,
	Input,
	Textarea,
	Text,
	Image,
	Box,
} from "@chakra-ui/react";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { api } from "../api/api";

export default function AddCategory() {
	const nav = useNavigate();
	const inputFileRef = useRef(null);

	return (
		<Center>
			<Flex
				margin={"60px 20px 60px"}
				border={"1px"}
				borderRadius={"15px"}
				borderColor={"#E6EBF2"}
				padding={"15px"}
				w={"1400px"}
				flexDir={"column"}
				gap={"30px"}
				fontWeight={500}
			>
				<Flex>Product Information</Flex>
				<Flex flexDir={"column"} gap={"20px"}>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Warehouse:
						</Flex>
						<Select placeholder="Choose your warehouse" w={"400px"}>
							<option value="newest">Newest</option>
							<option value="priceAsc">Lowest Price</option>
							<option value="priceDesc">Highest Price</option>
						</Select>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Name:
						</Flex>
						<Input placeholder="e.g. MMS Shirt" w={"400px"} />
					</Flex>
					<Flex>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Description:
						</Flex>
						<Textarea
							placeholder="e.g. A T-shirt with an impressive"
							w={"400px"}
						/>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Product Category:
						</Flex>
						<Select placeholder="Choose category" w={"400px"}>
							<option value="newest">Newest</option>
							<option value="priceAsc">Lowest Price</option>
							<option value="priceDesc">Highest Price</option>
						</Select>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Price:
						</Flex>
						<Input placeholder="e.g. MMS Shirt" w={"400px"} />
					</Flex>
					<Flex alignItems={"center"}>
						<Flex flexDir={"column"} marginRight={"170px"}>
							<Flex paddingBottom={"5px"}>Product Image:</Flex>
							<Flex
								w={"180px"}
								fontSize={"12px"}
								fontWeight={400}
								color={"rgba(53, 53, 53, 0.60)"}
							>
								Use a 1:1 photo ratio (10KB-1MB). Acceptable formats are .jpg,
								and .png. You can upload a maximum of 5 photos.
							</Flex>
						</Flex>
						<Input
							accept="image/png, image/jpeg"
							ref={inputFileRef}
							type="file"
							display={"none"}
							id="filename"
						></Input>
						<Box
							display={"flex"}
							flexDir={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							padding={"16px"}
							gap={"16px"}
							w={"140px"}
							h={"160px"}
							border={"1px dashed rgba(53, 53, 53, 0.3);"}
							borderRadius={"8px"}
							textAlign={"center"}
							fontWeight={"400"}
							fontSize={"12px"}
						>
							<Icon as={HiOutlineUpload} w={"16px"} h={"16px"} />
							<Text as={"span"} onClick={() => inputFileRef.current.click()}>
								Drag and Drop File or{" "}
								<Text
									as={"span"}
									cursor={"pointer"}
									color={"#45BB71"}
									textDecor={"underline"}
								>
									Browse
								</Text>
							</Text>
						</Box>
					</Flex>
					<Flex alignItems={"center"}>
						<Flex w={"180px"} marginRight={"170px"}>
							Stock:
						</Flex>
						<Input type="number" placeholder="e.g. 50 " w={"400px"} />
					</Flex>
				</Flex>
				<Flex justifyContent={"flex-end"}>
					<Flex gap={"8px"}>
						<Button
							border={"1px solid #369A64"}
							borderRadius={"8px"}
							color={"#369A64"}
							colorScheme="white"
							onClick={() => nav("/admin/product/")}
						>
							Cancel
						</Button>

						<Button
							borderRadius={"8px"}
							color={"white"}
							bgColor={"#369A64"}
							_hover={{ bgColor: "#358A54" }}
						>
							Add Product
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Center>
	);
}
