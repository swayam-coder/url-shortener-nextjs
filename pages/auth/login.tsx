import React from "react"
import { Container, VStack, FormControl, FormLabel, FormErrorMessage, Heading,Box, Button ,Input, Flex, SimpleGrid, GridItem, useColorModeValue } from "@chakra-ui/react"
import Navbar from "../../components/UI/Navbar"
import { Formik } from "formik"
import { schema } from "../../validation/auth."

export default function Login(): JSX.Element {
    const btnclr = useColorModeValue("gray.200", "grey.600")

    return (
        <>
        <Navbar />
        <Container p={25} bgGradient="linear(to-tr, green.300, yellow.200)">
            <VStack p={4} spacing="20px">
                <Heading color="white">
                    Register
                </Heading>
                <Formik 
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: null,
                        confirmpassword: null
                    }}
                    onSubmit={
                        (values) => {
                            console.log(values)
                        }
                    }
                    validationSchema={schema}
                >
                    {
                    (formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <SimpleGrid columns={2} columnGap="5px" spacing="20px">
                                <GridItem>
                                <FormControl isInvalid={formik.touched.firstname && Boolean(formik.errors.firstname)}>
                                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                                    <Input 
                                        id="firstname"
                                        placeholder="Enter Firstname" 
                                        name="firstname" type="text" 
                                        variant="outline" color="black" 
                                        borderColor="white"
                                    />
                                    <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
                                </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl isInvalid={formik.touched.lastname && Boolean(formik.errors.lastname)}>
                                    <FormLabel htmlFor="lastname">Lastname</FormLabel>
                                    <Input 
                                        id="lastname"
                                        placeholder="Enter Lastname" 
                                        name="lastname" type="text" 
                                        variant="outline" 
                                        borderColor="white"
                                    />
                                    </FormControl>
                                    <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
                                </GridItem>
                                <GridItem colSpan={2}>
                                <FormControl isInvalid={formik.touched.email && Boolean(formik.errors.email)}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        id="email" 
                                        placeholder="Enter Email" 
                                        name="email" type="email" 
                                        variant="outline" 
                                        borderColor="white"
                                    />
                                    </FormControl>
                                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                                </GridItem>
                                <GridItem>
                                <FormControl isInvalid={formik.touched.password && Boolean(formik.errors.password)}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input
                                        id="password"
                                        placeholder="Enter Password" 
                                        name="password" type="password" 
                                        variant="outline" 
                                        borderColor="white"
                                    />
                                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                <FormControl isInvalid={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}>
                                    <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
                                    <Input 
                                        id="confirmpassword"
                                        placeholder="Confirm Password" 
                                        name="confirmpasword"
                                        type="password" 
                                        variant="outline" 
                                        borderColor="white"
                                        errorBorderColor="red.400"
                                    />
                                    <FormErrorMessage>{formik.errors.confirmpassword}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <Button w="100%" bgColor={btnclr} type="submit">
                                        Register
                                    </Button>
                                </GridItem>
                            </SimpleGrid>
                        </form>
                        )
                    }
                    
                </Formik>
            </VStack>
        </Container>
        </>
    )
}
