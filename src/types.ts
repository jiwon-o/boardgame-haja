export interface Game {
  id: number;
  name: string;
  image: string;
  rate: string;
  ranking: number;
  theme: string;
  min_player: string;
  max_player: string;
  play_time: string;
  backgroundImage: string;
  releaseYear: string;
  subTitle: string;
  play_age: string;
  description: string;
}

export interface GameRankProps {
  ranking: number;
}

export interface SlidePxProps {
  slidePx: number;
}

export interface BackBtnProps {
  backBtn: boolean | undefined;
}

export type State = {
  loading: boolean;
  data: Game[] | null;
  error: Error | null;
};

export type Action =
  | {
      type: "LOADING";
    }
  | { type: "SUCCESS"; data: Game[] }
  | { type: "ERROR"; error: Error };

export type SlideAmount = 1200 | 1000 | 800 | 600 | 400;
