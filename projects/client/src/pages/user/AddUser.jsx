import React from 'react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    FormControl, 
    FormLabel, 
    Input, 
    FormHelperText, 
    Container, 
    Select, 
    Button, 
    useToast, 
    HStack, 
    InputGroup,
    InputRightElement
} 
from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
    fullname: Yup.string().min(6, "Full name min 6 character").required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Must contain at least one special character"
      )
      .min(8, "Password minimum 8 character")
    .required('Password is required'),
});

const AddUser = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const saveUser = async (values) => {
        try {
            await api.post(`${process.env.REACT_APP_API_BASE_URL}/auth/users`, values);
            toast({
                title:"User has been created",
                status:"success",
                duration:3000,
                isClosable:false
            });
            navigate("/user_list");
        } catch (error) {
            toast({
                title:"There is an error when inputting user",
                status:'error',
                duration:3000,
                isClosable:false
            });
            console.log(error);
        }
    }

    return (
        <Container mt={2}>
            <Formik
                initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    verified: true,
                    role: 'W_ADMIN'
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    saveUser(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field name="fullname">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} type="text" placeholder='Input name'/>
                                    <ErrorMessage name="fullname" component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input {...field} type="email" placeholder='Type your email'/>
                                    <ErrorMessage name="email" component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input {...field} type="password" placeholder="Password" />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => setShowPassword((showPassword) => !showPassword)}
                                            >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                         </Button>
                        </InputRightElement>
                                    </InputGroup>
                                    <ErrorMessage name="password" component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="verified">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Verified</FormLabel>
                                    <Select {...field} placeholder="Select Verification Status">
                                        <option value={true}>Verified</option>
                                        <option value={false}>Unverified</option>
                                    </Select>
                                    <ErrorMessage name="verified" component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="role">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Role</FormLabel>
                                    <Select {...field} placeholder="Select Role">
                                        <option value={'W_ADMIN'}>Warehouse Admin</option>
                                        <option value={'USER'}>User</option>
                                    </Select>
                                    <ErrorMessage name="role" component={FormHelperText} />
                                </FormControl>
                            )}
                        </Field>
                        <Box mt={2}>
                            <HStack>
                                <Button size={'sm'} w={'20%'} type="submit" colorScheme="twitter" isLoading={isSubmitting}>
                                    Save
                                </Button>
                                <Button size={'sm'} w={'20%'} colorScheme="orange" onClick={() => navigate("/user_list")}>
                                    Cancel
                                </Button>
                            </HStack>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default AddUser;
