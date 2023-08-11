import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../css/maps.css";
import { api } from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Center, Flex, Grid } from "@chakra-ui/react";

export default function WarehouseMap() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
	});
	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return <Maps />;
}

function Maps() {
	const [warehouse, setWarehouse] = useState([]);

	useEffect(() => {
		getWarehouse();
	}, []);

	async function getWarehouse() {
		const res = await api.get("/warehouse");
		setWarehouse(res.data);
	}
	const center = useMemo(() => ({ lat: -6.2094, lng: 106.8269 }), []);

	return (
		<>
			<Navbar />
			<Center fontWeight={700} fontSize={"4xl"} pb={"10px"}>
				All Store Maps
			</Center>
			<Center flexWrap={"wrap"} pb={"30px"}>
				<Box margin={"0px 20px 30px"}>
					<GoogleMap
						zoom={5}
						center={center}
						mapContainerClassName="map-container"
					>
						{warehouse.map((val) => (
							<Marker
								key={val.id}
								position={{
									lat: parseFloat(val.latitude),
									lng: parseFloat(val.longitude),
								}}
							/>
						))}
					</GoogleMap>
				</Box>
				<Box border={"1px"} p={"15px"} borderRadius={"15px"}>
					<Center fontWeight={700} fontSize={"2xl"} pb={"20px"}>
						Store Address
					</Center>
					<Grid templateColumns={"repeat(2, 1fr)"} gap={"10px"}>
						{warehouse?.map((val) => (
							<Box
								border={"1px"}
								borderRadius={"15px"}
								w={"100%"}
								maxW={"350px"}
								padding={"10px"}
							>
								<Flex fontWeight={600}>{val.warehouse_name}</Flex>
								<Flex>
									{val.address}, {val.district}, {val.city}, {val.province}.
								</Flex>
								<Flex>{val.phone_number} </Flex>
							</Box>
						))}
					</Grid>
				</Box>
			</Center>
			<Footer />
		</>
	);
}
