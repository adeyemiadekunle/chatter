

import { sendPasswordResetEmail, Auth } from 'firebase/auth';
import { useState } from 'react';
import { Box, Modal, ModalBody, ModalContent, ModalOverlay, Heading, Text, Input, VStack, Button } from '@chakra-ui/react';

type PasswordResetProps = {
    isOpen: boolean;
    onClose: () => void;
    auth: Auth;
};

const PasswordReset = ({ isOpen, onClose, auth }: PasswordResetProps) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setErrorMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <VStack h={'70vh'}>
                            <Heading fontSize={'24px'} py={5}>
                                Chatter
                            </Heading>
                            <Box>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                <Button onClick={handlePasswordReset}>Reset Password</Button>
                                {errorMessage && <p>{errorMessage}</p>}
                            </Box>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default PasswordReset;
