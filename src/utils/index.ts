import notificationSound from "/notificationSound.mp3"


export const playNotificationSound = () => {
  const audio = new Audio(notificationSound)
  return audio.play()
}

export const formatTime = (time: number) => {
  const format = (value: number) => (value < 10 ? `0${value}` : `${value}`);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${format(minutes)}:${format(seconds)}`;
}