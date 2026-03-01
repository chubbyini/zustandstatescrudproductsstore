import React from "react";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Button,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      px={4}
      py={2}
      w="100%"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Text
          as={RouterLink}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          bgGradient="linear(to-r, yellow.300, orange.300)"
          bgClip="text"
          _hover={{
            textDecoration: "none",
            bgGradient: "linear(to-r, yellow.400, orange.400)",
          }}
        >
          Product Store
        </Text>

        <HStack spacing={4} align="center">
          <Button
            as={RouterLink}
            to="/create"
            colorScheme="whiteAlpha"
            size="sm"
          >
            <AddIcon />
          </Button>
          <Button onClick={toggleColorMode} variant="ghost" size="sm">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
