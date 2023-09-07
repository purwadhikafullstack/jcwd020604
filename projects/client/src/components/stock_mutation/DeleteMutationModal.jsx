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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function DeleteMutationModal({
	isOpen,
	onClose,
	deleteMutation,
}) {
	const [confirmationText, setConfirmationText] = useState("");

	useEffect(() => {
		if (!isOpen) {
			setConfirmationText("");
		}
	}, [isOpen]);

	const handleConfirmationTextChange = (event) => {
		setConfirmationText(event.target.value);
	};

	const isDeleteButtonEnabled = confirmationText.trim() === "CANCEL";

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize={'md'} fontWeight={'bold'}>Cancel Mutation</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl mt={4}>
						<FormLabel fontSize={'sm'}>Type "CANCEL" to confirm:</FormLabel>
						<Input
							type="text"
							size={'sm'}
							value={confirmationText}
							onChange={handleConfirmationTextChange}
							placeholder="Type 'CANCEL' here"
						/>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="red"
						rounded={'sm'}
						size={'xs'}
						isDisabled={!isDeleteButtonEnabled}
						onClick={deleteMutation}
					>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
