import React from "react";
import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDeleteClick }) => {
  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
        transition: "all 0.3s ease",
      }}
      cursor="pointer"
    >
      <Image
        objectFit="cover"
        w={{ base: "100%", md: "200px" }}
        h={{ base: "200px", md: "auto" }}
        maxH={{ base: "200px", md: "200px" }}
        src={product.image}
        alt={product.name}
        fallbackSrc="https://placehold.co/200x200?text=No+Image"
        onError={(e) => {
          e.target.src = "https://placehold.co/200x200?text=No+Image";
        }}
      />
      <CardBody flex="1" p={4}>
        <Text fontSize="xs" color="gray.500" mb={1}>
          PRD-{product._id.slice(0, 8).toUpperCase()}
        </Text>
        <Heading size="md" mb={2} noOfLines={2}>
          {product.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold" mb={3}>
          ${parseFloat(product.price).toFixed(2)}
        </Text>
        <HStack spacing={2} mt={3} flexWrap="wrap">
          <Button
            as={Link}
            to={`/update/${product._id}`}
            size="sm"
            colorScheme="blue"
            flex="1"
            minW="fit-content"
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => onDeleteClick(product._id)}
            flex="1"
            minW="fit-content"
          >
            Delete
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
