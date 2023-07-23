import { Button, Flex } from "@chakra-ui/react"
import { TimerControlsProps } from "../types"

function TimerControls({ onClick, data }: TimerControlsProps) {
	return (
		<Flex gap={{ base: 2, md: 5 }}>
			{data.map(({ value, display }) => (
				<Button
					key={value}
					colorScheme="blackAlpha"
					color="white"
					textTransform={"uppercase"}
					fontWeight="light"
					letterSpacing="wide"
					onClick={() => onClick(value)}
					fontSize={{ base: "2xl", md: "medium", lg: "3xl" }}
					size={{ base: "xs", md: "md", lg: "lg" }}
				>
					{display}
				</Button>
			))}
		</Flex>
	)
}

export default TimerControls
