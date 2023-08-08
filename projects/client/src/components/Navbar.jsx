import React, { useState, useEffect } from "react";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Image,
	Input,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	useColorModeValue,
	Stack,
	Text,
	useToast,
	InputRightElement,
	InputGroup,
	useColorMode,
} from "@chakra-ui/react";
import {
	FiLogOut,
	FiLogIn,
	FiShoppingCart,
	FiSearch,
	FiMoon,
	FiSun,
} from "react-icons/fi";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { api } from "../api/api";

import Logo2 from "../assets/logo2.png";

export default function Navbar(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth);
	const toast = useToast();

	const [product, setProduct] = useState([]);

	console.log(props.cart);

	async function getcart() {
		console.log(user.id);
		const res = await api.get(`/cart/` + user.id);
		setProduct(res.data);
	}
	console.log(product);

	const totalCart = () => {
		let total = 0;
		product.forEach((val) => {
			total += val.qty;
		});
		return total;
	};

	useEffect(() => {
		getcart();
	}, []);

	const totalQty = totalCart();

	function logout() {
		localStorage.removeItem("auth");
		dispatch({
			type: "logout",
		});
		navigate("/login");
		toast({
			title: "Anda telah logout",
			status: "success",
			position: "top",
			duration: 3000,
			isClosable: false,
		});
	}

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>
							<Image
								src={colorMode === "light" ? Logo : Logo2}
								minW={"50px"}
								w={"20px"}
								cursor={"pointer"}
								onClick={() => navigate("/")}
							></Image>
						</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{user.role === "ADMIN" ? (
								<>
									<Flex>
										<Link to={"/"}>Dashboard</Link>
									</Flex>
									<Flex
										cursor={"pointer"}
										onClick={() => navigate("/admin/product")}
									>
										Products
									</Flex>
									<Flex
										cursor={"pointer"}
										onClick={() => navigate("/user_list")}
									>
										Users
									</Flex>
								</>
							) : (
								<>
									<Flex>
										<Link to={"/collection"}>Tops</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Bottoms</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Outerwares</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Accerories</Link>
									</Flex>
								</>
							)}
							<Flex>
								<InputGroup>
									<InputRightElement pointerEvents="none">
										<FiSearch color="gray.300" cursor={"pointer"} />
									</InputRightElement>
									<Input type="tel" placeholder="Search . . ." />
								</InputGroup>
							</Flex>
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<IconButton
							icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
							isRound={"true"}
							size={"md"}
							alignSelf={"flex-end"}
							onClick={toggleColorMode}
						></IconButton>
						<Link to={"/cart"}>
							<Box m={2} pr={4} cursor={"pointer"}>
								<FiShoppingCart />
							</Box>
						</Link>
						<Box
							ml={"-5"}
							mr={"20px"}
							border={"solid yellow 1px"}
							borderRadius={"50px"}
							fontWeight={"bold"}
							bgColor={"yellow"}
							display={totalQty == 0 ? "none" : "box"}
						>
							{totalQty}
						</Box>
						<Menu>
							{user.fullname ? (
								<>
									<Text fontSize={"12px"} mr={2}>
										Welcome <Text as={"b"}>{user.fullname}</Text>
									</Text>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
									>
										<Avatar size={"sm"} src={user.avatar_url} />
									</MenuButton>
									<MenuList>
										{user.role === "ADMIN" ? (
											<>
												<MenuItem onClick={() => navigate("/user_list")}>
													Manage User
												</MenuItem>
											</>
										) : (
											<>
												<MenuItem onClick={() => navigate("/user_profile")}>
													Manage Profile
												</MenuItem>
											</>
										)}
										{user.role === "ADMIN" || user.role === "W_ADMIN" ? (
											<>
												<MenuItem onClick={() => navigate("/admin/managedata")}>
													Manage Data
												</MenuItem>
											</>
										) : null}
									</MenuList>
									<Link to={"/"}>
										<Button
											onClick={logout}
											size={"sm"}
											variant={"ghost"}
											leftIcon={<FiLogOut />}
											_hover={{ color: "red" }}
										>
											Logout
										</Button>
									</Link>
								</>
							) : (
								<>
									{" "}
									<Link to={"/login"}>
										<Button
											size={"sm"}
											variant={"ghost"}
											leftIcon={<FiLogIn />}
										>
											Login
										</Button>
									</Link>
								</>
							)}
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{user.role === "ADMIN" ? (
								<>
									<InputGroup>
										<InputRightElement pointerEvents="none">
											<FiSearch color="gray.300" />
										</InputRightElement>
										<Input type="tel" placeholder="Search . . ." />
									</InputGroup>
									<Flex>
										<Link to={"/"}>Dashboard</Link>
									</Flex>
									<Flex
										cursor={"pointer"}
										onClick={() => navigate("/admin/product")}
									>
										Products
									</Flex>
									<Flex
										cursor={"pointer"}
										onClick={() => navigate("/user_list")}
									>
										Users
									</Flex>
								</>
							) : (
								<>
									<InputGroup>
										<InputRightElement pointerEvents="none">
											<FiSearch color="gray.300" />
										</InputRightElement>
										<Input type="tel" placeholder="Search . . ." />
									</InputGroup>
									<Flex>
										<Link to={"/collection"}>Tops</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Bottoms</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Outerwares</Link>
									</Flex>
									<Flex>
										<Link to={"/collection"}>Accerories</Link>
									</Flex>
									<Box></Box>
								</>
							)}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
