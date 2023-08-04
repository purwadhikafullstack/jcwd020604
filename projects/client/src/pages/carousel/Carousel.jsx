import { useState, useEffect } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Product1 from "../../assets/product photos/ACCESORIES/chingco1.jpg";
import Product2 from "../../assets/product photos/BOTTOMS/Pants1.jpg";
import Product3 from "../../assets/product photos/HEADWEARS/BermudaFurHat1.jpg";
import Product4 from "../../assets/product photos/TOPS/BouncingRabbitLongsleeveT-shirt1.jpg";

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export default function Carousel() {
	// As we have used custom buttons, we need a reference variable to
	// change the state
	const [slider, setSlider] = useState(<Slider />);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

  const card = [
    Product1, Product2, Product3, Product4
  ]

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	const top = useBreakpointValue({ base: "90%", md: "50%" });
	const side = useBreakpointValue({ base: "30%", md: "10px" });

	return (
		<Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt />
      </IconButton>
			{/* Slider */}
			<Slider {...settings} ref={(slider) => setSlider(slider)}>
				{card.map((url, index) => (
					<Box
						key={index}
						height={windowWidth >= 600 ? "3xl" : "xl"}
						position="relative"
						backgroundPosition="center"
						backgroundRepeat="no-repeat"
						backgroundSize="cover"
						backgroundImage={`url(${url})`}
					/>
				))}
			</Slider>
		</Box>
	);
}
