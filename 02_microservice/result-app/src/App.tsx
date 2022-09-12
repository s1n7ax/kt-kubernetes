import "./App.css";
import { useQuery } from "@tanstack/react-query";

const host = process.env.REACT_APP_RESULT_MS_HOST
const port = process.env.REACT_APP_RESULT_MS_PORT

const getHost = () => {
  return `${host}:${port}`
}

const fetchVotes = async () => {
  const res = await fetch(`${getHost()}/votes`);
  return await res.json();
};

function App() {
  const votes: Array<{ id: number; name: string; count: number }> = useQuery(
    ["animals"],
    fetchVotes,
    {
      suspense: true,
    }
  ).data;

  const tot = votes.map((e) => e.count).reduce((acc, v) => acc + v, 0);

  const getPercentage = (count: number) => {
    if (tot < 1) return 0;
    if (count < 1) return 0;

    return Math.round((count / tot) * 100);
  };

  return (
    <div className="App">
      <div>
        {
          <table>
            <tbody>
              {votes.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>{getPercentage(e.count)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

export default App;
