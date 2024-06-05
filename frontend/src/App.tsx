import './App.css'
import {useEffect, useState} from "react";
import {Receipt} from "./Models/Receipt.ts";
import axios from "axios";
import Startpage from "./pages/Startpage.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import AddReceipt from "./pages/AddReceipt.tsx";
import Logo from "./assets/cook.png"

import {Route, Routes} from "react-router-dom";

function App() {
const [receiptList, setReceiptList] = useState<Receipt[]>([]);
const [newReceipt, setNewReceipt] = useState<Receipt>({recipeName: "", additional : "", timeInMinutes : 0, nationality : "", difficulty:"", ingredients: [], making : "", vegetarian: false, vegan: false, user: "", imageSrc: ""})
const [ingredients, setIngredients] = useState<string[]>([]);
const [inputValue, setInputValue] = useState<string>('');


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
        <header>
            <img src={Logo} alt={"Logo"}/>
            <h1>BOSSKOCH</h1>
        </header>

        <Routes>
            <Route path={"/"} element={<Startpage receiptList={receiptList}/>}/>
            <Route path={"/new"} element={<AddReceipt newReceipt={newReceipt} setNewReceipt={setNewReceipt} inputValue={inputValue} setInputValue={setInputValue} ingredients={ingredients} setIngredients={setIngredients} receiptList={receiptList}/>}/>
            <Route path={"/detail/:id"} element={<DetailPage />} />
        </Routes>
    </>
  )
}

export default App
