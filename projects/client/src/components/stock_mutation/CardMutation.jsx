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
	Card,
	CardBody,
	Stack,
	Heading,
} from "@chakra-ui/react";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import DeleteMutationModal from "./DeleteMutationModal";
import EditMutationModal from "./EditMutationModal";

export default function MutationCard({ val, getMutation }) {
	const deleteMutationModal = useDisclosure();
	const editMutationModal = useDisclosure();
	const toast = useToast();
	const nav = useNavigate();

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
			<Card maxW="xs">
				<CardBody>
					<Image
						src={
							val?.stock?.product?.product_images[0]
								? val?.stock?.product?.product_images[0].product_image
								: null
						}
						borderRadius="lg"
					/>
					<Stack mt="6" spacing="2">
						<Flex>
							<Heading size="md">{val?.stock?.product?.product_name}</Heading>
							{val?.status === "PENDING" ? (
								<Menu>
									<MenuButton w={"25px"} h={"25px"} cursor={"pointer"}>
										<Icon as={BiDotsVerticalRounded} />
									</MenuButton>
									<MenuList>
										<MenuItem onClick={editMutationModal.onOpen}>Edit</MenuItem>
										<MenuItem
											onClick={deleteMutationModal.onOpen}
											color={"red"}
										>
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
							) : (
								<Icon
									w={"20px"}
									h={"20px"}
									color={"red"}
									as={AiOutlineCloseCircle}
								/>
							)}
						</Flex>
						<Flex flexDir={"column"}>
							<Flex w={"100px"}>{val?.status}</Flex>
							<Flex w={"100px"}>Amount: {val?.qty}</Flex>
							<Flex w={"195px"}>
								{`${val?.from_warehouse?.warehouse_name} - ${val?.to_warehouse?.warehouse_name}`}
							</Flex>
							<Flex w={"195px"}>{val?.mutation_code}</Flex>
							<Flex w={"170px"}>
								{moment(val?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
							</Flex>
						</Flex>
					</Stack>
				</CardBody>
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
			</Card>
		</>
	);
}
