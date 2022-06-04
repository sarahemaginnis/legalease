import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <h1>The Dashboard Page</h1>
      <div>
        <button onClick={() => history.push("/brief/create")}>
          Create a New Brief
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
