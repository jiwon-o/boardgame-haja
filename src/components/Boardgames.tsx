import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Game, State, Action } from "../types";

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default function Boardgames() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchGames = async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get<Game[]>("http://localhost:3001/game");
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e: any) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const { loading, data: games, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!games) return null;
  return (
    <div>
      {games && games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <img src={game.image} alt={game.name} />
            </li>
          ))}
        </ul>
      ) : (
        <p>보드게임이 아직 없습니다.</p>
      )}
    </div>
  );
}
