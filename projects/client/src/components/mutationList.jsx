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
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useSelector } from "react-redux";

import DeleteMutationModal from "./deleteMutationModal";
import EditMutationModal from "./editMutationModal";

export default function MutationList({ val, getMutation }) {
	const deleteMutationModal = useDisclosure();
	const editMutationModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();
	const user = useSelector((state) => state.auth);

	console.log(val);

	async function deleteMutation() {
		try {
			await api.delete(`/stockmutation/${val.id}`);

			toast({
				title: "Mutation Deleted",
				description: "The mutation has been deleted successfully.",
				status: "success",
				position: "top",
				duration: 3000,
			});
			getMutation();
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
			<Flex
				padding={"7px"}
				borderBottom={"1px"}
				borderColor={"#E6EBF2"}
				gap={"7"}
				alignItems={"center"}
			>
				<Flex gap={"5px"} alignItems={"center"}>
					<Image
						w={"50px"}
						h={"50px"}
						borderRadius={"4px"}
						src={
							val?.stock?.product?.product_images[0]
								? val?.stock?.product?.product_images[0].product_image
								: null
						}
					/>
					<Flex w={"270px"}>{val?.stock?.product?.product_name}</Flex>
				</Flex>
				<Flex w={"195px"}>
					{`${val?.from_warehouse?.warehouse_name} - ${val?.to_warehouse?.warehouse_name}`}
				</Flex>
				<Flex w={"195px"}>{val?.mutation_code}</Flex>
				<Flex w={"100px"}>{val?.qty}</Flex>
				<Flex w={"100px"}>{val?.status}</Flex>
				<Flex w={"170px"}>
					{moment(val?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
				</Flex>
				<Menu>
					<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
						<Icon as={BiDotsHorizontalRounded} />
					</MenuButton>
					<MenuList>
						<MenuItem onClick={editMutationModal.onOpen}>Edit</MenuItem>
						<MenuItem onClick={deleteMutationModal.onOpen} color={"red"}>
							Cancel
						</MenuItem>
					</MenuList>
				</Menu>
				<EditMutationModal
					isOpen={editMutationModal.isOpen}
					onClose={editMutationModal.onClose}
					val={val}
					getMutation={getMutation}
				/>
				<DeleteMutationModal
					isOpen={deleteMutationModal.isOpen}
					onClose={deleteMutationModal.onClose}
					deleteMutation={deleteMutation}
				/>
			</Flex>
		</>
	);
}
