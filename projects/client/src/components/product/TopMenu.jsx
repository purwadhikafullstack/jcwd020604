import {
	Flex,
	Select,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
	HStack,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopMenu({
	user,
	addProductModal,
	handleReset,
	selectedCategory,
	setPage,
	setSelectedCategory,
	category,
	inputFileRef,
	setSearch,
}) {
	return (
		<Flex
			pb={"15px"}
			gap={"15px"}
			justifyContent={"space-between"}
			w={["100%", null, "auto"]} // Adjust width based on breakpoints
			flexWrap={["wrap", null, "nowrap"]}
		>
			<Flex justifyContent={"space-between"} w={"100%"}>
				<HStack display={'flex'} alignItems={'center'}>
						<Button rounded={'sm'} size={'xs'} leftIcon={<ArrowBackIcon />}>
							<Link to={`/admin/managedata`}>
								Back
							</Link>
						</Button>
					{user.role === "ADMIN" ? (
						<Button
							rounded={'sm'} size={'xs'}
							as={Button}
							colorScheme="green"
							onClick={addProductModal.onOpen}
						>
							<AddIcon />
						</Button>
					) : null}
				</HStack>
				<Button onClick={handleReset} ml={"15px"} variant={'ghost'} size={'sm'} rounded={'full'} _hover={{color:'blue',bgColor:'none'}}>
					<RepeatIcon />
				</Button>
			</Flex>
			<Flex gap={"15px"} w={"1500px"} flexWrap={["wrap", null, "nowrap"]}>
				<Select
					w={"100%"}
					size={'sm'}
					placeholder="All Type of Category"
					value={selectedCategory}
					onChange={(event) => {
						setPage(1);
						setSelectedCategory(event.target.value);
					}}
				>
					{category.length
						? category.map((val) => (
								<option key={val.id} value={val.id}>
									{val.category_name}
								</option>
						  ))
						: null}
				</Select>
				<InputGroup w={"100%"} size={'sm'}>
					<Input placeholder="Search..." ref={inputFileRef} />
					<InputRightElement cursor={"pointer"}>
						<Button
							border="none"
							size={'sm'}
							onClick={() => {
								setPage(1);
								setSearch(inputFileRef.current.value);
							}}
						>
							<Icon as={FaSearch} color="gray.400" />
						</Button>
					</InputRightElement>
				</InputGroup>
			</Flex>
		</Flex>
	);
}
