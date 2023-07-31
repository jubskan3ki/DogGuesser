import React, { useState, useEffect } from 'react';
import Titre from '../../components/Titre/Titre';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './Ranking.css';

interface Score {
    username: string;
    score: number;
    date: string;
}

const Ranking: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [mode, setMode] = useState<string>('chrono');

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/scores/best',
                    { mode: mode },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                setScores(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des scores:', error);
            }
        };

        fetchScores();
    }, [token, mode]);

    return (
        <div className="ranking-container Content">
            <Titre title="Top 10 des scores" />
            <div className='FilterRanking'>
                <Button onClick={() => setMode('chrono')} label="Chrono" />
                <Button onClick={() => setMode('runner')}  label="Runner"/>
            </div>
            <div className="GridRanking">
                <div className="GridRankingItem">
                    <h4>Classement</h4>
                    <h4>Username</h4>
                    <h4>Date</h4>
                    <h4>Score</h4>
                </div>
                {scores.map((score, index) => (
                    <>
                        <div className="GridRankingItem" key={index}>
                            <p>
                                {index + 1}
                            </p>
                            <p>
                                {score.username}
                            </p>
                            <p>
                                {score.score}
                            </p>
                            <p>
                                {score.date}
                            </p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default Ranking;
