import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"; // You can adjust the UI library as needed
import Navbar from "./Navbar";
import Footer from "./Footer";

// Sample data for demonstration
const warehouses = ["MMS Batam", "MMS Yogyakarta", "MMS Jakarta"];
const products = [
  { id: 1, name: "Product 1", category: "Category A" },
  { id: 2, name: "Product 2", category: "Category B" },
  // ... other products
];

export default function SalesReport() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0]);

  // You would have real sales data from your backend
  const salesData = [
    { warehouse: "Warehouse A", product: "Product 1", revenue: 1500 },
    { warehouse: "Warehouse B", product: "Product 2", revenue: 2000 },
    // ... other sales data
  ];

  return (
    <>
      <Navbar />
      <Box mt={"30px"} mb={"50px"}>
        <Box p={4}>
          <Box mb={4}>
            <Select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse} value={warehouse}>
                  {warehouse}
                </option>
              ))}
            </Select>
          </Box>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Revenue</Th>
              </Tr>
            </Thead>
            <Tbody>
              {salesData.map((sale) => (
                <Tr key={sale.product}>
                  <Td>{sale.product}</Td>
                  <Td>
                    {products.find((p) => p.name === sale.product)?.category}
                  </Td>
                  <Td>{sale.revenue}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="blue">
            Export Report
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
