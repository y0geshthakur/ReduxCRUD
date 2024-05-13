import axios from "axios";
import { useState } from "react";
import { addGame } from "./redux/gameSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateGame() {
    const [gameName, setGameName] = useState("");
    const [developer, setDeveloper] = useState("");
    const [developedIn, setDevelopedIn] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/create", {
                gameName,
                developer,
                developedIn,
            });
            dispatch(addGame(response.data));
            navigate("/");
        } catch (error) {
            console.error("Error adding game:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">Add New Game</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
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
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateGame;