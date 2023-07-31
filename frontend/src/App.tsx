import { Routes ,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Game from './containers/Game/Game';
import Chrono from './containers/Chrono/Chrono';
import Runner from './containers/Runner/Runner';
import Score from './containers/Score/Score';
import Ranking from './containers/Ranking/Ranking';
import Err from './containers/Err/Err';
import NavBar from './components/Navbar/Navbar';

import './App.css'

function App() {

    const isLoggedIn = localStorage.getItem('authToken');

    return (
        <div className={isLoggedIn ? 'Body isLoggedIn' : 'Body'}>
            {isLoggedIn ? <NavBar /> : null}
            <Routes>
                <Route path="/" element={ isLoggedIn ?  <Navigate to="/Home" /> :  <Auth /> } />
                <Route path="/Home" element={ isLoggedIn ? <Home /> : <Navigate to="/" /> }/>
                <Route path="/Game" element={ isLoggedIn ? <Game /> : <Navigate to="/" /> }/>
                <Route path="/Chrono" element={ isLoggedIn ? <Chrono /> : <Navigate to="/" /> }/>
                <Route path="/Runner" element={ isLoggedIn ? <Runner /> : <Navigate to="/" /> }/>
                <Route path="/Score" element={ isLoggedIn ? <Score /> : <Navigate to="/" /> }/>
                <Route path="/Ranking" element={ isLoggedIn ? <Ranking /> : <Navigate to="/" /> }/>
                <Route path="*" element={<Err/>} />
            </Routes>
        </div>
    )
}

export default App
