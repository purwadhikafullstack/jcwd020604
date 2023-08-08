import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Select,
  Icon,
  Input,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <>
      <Center fontSize={"20px"} fontWeight={"bold"} mt={"100px"}>
        #MMS
      </Center>

      <Center mt={"50px"} gap={"50px"}>
        <Flex
          border={"solid grey 1px"}
          borderTop={"none"}
          borderLeft={"none"}
          borderBottom={"none"}
          h={"800px"}
          w={"570px"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Box fontSize={"18px"} fontWeight={"bold"}>
            Shipping address information
          </Box>
          <Box mt={"5px"}>Name</Box>
          <Input
            placeholder="Enter your name"
            w={"500px"}
            borderRadius={"none"}
          ></Input>
          <Box mt={"5px"}>Address</Box>
          <Input
            placeholder="Enter your address"
            w={"500px"}
            borderRadius={"none"}
          ></Input>
          <Box mt={"5px"}>Apartment, room number, etc. (optional)</Box>
          <Input
            placeholder="Write here"
            w={"500px"}
            borderRadius={"none"}
          ></Input>
          <Box mt={"5px"}>City</Box>
          <Input
            placeholder="Enter your city"
            w={"500px"}
            borderRadius={"none"}
          ></Input>
          <Box mt={"5px"}>Province</Box>
          <Box display={"flex"} gap={"10px"}>
            <Select
              border={"solid black 1px"}
              w={"245px"}
              borderRadius={"none"}
            >
              <option>Riau Islands</option>
            </Select>
            <Input
              border={"solid black 1px"}
              placeholder="Postal Code"
              borderRadius={"none"}
              w={"245px"}
            ></Input>
          </Box>
          <Box>Phone</Box>
          <Input
            placeholder={"Enter your phone number"}
            w={"500px"}
            borderRadius={"none"}
          ></Input>
          <Box
            mt={"50px"}
            display={"flex"}
            justifyContent={"space-between"}
            w={"500px"}
          >
            <Link to={`/cart`}>
              <Button w={"200px"} bgColor={"#ffe401"} borderRadius={"none"}>
                Return to cart
              </Button>
            </Link>
            <Button w={"200px"} bgColor={"#ffe401"} borderRadius={"none"}>
              Continue to shipping
            </Button>
          </Box>
          <Box mt={"50px"} border={"solid black 1px"} w={"515px"} h={"170px"}>
            <Box display={"flex"} alignItems={"center"}>
              <Box w={"100px"} padding={"10px"}>
                Name
              </Box>
              <Box>Muhammad maulana</Box>
            </Box>
            <hr
              style={{
                border: "1px solid grey ",
                width: "490px",
                marginLeft: "10px",
              }}
            />
            <Box display={"flex"} alignItems={"center"}>
              <Box w={"100px"} padding={"10px"}>
                Address
              </Box>
              <Box>Perumahan villamas blok c8 no 18</Box>
            </Box>
            <hr
              style={{
                border: "1px solid grey ",
                width: "490px",
                marginLeft: "10px",
              }}
            />
            <Box display={"flex"} alignItems={"center"}>
              <Box w={"100px"} padding={"10px"}>
                Method
              </Box>
              <Box>Jne express - Rp.35,000</Box>
            </Box>
          </Box>
        </Flex>
        <Flex w={"350px"} flexDir={"column"} h={"800px"}>
          <Box fontWeight={"bold"}>Delivery1</Box>
          <Box
            w={"350px"}
            mt={"20px"}
            justifyContent={"space-between"}
            display={"flex"}
            alignItems={"center"}
          >
            <Image
              width={"100px"}
              h={"100px"}
              src="https://fr2.tokyo/cdn/shop/files/1080000002208-0029-02.jpg?v=1688983706"
            />
            <Box fontSize={"12px"}>Flocky Print T-shirt</Box>
            <Box fontWeight={"bold"} fontSize={"13px"}>
              Rp.350,000
            </Box>
          </Box>
          <Box
            w={"350px"}
            mt={"20px"}
            justifyContent={"space-between"}
            display={"flex"}
            alignItems={"center"}
          >
            <Image
              width={"100px"}
              h={"100px"}
              src="https://fr2.tokyo/cdn/shop/products/1080000001540-0029-01.jpg?v=1628673881"
            />
            <Box fontSize={"12px"}>Rip Shorts pants</Box>
            <Box fontWeight={"bold"} fontSize={"13px"}>
              Rp.150,000
            </Box>
          </Box>
          <hr
            style={{
              border: "1px solid grey",
              width: "350px",
              marginTop: "30px",
            }}
          />
          <Box
            mt={"30px"}
            w={"350px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box fontSize={"14px"}>Subtotal</Box>
            <Box fontWeight={"bold"} fontSize={"15px"}>
              Rp.500,000
            </Box>
          </Box>
          <Box
            mt={"10px"}
            w={"350px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box fontSize={"14px"}>Shipping fee</Box>
            <Box fontWeight={"bold"} fontSize={"15px"}>
              Rp.35,000
            </Box>
          </Box>
          <hr
            style={{
              border: "1px solid grey",
              width: "350px",
              marginTop: "30px",
            }}
          />
          <Box
            mt={"10px"}
            w={"350px"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Box fontSize={"16px"}>Total</Box>
            <Box fontWeight={"bold"} fontSize={"17px"}>
              Rp.535,000
            </Box>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
