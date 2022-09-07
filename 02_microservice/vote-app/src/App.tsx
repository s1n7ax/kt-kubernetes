import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

const host = process.env.REACT_APP_VOTE_MS_HOST
const port = process.env.REACT_APP_VOTE_MS_PORT

const getHost = () => {
  return `${host}:${port}`
}

const fetchAnimals = async () => {
  const res = await fetch(`${getHost()}/animals`);
  return await res.json();
};

const sendVote = async (animalId: number) => {
  const res = await fetch(`${getHost()}/vote?animal=` + animalId, {
    method: "POST",
  });
  if (!res.ok) {
    alert("Something went wrong. status: " + res.status);
  }
};

function App() {
  const animals: Array<{ id: number; name: string }> = useQuery(
    ["animals"],
    fetchAnimals,
    {
      suspense: true,
    }
  ).data;

  const [voting, setVoting] = useState(false);

  const vote = (id: number) => {
    return async () => {
      setVoting(true);
      await sendVote(id);
      setVoting(false);
    };
  };

  console.log(process.env.NODE_ENV);

  return (
    <div className="App">
      <div>
        {animals.map((animal) => (
          <button
            key={animal.id}
            disabled={voting}
            className="vote"
            onClick={vote(animal.id)}
          >
            {animal.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
