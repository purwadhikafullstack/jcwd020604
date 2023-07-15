import { Flex } from "@chakra-ui/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loader() {
	return (
		<Flex className="cards">
			<SkeletonTheme color={"#202020 "} highlightColor={"#444"}>
				<Skeleton height={300} duration={2} />
			</SkeletonTheme>
		</Flex>
	);
}
