import { IconButton } from "@chakra-ui/react"
import { RxPause, RxPlay, RxStop } from "react-icons/rx"
import { useToast } from "@chakra-ui/react"

interface PlayButtonProps {
	isStarted: boolean
	currentTime: number
	handleOnClick: () => void
}

export default function PlayButton({
	isStarted,
	currentTime,
	handleOnClick
}: PlayButtonProps) {
	return (
		<IconButton
			aria-label="Play or Pause timer"
			title="Play or Pause timer"
			colorScheme="blackAlpha"
			icon={
				!isStarted ? <RxPlay /> : currentTime === 0 ? <RxStop /> : <RxPause />
			}
			onClick={handleOnClick}
		/>
	)
}
