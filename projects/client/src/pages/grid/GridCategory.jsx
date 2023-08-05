import React from 'react';
import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import {RiTShirt2Line} from "react-icons/ri";
import {PiPants} from "react-icons/pi";
import {FaRedhat} from "react-icons/fa";
import {BsHandbag} from "react-icons/bs";

const GridCategory = () => {
    return (
        <>
            <Grid templateColumns='repeat(4, 1fr)' gap={0}>
                <GridItem w='100%' h='120' bg='white' border={'1px solid gray'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={4} cursor={'pointer'}>
                        <VStack>
                            <RiTShirt2Line size={'50px'}/>
                                <Text fontSize={'16px'} fontWeight={'bold'}>
                                    TOPS
                                </Text>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='120' bg='white' border={'1px solid gray'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={4} cursor={'pointer'}>
                        <VStack>
                            <PiPants size={'50px'}/>
                                <Text fontSize={'16px'} fontWeight={'bold'}>
                                    BOTTOMS
                                </Text>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='120' bg='white' border={'1px solid gray'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={4} cursor={'pointer'}>
                        <VStack>
                            <FaRedhat size={'50px'}/>
                                <Text fontSize={'16px'} fontWeight={'bold'}>
                                    HEADWEARES
                                </Text>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem w='100%' h='120' bg='white' border={'1px solid gray'}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} p={4} cursor={'pointer'}>
                        <VStack>
                            <BsHandbag size={'50px'}/>
                                <Text fontSize={'16px'} fontWeight={'bold'}>
                                    ACCESORIES
                                </Text>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
}

export default GridCategory;


