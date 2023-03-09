import startSound from "../assets/start.mp3"
import stopSound from "../assets/stop.mp3"
import music from "../../public/track1.mp3"


export const playNotification = (timerStart: boolean) => {

  const audio = new Audio(timerStart ? stopSound : startSound)
  return audio.play()
}


export const formattedTime = (time: number) => {
  return `${Math.floor(time / 60) < 10
    ? `0${Math.floor(time / 60)}`
    : `${Math.floor(time / 60)}`
    }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}


