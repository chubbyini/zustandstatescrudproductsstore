import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/products";

export const useProductStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create a new product
  createProduct: async (newProduct) => {
    set({ isLoading: true, error: null });
    if (!newProduct.name || !newProduct.price) {
      set({ error: "Name and price are required", isLoading: false });
      return;
    }
    try {
      const response = await axios.post(API_URL, newProduct);
      set((state) => ({
        products: [...state.products, response.data.data],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Update a product
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? response.data.data : product,
        ),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: (id) => {
    return get().products.find((product) => product._id === id);
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
