import { useEffect, useState } from "react"
import { Button, Flex, Heading, useToast } from "@chakra-ui/react"
import { formatTime, playNotificationSound } from "./utils"
import { initialTimer } from "./config"
import Time from "./components/Time"
import PlayButton from "./components/PlayButton"
import RestButton from "./components/RestButton"

function App() {
	const [time, setTime] = useState(0)
	const [timerStart, setTimerStart] = useState(false)

	const toast = useToast()

	// This will run ONLY when the timer has started or stopped
	useEffect(() => {
		if (timerStart) {
			playNotificationSound()
			toast({
				title: "Timer has started",
				status: "success",
				position: "top-right"
			})
		}
	}, [timerStart])

	// This will run the code every 1000 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			if (timerStart) {
				if (time > 0) {
					setTime(time - 1)
				} else if (time === 0 && timerStart) {
					playNotificationSound()
					toast({
						title: "Timer has stopped ",
						status: "error",
						position: "top-right"
					})
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
				bgGradient="linear(to-b, red.700, red.900)"
				p={{ base: 6, md: 9, lg: 12 }}
				rounded="2xl"
				alignItems="center"
				flexDirection="column"
				shadow="dark-lg"
			>
				<Flex gap={{ base: 2, md: 5 }}>
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
							fontSize={{ base: "2xl", md: "medium", lg: "3xl" }}
							size={{ base: "xs", md: "md", lg: "lg" }}
						>
							{display}
						</Button>
					))}
				</Flex>
				<Time currentTime={time} />

				<Flex alignItems="center" gap={2}>
					<RestButton
						handleOnClick={() => {
							setTimerStart(false)
							setTime(initialTimer[0].value)
						}}
					/>

					<PlayButton
						isStarted={timerStart}
						currentTime={time}
						handleOnClick={() => {
							!time
								? toast({
										title: "You need to set a timer first",
										status: "warning",
										position: "top-right"
								  })
								: setTimerStart(!timerStart)
						}}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default App
