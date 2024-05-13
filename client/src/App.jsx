import 'bootstrap/dist/css/bootstrap.min.css'
import Games from './Games'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getGames } from './redux/gameSlice'
import CreateGame from './CreateGame'
import UpdateGame from './UpdateGame'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001');
                dispatch(getGames(response.data));
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Games />}></Route>
                <Route path='/create' element={<CreateGame />}></Route>
                <Route path='/edit/:id' element={<UpdateGame />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App