import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ id, name, artist, apiUrl }) => {
    return (
        <Link className="cardItem" to={`/albums/${id}`}>
            <img
                src={apiUrl + "/album/" + id + "/ico"}
                alt="Album Icon"
            ></img>
            <h1>{name}</h1>
            <p>{artist}</p>
        </Link>
    );
};
