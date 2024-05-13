import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteGame } from "./redux/gameSlice";

function Games() {
    const games = useSelector((state) => state.games.games);
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/deletegame/${id}`);
            dispatch(deleteGame({ id }));
        } catch (error) {
            console.error("Error deleting game:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Games</div>
                        <div className="card-body">
                            <Link to="/create" className="btn btn-primary mb-3">Add New Game</Link>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Game Name</th>
                                        <th>Developer</th>
                                        <th>Developed In</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.map((game) => (
                                        <tr key={game.id}>
                                            <td>{game.gameName}</td>
                                            <td>{game.developer}</td>
                                            <td>{game.developedIn}</td>
                                            <td>
                                                <Link
                                                    to={`/edit/${game.id}`}
                                                    className="btn btn-sm btn-primary me-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(game.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games;