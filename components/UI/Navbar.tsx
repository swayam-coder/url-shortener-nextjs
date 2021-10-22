import { Flex, Spacer, Text, Box, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react" 
import { FaSun, FaMoon } from "react-icons/fa"
import { useState } from "react"

export default function Navbar () {
    const [bgmode, setbgmode] = useState<boolean>(true)  // here true means light mode
    const { toggleColorMode } = useColorMode()
    const btncolor = useColorModeValue("gray.200", "red.600")

    function changeColor() {
        setbgmode(!bgmode)
        toggleColorMode()
    }

    return (
        <Flex justifyContent="space-between" p={5}> 
            <Box>
                <Text fontSize="xl">BookmyEvent</Text>
            </Box>
            <Box>
                <IconButton icon={bgmode? <FaMoon /> : <FaSun />} isRound={true} aria-label={bgmode? "toggle to dark mode" : "toggle to light mode"} onClick={changeColor}/>
            </Box>
        </Flex>
    )
}