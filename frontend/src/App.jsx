import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/Createpage";
import UpdateProduct from "./pages/UpdateProduct";
import Navbar from "./components/Navbar";

export default function App() {
  const navbarBg = useColorModeValue("blue.500", "gray.800");
  const pageBg = useColorModeValue("gray.100", "gray.900");

  return (
    <div>
      <Box minH="100vh" bg={pageBg}>
        <Box bg={navbarBg}>
          <Navbar />
        </Box>
        <Box maxW="1200px" mx="auto" p={4}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
