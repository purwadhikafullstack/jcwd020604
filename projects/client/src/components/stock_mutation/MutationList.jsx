import {
	Flex,
	Icon,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import DeleteMutationModal from "./DeleteMutationModal";
import EditMutationModal from "./EditMutationModal";

export default function MutationList({ val, getMutation, getRequest }) {
	const deleteMutationModal = useDisclosure();
	const editMutationModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();

	async function deleteMutation() {
		try {
			await api().delete(`/stockmutation/${val.id}`);

			toast({
				title: "Mutation Deleted",
				description: "The mutation has been deleted successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getMutation();
			getRequest();
			deleteMutationModal.onClose();
			nav("/admin/mutation");
		} catch (error) {
			toast({
				title: error.response.data.message,
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	}

	return (
		<>
			{val?.stock?.id ? (
				<Flex
					padding={"7px"}
					borderBottom={"1px"}
					borderColor={"#E6EBF2"}
					gap={"7"}
					alignItems={"center"}
					_hover={{color: 'black',
						backgroundColor: "#E6EBF2",
					}}
				>
					<Flex gap={"5px"} alignItems={"center"}>
						<Image
							w={"50px"}
							h={"50px"}
							borderRadius={"4px"}
							src={
								`${process.env.REACT_APP_API_BASE_URL}/${val?.stock?.product?.product_images[0]}`
									? `${process.env.REACT_APP_API_BASE_URL}/${val?.stock?.product?.product_images[0]?.product_image}`
									: null
							}
						/>
						<Flex w={"270px"} fontSize={'sm'} fontWeight={'medium'}>{val?.stock?.product?.product_name}</Flex>
					</Flex>
					<Flex w={"195px"} fontSize={'sm'} fontWeight={'medium'} flexWrap={"wrap"} gap={"3px"}>
						<Flex fontSize={'sm'} fontWeight={'medium'}>{`${
							val?.from_warehouse?.warehouse_name
								? val?.from_warehouse?.warehouse_name
								: "Undefined warehouse"
						}`}</Flex>
						<Flex>➜</Flex>
						<Flex fontSize={'sm'} fontWeight={'medium'}>{` ${
							val?.to_warehouse?.warehouse_name
								? val?.to_warehouse?.warehouse_name
								: "Undefined warehouse"
						}`}</Flex>
					</Flex>
					<Flex w={"195px"} fontSize={'sm'} fontWeight={'medium'}>{val?.mutation_code}</Flex>
					<Flex w={"100px"} fontSize={'sm'} fontWeight={'medium'}>{val?.qty}</Flex>
					<Flex w={"100px"} fontSize={'sm'} fontWeight={'medium'}>{val?.status}</Flex>
					<Flex w={"170px"} fontSize={'sm'} fontWeight={'medium'}>
						{moment(val?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
					</Flex>
					{val?.status === "PENDING" ? (
						<Menu>
							<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
								<Icon as={BiDotsHorizontalRounded} />
							</MenuButton>
							<MenuList fontSize={'xs'}>
								<MenuItem onClick={editMutationModal.onOpen} fontWeight={'bold'} color={"green"} _hover={{color:'#00cc00'}}>Edit</MenuItem>
								<MenuItem onClick={deleteMutationModal.onOpen} color={"red"} fontWeight={'bold'} _hover={{color: '#ff4d4d'}}>
									Cancel
								</MenuItem>
							</MenuList>
						</Menu>
					) : val?.status === "APPROVED" ? (
						<Icon
							w={"20px"}
							h={"20px"}
							color={"green"}
							as={AiOutlineCheckCircle}
						/>
					) : val?.status === "AUTO" ? (
						<Icon
							w={"20px"}
							h={"20px"}
							color={"green"}
							as={AiOutlineCheckCircle}
						/>
					) : (
						<Icon
							w={"20px"}
							h={"20px"}
							color={"red"}
							as={AiOutlineCloseCircle}
						/>
					)}
					<EditMutationModal
						isOpen={editMutationModal.isOpen}
						onClose={editMutationModal.onClose}
						val={val}
						getMutation={getMutation}
						getRequest={getRequest}
					/>
					<DeleteMutationModal
						isOpen={deleteMutationModal.isOpen}
						onClose={deleteMutationModal.onClose}
						deleteMutation={deleteMutation}
					/>
				</Flex>
			) : null}
		</>
	);
}
