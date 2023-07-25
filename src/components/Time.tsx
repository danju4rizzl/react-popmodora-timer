import { Text } from "@chakra-ui/react"
import { formatTime } from "../utils"

interface TimeProps {
	currentTime: number
}

export default function Time({ currentTime }: TimeProps) {
	return (
		<Text
			fontWeight="bold"
			fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }}
			color="white"
			fontFamily="Montserrat"
			letterSpacing="wider"
		>
			{formatTime(currentTime)}
		</Text>
	)
}
