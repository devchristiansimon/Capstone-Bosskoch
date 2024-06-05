import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Receipt} from "../Models/Receipt.ts";

export default function DetailPage(){
    const { id } = useParams();
    const [receipt, setReceipt] = useState<Receipt >({ recipeName: "", additional : "", timeInMinutes : 0, nationality : "", difficulty:"", ingredients: [], making : "", vegetarian: false, vegan: false, user: "", imageSrc: ""});

    useEffect(() => {
        axios.get(`/api/boss/${id}`)
            .then(response => {
                setReceipt(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Laden des Rezepts:', error);
            });
    }, [id]);


    return (
        <div className={"detailContainer"}>
            <div className={"linkContainer"}>
                <Link to={`/`}>
                    zurück
                </Link>
            </div>

            <h2>Rezept: {receipt.recipeName} {receipt.additional}</h2>
            <div className={"veganContainer"}>
                {receipt.vegetarian ? <p>vegetarisch ✅</p> : <p>vegetarisch: ❌</p>}
                {receipt.vegan ? <p>vegan ✅</p> : <p>vegan: ❌</p>}
            </div>

            <img src={receipt.imageSrc} alt={receipt.recipeName}/>
            <p>Nationalität: {receipt.nationality}</p>
            <div>Zutaten:</div>
            <ul>{receipt.ingredients.map((zutat) => (
                <li>{zutat}</li>
            ))}</ul>
            <p>{receipt.making}</p>


        </div>


    )
}