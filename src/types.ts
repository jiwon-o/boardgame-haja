export interface Game {
  id: number;
  name: string;
  image: string;
  rate: number;
  ranking: number;
}

export interface GameRankProps {
  ranking: number;
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
