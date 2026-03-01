import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/productStore";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateProduct, getProductById, fetchProducts, isLoading } =
    useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      // Ensure we have products loaded
      await fetchProducts();
      const product = getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
        });
      } else {
        toast({
          title: "Product not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
      setIsFetching(false);
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateProduct(id, formData);

      toast({
        title: "Product updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error updating product",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return (
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading mb={6} textAlign="center">
        Update Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isUpdating || isLoading}
          >
            Update Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UpdateProduct;
