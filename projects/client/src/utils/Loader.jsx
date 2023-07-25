import { Flex } from "@chakra-ui/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loader() {
	return (
		<div>
			<SkeletonTheme color={"#202020 "} highlightColor={"#444"}>
				<Skeleton height={300} duration={2} />
			</SkeletonTheme>
		</div>
	);
}
