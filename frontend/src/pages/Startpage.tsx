import {ChangeEvent, FormEvent} from "react";
import axios from "axios";
import {Receipt} from "../Models/Receipt.ts";
import {Link} from "react-router-dom";


export default function Startpage({receiptList, newReceipt, setNewReceipt, inputValue, setInputValue, ingredients,  setIngredients }:{receiptList: Receipt[], newReceipt: Receipt, setNewReceipt: (Receipt:Receipt) => void, inputValue: string, setInputValue: (value: string) => void, ingredients: string[], setIngredients: (ingredients: string[]) => void }){

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        axios.post("/api/boss", newReceipt)
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error.message)})
        console.log(newReceipt)
        setNewReceipt({recipeName: "", additional : "", timeInMinutes : 0, nationality : "", difficulty:"", ingredients: [], making : "", vegetarian: false, vegan: false, user: "", imageSrc: ""})
    }


    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewReceipt({...newReceipt, [key]: event.target.value})
    }

    function handleOnCheckBoxChange(event: ChangeEvent<HTMLInputElement>) {
        const key = event.target.name
        setNewReceipt({...newReceipt, [key]: event.target.checked})

    }

    function handleOnTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const key = event.target.name
        setNewReceipt({...newReceipt, [key]: event.target.value})
    }

    function handleOnNumberChange(event: ChangeEvent<HTMLInputElement>) {
        const toNumber:number = parseFloat(event.target.value);
        const key = event.target.name
        setNewReceipt({...newReceipt, [key]: toNumber})
    }

    const addIngredient = () => {
        if (inputValue.trim() !== '') {
            setIngredients([...ingredients, inputValue]);
            setInputValue('');
        }
    };

    const handleIngredientsInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return(
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={"recipeName"}>receiptName</label>
                        <input name={"recipeName"} type={"text"} id={"recipeName"} onChange={handleOnChange}/>
                        <label htmlFor={"additional"}>additional</label>
                        <input name={"additional"} type={"text"} id={"additional"} onChange={handleOnChange}/>
                        <label htmlFor={"timeInMinutes"}>timeInMinutes</label>
                        <input name={"timeInMinutes"} type={"text"} id={"timeInMinutes"}
                               onChange={handleOnNumberChange}/>
                    </div>
                    <div>
                        <label htmlFor={"nationality"}>nationality</label>
                        <input name={"nationality"} type={"text"} id={"nationality"} onChange={handleOnChange}/>
                        <label htmlFor={"easy"}>Leicht</label>
                        <input name={"difficulty"} type={"radio"} id={"easy"} value={"easy"} onChange={handleOnChange}/>
                        <label htmlFor={"easy"}>Mittel</label>
                        <input name={"difficulty"} type={"radio"} id={"medium"} value={"medium"}
                               onChange={handleOnChange}/>
                        <label htmlFor={"hard"}>Schwer</label>
                        <input name={"difficulty"} type={"radio"} id={"hard"} value={"hard"} onChange={handleOnChange}/>
                        <label htmlFor={"ingredients"}>ingredients</label>
                        <input name={"ingredients"} type={"text"} id={"ingredients"} value={inputValue}
                               onChange={handleIngredientsInputChange}/>
                        <button type={"button"} onClick={addIngredient}> Zutat Hinzufügen</button>
                    </div>
                    <div>
                        <label htmlFor={"making"}>making</label>
                        <textarea name={"making"} id={"making"} cols={5} onChange={handleOnTextareaChange}/>
                        <label htmlFor="vegetarian">Vegetarisch</label>
                        <input type="checkbox" id="vegetarian" name="vegetarian" onChange={handleOnCheckBoxChange}/>
                        <label htmlFor="vegan">Vegan</label>
                        <input type="checkbox" id="vegan" name="vegan" onChange={handleOnCheckBoxChange}/>
                    </div>
                    <button type={"submit"}>Abschicken</button>
                </form>
                <div>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={"receiptCardContainer"}>
                {receiptList.map((receipt: Receipt, index) => (
                    <div key={index} className={"receiptCard"}>
                        <div className={"receiptCardTitleContainer"}>
                            <div className={"receiptCardTitle"}>
                                <p>{receipt.recipeName}</p>
                                <p>{receipt.additional}</p>
                            </div>
                            <div className={"receiptCardDetails"}>
                                <p>{receipt.difficulty}</p>
                                <p>{receipt.timeInMinutes}</p>
                            </div>
                        </div>
                        <div className={"foodImage"}>
                            <img src={receipt.imageSrc} alt={"Picture"}/>
                        </div>
                        <Link to={`/detail/${receipt.id}`} >
                            Mehr anzeigen
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}