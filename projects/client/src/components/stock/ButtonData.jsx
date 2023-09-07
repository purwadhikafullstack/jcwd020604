import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Button,
} from "@chakra-ui/react";

export default function ButtonData({
	user,
	addCategoryModal,
	addWarehouseModal,
	editCategoryModal,
	editWarehouseModal,
	deleteCategoryModal,
	deleteWarehouseModal,
}) {
	return (
		<>
			{user.role === "ADMIN" ? (
				<Flex gap={"15px"}>
					<Menu>
						<MenuButton as={Button} size={'xs'} rounded={'sm'}>
							<AddIcon />
						</MenuButton>
						<MenuList>
							<MenuItem onClick={addCategoryModal.onOpen}>
								Add Category
							</MenuItem>
							<MenuItem onClick={addWarehouseModal.onOpen}>
								Add Warehouse
							</MenuItem>
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton as={Button} size={'xs'} rounded={'sm'}>
							<EditIcon />
						</MenuButton>
						<MenuList fontSize={'xs'}>
							<MenuItem onClick={editCategoryModal.onOpen} fontWeight={'bold'} color={"green"} _hover={{color:'#00cc00'}}>
								View / Edit Category
							</MenuItem>
							<MenuItem onClick={editWarehouseModal.onOpen} fontWeight={'bold'} color={"green"} _hover={{color:'#00cc00'}}>
								View / Edit Warehouse
							</MenuItem>
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton as={Button} size={'xs'} colorScheme="red" color={"white"} rounded={'sm'}>
							<DeleteIcon />
						</MenuButton>
						<MenuList fontSize={'xs'}>
							<MenuItem onClick={deleteCategoryModal.onOpen} fontWeight={'bold'} color={"red"} _hover={{color: '#ff4d4d'}}>
								Delete Category
							</MenuItem>
							<MenuItem onClick={deleteWarehouseModal.onOpen} fontWeight={'bold'} color={"red"} _hover={{color: '#ff4d4d'}}>
								Delete Warehouse
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			) : null}
		</>
	);
}
