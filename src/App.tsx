import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"
import { getMilliseconds, getSeconds, milliseconds } from "date-fns"
import {
	Button,
	Box,
	Flex,
	Text,
	Heading,
	Grid,
	Spacer,
	Progress
} from "@chakra-ui/react"
import { formattedTime, playNotification } from "./utils"
import music from "./assets/track1.mp3"

function App() {
	const [time, setTime] = useState(0)
	const [timerStart, setTimerStart] = useState(false)
	const [audio, setAudio] = useState(new Audio(music))
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(false)

	// create/set the times
	const buttons = [
		{
			// value: 1.5e3,
			value: 3,
			display: "Pomodoro"
		},
		{
			value: 300,
			display: "Short Brake"
		},

		{
			value: 900,
			display: "Long Brake"
		}
	]

	// Toggles whenever the user clicks the start button
	const toggleTimer = () => {
		if (!time) return // Disable clicks if "NO" timer is set
		setTimerStart(!timerStart)
	}

	// Runs whenever the user muts
	useEffect(() => {
		isMuted ? (audio.muted = true) : (audio.muted = false)
	}, [isMuted])

	// Runs when the page loads
	useEffect(() => {
		console.log(timerStart)
		document.title = "Pomodoro Timer"
	}, [])

	useEffect(() => {
		// This loop will only run when the timer is running
		function loopAudio() {
			if (timerStart && time) {
				audio.loop = true
				audio.play()
			} else {
				audio.pause()
			}
		}
		loopAudio()
	}, [timerStart])

	useEffect(() => {
		const interval = setInterval(() => {
			if (timerStart) {
				if (time > 0) {
					setTime(time - 1)
				} else if (time === 0 && timerStart) {
					playNotification(timerStart)
					audio.pause()
					clearInterval(interval)
				}
			}
		}, 1000)
		document.title = `${formattedTime(time)} - Remaining`
		return () => clearInterval(interval)
	}, [timerStart, time])

	return (
		<Flex
			// bg="gray.600"
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
					{buttons.map(({ value, display }) => (
						<Button
							key={value}
							colorScheme="whiteAlpha"
							color="white"
							textTransform={"uppercase"}
							fontWeight="light"
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
					{formattedTime(time)}
				</Text>
				<Flex gap={30}>
					<Button
						py="7"
						px="10"
						fontSize={"2xl"}
						textTransform="uppercase"
						letterSpacing="wider"
						colorScheme={timerStart ? "gray" : "red"}
						onClick={toggleTimer}
					>
						{!timerStart ? "Start" : `${time === 0 ? "Stop" : "Pause"}`}
					</Button>
					{/* TODO: Add Button to reset timer */}

					<Button
						onClick={() => setIsMuted(!isMuted)}
						py="7"
						px="10"
						fontSize={"2xl"}
						textTransform="uppercase"
						letterSpacing="wider"
					>
						{isMuted ? "Unmute" : "Mute"}
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default App
