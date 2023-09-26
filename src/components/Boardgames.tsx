import axios from "axios";
import useAsync from "../hooks/useAsync";

async function getGames() {
  const response = await axios.get("http://localhost:3001/game");
  return response.data;
}

export default function Boardgames() {
  const state = useAsync(getGames, []);

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
