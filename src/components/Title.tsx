import { Heading } from "@chakra-ui/react"
import { TitleProps } from "../types"

function Title({ content }: TitleProps) {
	return (
		<Heading
			color="white"
			fontWeight="thin"
			letterSpacing="1.2px"
			textTransform={"uppercase"}
		>
			{content}
		</Heading>
	)
}

export default Title
