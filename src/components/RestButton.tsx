import { IconButton } from "@chakra-ui/react"
import { RxReset } from "react-icons/rx"

interface RestButtonProps {
	handleOnClick: () => void
}

export default function RestButton({ handleOnClick }: RestButtonProps) {
	return (
		<IconButton
			aria-label="reset timer"
			title="reset timer"
			icon={<RxReset />}
			colorScheme="blackAlpha"
			onClick={handleOnClick}
		/>
	)
}
