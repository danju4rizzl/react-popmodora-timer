import notificationSound from "../assets/notificationSound.mp3"
import music from "../../public/track1.mp3"


export const playNotification = () => {
  const audio = new Audio(notificationSound)
  return audio.play()
}


export const formatTime = (time: number) => {
  return `${Math.floor(time / 60) < 10
    ? `0${Math.floor(time / 60)}`
    : `${Math.floor(time / 60)}`
    }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}
