import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddCategoryModal({ isOpen, onClose, getCategory }) {
	const toast = useToast();
	const nav = useNavigate();

	const formik = useFormik({
		initialValues: {
			category_name: "",
		},
		validationSchema: Yup.object().shape({
			category_name: Yup.string().required(),
		}),
		onSubmit: async () => {
			try {
				const { category_name } = formik.values;
				if (formik.isValid) {
					const res = await api().post("/category", formik.values);
					toast({
						title: `Add Category Success`,
						description: "The category has been added successfully.",
						status: "success",
						position: "top",
						duration: 3000,
					});
					getCategory();
					handleModalClose();
					nav("/admin/managedata");
				}
			} catch (error) {
				toast({
					title: error.response.data.message,
					status: "error",
					position: "top",
					duration: 3000,
				});
			}
		},
	});

	async function inputHandler(event) {
		const { value, id } = event.target;
		formik.setFieldValue(id, value);
	}

	const isAddButtonEnabled = formik.dirty && formik.isValid;

	const handleModalClose = () => {
		formik.resetForm();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader><Text fontSize={'md'} fontWeight={'bold'} fontFamily={'sans-serif'}>Add Category</Text></ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel><Text fontSize={'sm'} fontWeight={'bold'} fontFamily={'sans-serif'}>Category Name:</Text></FormLabel>
						<Input
							placeholder="e.g. TOPS"
							id="category_name"
							size={'sm'}
							onChange={inputHandler}
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter display={'flex'} justifyContent={'center'}>
					<Button
						onClick={formik.handleSubmit}
						colorScheme="green"
						w={'25%'}
						rounded={'sm'}
						size={'xs'}
						isDisabled={!isAddButtonEnabled}
					>
						Add Category
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
