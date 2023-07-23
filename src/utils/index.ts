import notificationSound from "../assets/notificationSound.mp3"


export const playNotification = () => {
  const audio = new Audio(notificationSound)
  return audio.play()
}

export const formatTime = (time: number) => {
  const format = (value: number) => (value < 10 ? `0${value}` : `${value}`);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${format(minutes)}:${format(seconds)}`;
}
