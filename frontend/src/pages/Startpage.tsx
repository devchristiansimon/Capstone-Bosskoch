import {ChangeEvent, FormEvent} from "react";
import axios from "axios";
import {Receipt} from "../Models/Receipt.ts";
import {Link} from "react-router-dom";
import BlankPic from "../assets/teller.jpg"


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
    const handleOnNationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const key = event.target.name
        setNewReceipt({...newReceipt, [key]: event.target.value})
    };

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

    const deleteIngredients = (index:number) => {
        const newIngredientsList = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredientsList);
    };

    function deleteReceipt(i:number){
        axios.delete("/api/boss/" + receiptList[i].id)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return(
        <>
            <div>
                <form onSubmit={handleSubmit} className={"formfield"}>
                    <div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"recipeName"}>Name des Gerichts</label>
                            <input name={"recipeName"} type={"text"} id={"recipeName"} onChange={handleOnChange}/>
                        </div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"additional"}>Namenszusatz</label>
                            <input name={"additional"} type={"text"} id={"additional"} onChange={handleOnChange}/>
                        </div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"timeInMinutes"}>Zeit in Minuten</label>
                            <input name={"timeInMinutes"} type={"text"} id={"timeInMinutes"}
                                   onChange={handleOnNumberChange}/>
                        </div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"imageSrc"}>Bild URL</label>
                            <input name={"imageSrc"} type={"text"} id={"imageSrc"} onChange={handleOnChange}/>
                        </div>

                    </div>
                    <div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"nationality"}>Nationalität</label>
                            <select name="nationality" id="nationality" onChange={handleOnNationChange}>
                                <option value="">Wähle die Herkunft des Gerichtes</option>
                                <option value="Italienisch">Italienisch</option>
                                <option value="Indisch">Indisch</option>
                                <option value="Deutsch">Deutsch</option>
                                <option value="Amerikanisch">Amerikanisch</option>
                                <option value="Chinesisch">Chinesisch</option>
                                <option value="Türkisch">Türkisch</option>
                                <option value="Japanisch">Japanisch</option>
                                <option value="Sonstiges">sonstiges</option>
                            </select>
                        </div>

                        <div className={"inRow"}>
                            <div className={"labelInputBox"}>
                                <label htmlFor={"easy"}>Leicht</label>
                                <input name={"difficulty"} type={"radio"} id={"easy"} value={"easy"}
                                       onChange={handleOnChange}/>
                            </div>
                            <div className={"labelInputBox"}>
                                <label htmlFor={"easy"}>Mittel</label>
                                <input name={"difficulty"} type={"radio"} id={"medium"} value={"medium"}
                                       onChange={handleOnChange}/>
                            </div>
                            <div className={"labelInputBox"}>
                                <label htmlFor={"hard"}>Schwer</label>
                                <input name={"difficulty"} type={"radio"} id={"hard"} value={"hard"}
                                       onChange={handleOnChange}/>
                            </div>

                        </div>
                        <div className={"labelInputBox"}>
                            <label htmlFor={"ingredients"}>Zutaten</label>
                            <input name={"ingredients"} type={"text"} id={"ingredients"} value={inputValue}
                                   onChange={handleIngredientsInputChange}/>
                            <button type={"button"} onClick={addIngredient}> Zutat Hinzufügen</button>
                        </div>

                    </div>
                    <div>
                        <label htmlFor={"making"}>Zubereitung</label>
                        <textarea name={"making"} id={"making"} rows={10} cols={40}  onChange={handleOnTextareaChange}/>
                        <div className={"inRow"}>
                            <div>
                                <label htmlFor="vegetarian">Vegetarisch</label>
                                <input type="checkbox" id="vegetarian" name="vegetarian"
                                       onChange={handleOnCheckBoxChange}/>
                            </div>
                            <div>
                                <label htmlFor="vegan">Vegan</label>
                                <input type="checkbox" id="vegan" name="vegan" onChange={handleOnCheckBoxChange}/>
                            </div>

                        </div>

                    </div>
                    <div className={"FormButtonContainer"}>
                        <button type={"submit"} className={"submitButton"}>Abschicken</button>
                    </div>

                </form>
                <div className={"ingredientListContainer"}>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index} onClick={() => deleteIngredients(index)} className={"ingredientList"}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={"receiptCardContainer"}>
                {receiptList.map((receipt: Receipt, index) => (
                    <div key={index} className={"receiptCard"}>
                        <div className={"garbageIcon"} onClick={()=>deleteReceipt(index)}>❌</div>
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
                            <img src={receipt.imageSrc != "" ? receipt.imageSrc : BlankPic} alt={"Picture"}/>
                        </div>
                        <Link to={`/detail/${receipt.id}`}>
                            Mehr anzeigen
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}