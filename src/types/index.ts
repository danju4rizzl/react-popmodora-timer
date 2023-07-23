
export interface TitleProps {
  content: string;
}

export interface TimerControlsProps {
  onClick: (value: number) => void;
  data: { value: number; display: string }[];
}
