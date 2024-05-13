import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGame } from "./redux/gameSlice";
import { useNavigate, useParams } from "react-router-dom";

function UpdateGame() {
    const { id } = useParams();

    const [gameName, setGameName] = useState("");
    const [developer, setDeveloper] = useState("");
    const [developedIn, setDevelopedIn] = useState("");

    const games = useSelector((state) => state.games.games);

    useEffect(() => {
        const game = games.find((game) => game.id === id);
        setGameName(game.gameName);
        setDeveloper(game.developer);
        setDevelopedIn(game.developedIn);
    }, [games, id]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/update/${id}`, {
                gameName,
                developer,
                developedIn,
            });
            dispatch(updateGame({ id, gameName, developer, developedIn }));
            navigate("/");
        } catch (error) {
            console.error("Error updating game:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Update Game</div>
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="gameName" className="form-label">Game Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gameName"
                                        value={gameName}
                                        onChange={(e) => setGameName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="developer" className="form-label">Developer</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="developer"
                                        value={developer}
                                        onChange={(e) => setDeveloper(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="developedIn" className="form-label">Developed In</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="developedIn"
                                        value={developedIn}
                                        onChange={(e) => setDevelopedIn(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateGame;