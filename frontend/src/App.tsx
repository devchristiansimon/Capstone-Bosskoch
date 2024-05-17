import './App.css'
import {useEffect, useState} from "react";
import {Receipt} from "./Models/Receipt.ts";
import axios from "axios";

function App() {
const [receiptList, setReceiptList] = useState<Receipt[]>([]);

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

  return (
    <>
        <header>Hey</header>
        <div className={"receiptCardContainer"}>
            {receiptList.map((receipt, index) => (
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
                        <img src={receipt.imageSrc} alt={"Picture"} />
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default App
