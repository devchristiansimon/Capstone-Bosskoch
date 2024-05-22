import './App.css'
import {useEffect, useState} from "react";
import {Receipt} from "./Models/Receipt.ts";
import axios from "axios";
import Startpage from "./pages/Startpage.tsx";
import DetailPage from "./pages/DetailPage.tsx";

import {Route, Routes} from "react-router-dom";

function App() {
const [receiptList, setReceiptList] = useState<Receipt[]>([]);
const [newReceipt, setNewReceipt] = useState<Receipt>({recipeName: "", additional : "", timeInMinutes : 0, nationality : "", difficulty:"", ingredients: [], making : "", vegetarian: false, vegan: false, user: "", imageSrc: ""})
const [ingredients, setIngredients] = useState<string[]>([]);
const [inputValue, setInputValue] = useState<string>('');

//Ich weiß wie man Komponenten anlegt. Ich will erstmal schauen ob es funktioniert :D

function apiCall(){
    axios.get("/api/boss")
        .then((response) => {
            setReceiptList(response.data);
        })
    }
    useEffect(()=>{
        apiCall();
    }, [])

    useEffect(()=>{
        apiCall();
    }, [receiptList])

    useEffect(()=>{
        setNewReceipt({...newReceipt, ingredients: ingredients})
    }, [ingredients])



    return (
    <>
        <header>Hey</header>

        <Routes>
            <Route path={"/"} element={<Startpage newReceipt={newReceipt} setNewReceipt={setNewReceipt} inputValue={inputValue} setInputValue={setInputValue} ingredients={ingredients} setIngredients={setIngredients} receiptList={receiptList}/>}/>
            <Route path={"/detail/:id"} element={<DetailPage />} />
        </Routes>
    </>
  )
}

export default App
