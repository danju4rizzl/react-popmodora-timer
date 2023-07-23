import { ChangeEvent, useEffect, useState } from "react"
import {
	Button,
	IconButton,
	Flex,
	Text,
	Select,
	Box,
	useToast
} from "@chakra-ui/react"
import { RxReset, RxSpeakerOff, RxSpeakerLoud } from "react-icons/rx"
import { formatTime, playNotification } from "./utils"
import { initialTimer, allTracks } from "./config"
// import music from "./assets/track1.mp3"
import "react-toastify/dist/ReactToastify.css"
import Title from "./components/Title"
import TimerControls from "./components/TimerControls"

function App() {
	const [time, setTime] = useState(0)
	const [timerStart, setTimerStart] = useState(false)
	const [trackState, setTrackState] = useState(allTracks[0].trackUrl)
	const [isMuted, setIsMuted] = useState(false)
	const [audio, setAudio] = useState(new Audio(allTracks[0].trackUrl)) // This will expose the music
	const toast = useToast()

	const handleTrackChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedTrack = e.target.value
		console.log(selectedTrack)
		setTrackState(selectedTrack)
		setAudio(new Audio(selectedTrack))
	}

	// Deejay continue here you to refactor the timer controls
	const handleTimerControl = (e: number) => {
		setTimerStart(false)
		setTime(e)
	}

	// Toggles when the user clicks the start button
	const toggleTimer = () => {
		if (!time) {
			toast({
				title: "Reset the timer ",
				status: "warning",
				duration: 9000,
				isClosable: true
			})
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
		document.title = "🍅 Pomodoro Timer"
	}, [])

	// This loop will only run when the timer is running
	useEffect(() => {
		function loopAudio() {
			if (timerStart && time) {
				audio.loop = true
				audio.play()
				toast({
					title: "Timer started",
					status: "info",
					duration: 9000,
					isClosable: true
				})
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
					toast({
						title: "Finished",
						description: "Nice one! You don finish! 🎉",
						status: "success",
						duration: 9000,
						isClosable: true
					})
					clearInterval(interval)
				}
			}
		}, 1000)
		document.title = `${formatTime(time)} - Remaining`
		return () => clearInterval(interval)
	}, [timerStart, time])

	return (
		<>
			<Flex
				bgGradient="linear(to-tl, red.800, red.900)"
				minH="100vh"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				gap={6}
			>
				<Title content="Pomodoro timer" />
				<Flex
					bgGradient="linear(to-b, red.700, red.900)"
					p={{ base: 6, md: 9, lg: 12 }}
					rounded="2xl"
					alignItems="center"
					flexDirection="column"
					shadow="dark-lg"
				>
					<TimerControls data={initialTimer} onClick={handleTimerControl} />
					<Text
						fontWeight="bold"
						fontSize={{ base: "5xl", md: "7xl", lg: "9xl" }}
						color="white"
						fontFamily="Montserrat"
						letterSpacing="wider"
					>
						{formatTime(time)}
					</Text>

					<Flex gap={30} alignItems="center" mb={3}>
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
							size={["sm", "md", "lg"]}
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

					<Box>
						<Select onChange={handleTrackChange}>
							{allTracks.map((track) => (
								<option key={track.trackTitle} value={track.trackUrl}>
									{track.trackTitle}
								</option>
							))}
						</Select>
					</Box>
				</Flex>
			</Flex>
		</>
	)
}

export default App

//⚠️ Danjuma Remember continue code refactoring the app code
