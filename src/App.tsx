import { useEffect, useState } from "react"
import { Button, IconButton, Flex, Text, Heading } from "@chakra-ui/react"
import { ToastContainer, toast } from "react-toastify"
import { RxReset, RxSpeakerOff, RxSpeakerLoud } from "react-icons/rx"
import { formatTime, playNotification } from "./utils"
import { initialTimer } from "./config"
import music from "./assets/track1.mp3"
import reactLogo from "./assets/react.svg"
import "react-toastify/dist/ReactToastify.css"

const notify = (msg: string) =>
	toast.error(msg, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		draggable: true,
		theme: "colored"
	})

function App() {
	const [time, setTime] = useState(0)
	const [timerStart, setTimerStart] = useState(false)
	const [audio] = useState(new Audio(music)) // This will expose the music
	const [isMuted, setIsMuted] = useState(false)

	// Toggles when the user clicks the start button
	const toggleTimer = () => {
		if (!time) {
			notify(" You need to reset the timer 😆 ")
			return
		}
		setTimerStart(!timerStart)
	}

	// Runs whenever the user mutes
	useEffect(() => {
		isMuted ? (audio.muted = true) : (audio.muted = false)
	}, [isMuted])

	// Runs when the page loads
	useEffect(() => {
		// console.log(timerStart)
		document.title = "🍅 Pomodoro Timer"
	}, [])

	useEffect(() => {
		// This loop will only run when the timer is running
		function loopAudio() {
			if (timerStart && time) {
				audio.loop = true
				audio.play()
				notify("Pomodoro started 🏁")
				playNotification()
			} else {
				audio.pause()
			}
		}
		loopAudio()
	}, [timerStart])

	// This will run the code every 1000 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			if (timerStart) {
				if (time > 0) {
					setTime(time - 1)
				} else if (time === 0 && timerStart) {
					playNotification()
					audio.pause()
					notify(" Nice one! You don finish! 🎉")
					clearInterval(interval)
				}
			}
		}, 1000)
		document.title = `${formatTime(time)} - Remaining`
		return () => clearInterval(interval)
	}, [timerStart, time])

	return (
		<Flex
			bgGradient="linear(to-tl, red.800, red.900)"
			minH="100vh"
			justifyContent="center"
			alignItems="center"
			backdropFilter="auto"
			backdropBlur="8px"
			flexDirection="column"
			gap={6}
		>
			<Heading
				color="white"
				fontWeight="thin"
				letterSpacing="1.2px"
				textTransform={"uppercase"}
			>
				Pomodoro timer
			</Heading>

			<Flex
				bgGradient="linear(to-bl, red.700, red.600)"
				p={12}
				h="100%"
				rounded="2xl"
				alignItems="center"
				flexDirection="column"
				shadow="sm"
			>
				<Flex gap="5">
					{initialTimer.map(({ value, display }) => (
						<Button
							key={value}
							colorScheme="blackAlpha"
							color="white"
							textTransform={"uppercase"}
							fontWeight="light"
							letterSpacing="wide"
							onClick={() => {
								setTimerStart(false)
								setTime(value)
							}}
						>
							{display}
						</Button>
					))}
				</Flex>
				<Text
					fontWeight="bold"
					fontSize="9xl"
					color="white"
					fontFamily="Montserrat"
					letterSpacing={"wider"}
				>
					{formatTime(time)}
				</Text>

				<Flex gap={30} alignItems="center">
					<IconButton
						aria-label="reset timer"
						title="reset timer"
						icon={<RxReset />}
						colorScheme="blackAlpha"
						onClick={() => {
							setTimerStart(false)
							setTime(initialTimer[0].value)
						}}
					/>
					<Button
						py="7"
						px="10"
						fontSize={"2xl"}
						textTransform="uppercase"
						letterSpacing="wider"
						colorScheme={timerStart ? "gray" : "red"}
						onClick={toggleTimer}
					>
						{!timerStart ? "Start" : `${time === 0 ? "Done" : "Pause"}`}
					</Button>
					<IconButton
						aria-label="Turn sounds off"
						title="Turn sounds off"
						colorScheme="blackAlpha"
						icon={isMuted ? <RxSpeakerOff /> : <RxSpeakerLoud />}
						onClick={() => setIsMuted(!isMuted)}
					/>
				</Flex>
			</Flex>
			<ToastContainer />
		</Flex>
	)
}

export default App
