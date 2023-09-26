import { useState, useEffect } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
  image: string;
}

export default function Boardgames() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setGames(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get<Game[]>("http://localhost:3001/game");
        setGames(response.data);
      } catch (e: any) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
        <p>No data available.</p>
      )}
    </div>
  );
}
