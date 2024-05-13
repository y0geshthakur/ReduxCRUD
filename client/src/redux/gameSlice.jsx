import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "games",
    initialState: {
        games: []
    },
    reducers: {
        getGames: (state, action) => {
            state.games = action.payload.map(game => {
                return { id: game._id, gameName: game.gameName, developer: game.developer, developedIn: game.developedIn }
            })
        },
        addGame: (state, action) => {
            state.games.push(action.payload)
        },
        updateGame: (state, action) => {
            const index = state.games.findIndex(x => x.id === action.payload.id)
            state.games[index] = {
                id: action.payload.id,
                gameName: action.payload.gameName,
                developer: action.payload.developer,
                developedIn: action.payload.developedIn,
            }
        },
        deleteGame: (state, action) => {
            const id = action.payload.id;
            state.games = state.games.filter(game => game.id !== id)
        }
    }
})

export const { getGames, addGame, updateGame, deleteGame } = gameSlice.actions;
export default gameSlice.reducer;
