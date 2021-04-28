import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ id, name, artist }) => {
    return (
        <Link className="cardItem" to={`/albums/${id}`}>
            <img
                src={"http://localhost:4000/album/" + id + "/ico"}
                alt="Album Icon"
            ></img>
            <h1>{name}</h1>
            <p>{artist}</p>
        </Link>
    );
};
