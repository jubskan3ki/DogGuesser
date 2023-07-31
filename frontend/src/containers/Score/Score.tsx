import React, { useState, useEffect } from 'react';
import Titre from '../../components/Titre/Titre';
import axios from 'axios';
import './Score.css';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';

interface Score {
    score: number;
    mode: string;
    username: string;
    date: string;
}

const ScoreHistory: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [selectedMode, setSelectedMode] = useState('tout');
    const [minScore, setMinScore] = useState<number | null>(null);

    const modeOptions = [
        { value: 'tout', label: 'Tout' },
        { value: 'normal', label: 'Normal' },
        { value: 'chrono', label: 'Chrono' },
        { value: 'runner', label: 'Runner' }
    ];

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/scores', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setScores(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'historique des scores:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="score-history-container Content">
            <Titre title="Historique des Scores" />
            <div className='FilterScore'>
                <Select 
                    value={selectedMode} 
                    onChange={setSelectedMode} 
                    options={modeOptions}
                />
                <Input type="number" value={minScore ? minScore.toString() : ''} placeholder="Score minimum" onChange={(val) => setMinScore(val ? parseInt(val) : null)}/>
            </div>
            <div className="GridScore">
                <div className="GridScoreItem">
                    <h4>Mode</h4>
                    <h4>Date</h4>
                    <h4>Score</h4>
                </div>
                {scores
                    .filter(score => {
                        if (selectedMode !== 'tout' && score.mode !== selectedMode) {
                            return false;
                        }

                        if (minScore && score.score < minScore) {
                            return false;
                        }

                        return true;
                    })
                    .map((score, index) => (
                        <div className="GridScoreItem" key={index}>
                            <p key={`mode-${index}`}>{score.mode}</p>
                            <p key={`date-${index}`}>{score.date}</p>
                            <p key={`score-${index}`}>{score.score}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ScoreHistory;
