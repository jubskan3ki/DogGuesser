import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Notif, { NotifProps } from '../../components/Notif/Notif'; 
import Timer from '../../components/Timer/Timer';
import lose from '../../assets/lose.svg';
import axios from 'axios';
import './Chrono.css';

const ChronoGame: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [correctBreed, setCorrectBreed] = useState<string>('');
    const [choices, setChoices] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameOverReason, setGameOverReason] = useState<string>(''); 
    const [notification, setNotification] = useState<NotifProps | null>(null);

    const closeNotification = () => {
        setNotification(null);
    };

    const fetchRandomDog = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            setImageUrl(response.data.message);
            const breed = response.data.message.split('/')[4];
            setCorrectBreed(breed);

            const breedsResponse = await axios.get('https://dog.ceo/api/breeds/list/all');
            const allBreeds = Object.keys(breedsResponse.data.message);
            const wrongBreeds = allBreeds.filter(b => b !== breed);
            wrongBreeds.sort(() => 0.5 - Math.random());
            setChoices([breed, ...wrongBreeds.slice(0, 3)].sort(() => 0.5 - Math.random()));

        } catch (error) {
            console.error("Erreur lors de la récupération de l'image ou des races :", error);
        }
    };

    useEffect(() => {
        fetchRandomDog();
    }, []);

    const handleChoiceClick = async (choice: string) => {
        if (choice === correctBreed) {
            setScore(prevScore => prevScore + timeLeft);
            setNotification({ type: 'success', message: `Bonne réponse` });
            setTimeLeft(prevTime => Math.max(prevTime - 2, 2));  
            fetchRandomDog();
        } else {
            setNotification({ type: 'error', message: `Mauvaise réponse` });
            setGameOverReason('mauvaise réponse'); 
            endGame();
        }
    };

    const endGame = async () => {
        setGameOver(true);

        try {
            const token = localStorage.getItem('authToken');
            await axios.post('http://localhost:5000/api/scores/', { score: score, mode: 'chrono' }, { headers: { Authorization: `Bearer ${token}` } });
        } catch (error) {
            console.error("Erreur lors de l'envoi du score :", error);
        }
    };

    return (
        <div>
            <Notif
                type={notification && notification.type}
                message={notification && notification.message}
                onClick={closeNotification}
            />
            {gameOver ? (
                <div className='GameOver'>
                    <div className='GameOverCotent'>
                        <h2>{gameOverReason === 'mauvaise réponse' ? 'Mauvaise réponse!' : 'Temps écoulé!'}</h2>
                        <img src={lose} alt="lose" />
                        <h3>Votre score : {score}</h3>
                        <Link to="/"><h4>Retourner à la page d'accueil</h4></Link>
                    </div>
                </div>
            ) : (
                <div className='Game'>
                    <img src={imageUrl} alt="Dog" />
                    <Timer initialSeconds={timeLeft} onTimeOut={() => {
                        setGameOverReason('temps écoulé'); 
                        endGame();
                    }} />
                    <div className='GameButton'>
                        {choices.map(choice => (
                            <Button key={choice} onClick={() => handleChoiceClick(choice)} label={choice}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChronoGame;
