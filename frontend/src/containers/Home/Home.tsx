import React, { useState } from 'react';
import Titre from '../../components/Titre/Titre';
import { Link } from 'react-router-dom';
import './Home.css';
import game from '../../assets/game.svg';
import chrono from '../../assets/chrono.svg';
import runner from '../../assets/runner.svg';

const Home: React.FC = () => {
    const [hoveredMode, setHoveredMode] = useState<string | null>(null);

    const descriptions: { [key: string]: string[] } = {
        game: [
            "Découvrez le jeu classique et testez vos compétences !",
            "Vous commencerez avec 0 point.",
            "Une image de chien apparaît, et vous devez deviner sa race.",
            "Vous aurez 4 choix. Si vous choisissez le bon, vous gagnez 60 points.",
            "Continuez jusqu'à donner une mauvaise réponse, à ce moment le jeu s'arrête."
        ],
        chrono: [
            "Essayez le mode Chrono pour une expérience à contre-la-montre !",
            "Vous commencerez comme dans le jeu classique.",
            "Les points gagnés dépendent du temps restant.",
            "Le chrono diminue de 2 secondes à chaque réponse.",
            "Le jeu s'arrête si vous donnez une mauvaise réponse."
        ],
        runner: [
            "Le mode Runner est pour ceux qui aiment les défis rapides et intenses !",
            "Le jeu commence comme le mode classique.",
            "Vous avez 60 secondes pour répondre au maximum de questions.",
            "Le jeu continue jusqu'à ce que vous donniez une mauvaise réponse.",
            "Tentez de répondre à autant de questions que possible avant que le temps ne s'épuise."
        ]
    };

    return (
        <div className="home-page Content">
            <Titre title="Bienvenue sur notre site de jeu !" />

            <div className='Choice'>
                <Link to="/game" onMouseEnter={() => setHoveredMode('game')} onMouseLeave={() => setHoveredMode(null)}>
                    <img src={game} alt="game" />
                    <h3>
                        Mode Training
                    </h3>
                </Link>
                <Link to="/chrono" onMouseEnter={() => setHoveredMode('chrono')} onMouseLeave={() => setHoveredMode(null)}>
                    <img src={chrono} alt="chrono" />
                    <h3>
                        Mode chrono
                    </h3>
                </Link>
                <Link to="/runner" onMouseEnter={() => setHoveredMode('runner')} onMouseLeave={() => setHoveredMode(null)}>
                    <img src={runner} alt="runner" />
                    <h3>
                        Mode runner
                    </h3>
                </Link>
            </div>

            <div className="description">
                {hoveredMode ? 
                    descriptions[hoveredMode].map((desc, index) => <p key={index}>{desc}</p>)
                    : 
                    <h4 style={{textAlign:"center"}}>Veuillez sélectionner un mode de jeu pour en savoir plus.</h4>
                }
            </div>
        </div>
    );
};

export default Home;
