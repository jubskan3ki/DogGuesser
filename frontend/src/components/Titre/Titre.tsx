import'./Titre.css';

interface TitreProps {
    title: string;
}

const Titre: React.FC<TitreProps> = ({ title}) => {

    return (
        <div className="Titre" >
            <h2>{title}</h2>
        </div>
    ) ;
};

export default Titre;
