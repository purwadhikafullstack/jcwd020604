import {
  Box,
  Button,
  Center,
  Image,
  Link,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [subTotal, setSubTotal] = useState(0);
  const nav = useNavigate();
  const toast = useToast();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const user = useSelector((state) => state.auth);
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState(0);

  async function getOrder() {
    const res = await api.get(`/userOrders/orders/` + user.id, {
      params: {
        page: page,
      },
    });
    const { rows, count } = res.data;
    setOrder(rows);
    setTotalPage(Math.ceil(count / 3));
  }
  async function cancelOrder() {
    try {
      const res = await api.delete(`/userOrders/orders/` + orderId);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (orderId) cancelOrder();
  }, [orderId]);

  const orderDetail = async () => {
    try {
      // Prepare the order data
      const orderData = {
        // qty,
        // price,
        // stock_id,
        // order_id,
      };

      // Send the order data to the backend
      const response = await api.post("/order-detail", orderData);

      // Handle the response
      const responseData = response.data;
      console.log(responseData);

      // Show a success message to the user
      toast({
        title: "Order detail has been created",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: false,
      });

      console.log("Order has been created");
    } catch (error) {
      // Handle any errors that might occur
      console.error(error);

      // Show an error message to the user
      toast({
        title: "An error occurred while creating the order",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
  };

  // async function getcart() {
  //   console.log(user.id);
  //   const res = await api.get(`/cart/` + user.id);
  //   setProduct(res.data);
  // }
  // console.log(product);
  const calculateTotal = () => {
    let total = 0;
    product.forEach((val) => {
      total += val.subtotal;
    });
    return total;
  };

  useEffect(() => {
    const total = calculateTotal();
    setSubTotal(total);
  }, [product]);

  useEffect(() => {
    getOrder();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  return (
    <>
      <Navbar />
      <Center mb={"50px"} mt={"50px"}>
        <Box w={"900px"} h={"800px"}>
          <Box display={"flex"} justifyContent={"space-between"} mt={"10px"}>
            <Image
              w={"80px"}
              h={"35px"}
              src="https://kabarpolisi.com/wp-content/uploads/2017/03/04-07-24-LogoBankmandiriButtonBackgroudTransparentPNG.png"
            />
            <Box mr={"10px"}> Not yet paid</Box>
          </Box>
          <hr
            style={{
              marginTop: "10px",
            }}
          />
          {order.length
            ? order?.map((val) => (
                <>
                  <Box>
                    <Box
                      w={"900px"}
                      mt={"20px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                        <Image
                          width={"100px"}
                          h={"100px"}
                          src={
                            val.order_details[0].stock.product.product_images[0]
                              .product_image
                          }
                        />
                        <Box display={"flex"} flexDir={"column"} w={"500px"}>
                          <Box fontSize={17}>
                            {val.order_details[0].stock.product.product_name}{" "}
                            (Weight: {val.order_details[0].stock.product.weight}
                            )
                          </Box>
                          <Box
                            w={"22px"}
                            h={"22px"}
                            fontSize={14}
                            textAlign={"center"}
                            fontWeight={"bold"}
                          >
                            {val.order_details[0].qty}
                          </Box>
                        </Box>
                      </Box>

                      <Box fontWeight={"bold"} fontSize={"13px"} w={"100px"}>
                        Rp
                        {val.order_details[0].stock.product.price
                          ? val.order_details[0].stock.product.price.toLocaleString(
                              "id-ID"
                            )
                          : "Price Not Available"}
                        ,00
                      </Box>
                    </Box>
                    <Box>
                      <hr />
                    </Box>
                  </Box>

                  <Box
                    w={"900px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box></Box>
                    <Box display={"flex"} mt={"20px"} gap={"5px"}>
                      <Box>Amount to paid :</Box>
                      <Box fontWeight={"bold"}>
                        {" "}
                        Rp{" "}
                        {val.total_price
                          ? val.total_price.toLocaleString("id-ID")
                          : "Price Not Available"}
                        ,00
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mt={"20px"}
                  >
                    <Box
                      fontSize={12}
                      display={"flex"}
                      gap={"5px"}
                      alignItems={"center"}
                    >
                      <Box>Pay before</Box>
                      <Box>August, 22 2023 16:15</Box>
                    </Box>
                    <Box display={"flex"} gap={"10px"}>
                      <Box>
                        <Button
                          w={"200px"}
                          bgColor={"#ffe401"}
                          borderRadius={"none"}
                          onClick={() => nav(`/payment/${val.id}`)}
                        >
                          Payment now
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          w={"200px"}
                          bgColor={"white"}
                          border={"1px solid grey"}
                          borderRadius={"none"}
                          onClick={() => {
                            setOrderId(val.id);
                          }}
                        >
                          Cancel order
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </>
              ))
            : null}
        </Box>
      </Center>
      <ButtonGroup
        p={3}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        size={"xs"}
        colorScheme={"cyan"}
      >
        {page === 1 || order?.length === 0 ? null : (
          <Button
            onClick={() => {
              handlePageChange(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Previous
          </Button>
        )}
        {page === totalPage || order?.length === 0 ? null : (
          <Button
            onClick={() => {
              handlePageChange(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Next
          </Button>
        )}
      </ButtonGroup>
      <Footer />
    </>
  );
}
