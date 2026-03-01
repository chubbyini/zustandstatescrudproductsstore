import React, { useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/productStore";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const toast = useToast();
  const { products, isLoading, fetchProducts, deleteProduct } =
    useProductStore();

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(deleteId);
      toast({
        title: "Product deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading mb={6} textAlign="center">
        Products
      </Heading>
      {products.length === 0 ? (
        <Center>
          <Text>No products found</Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </SimpleGrid>
      )}

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default HomePage;
