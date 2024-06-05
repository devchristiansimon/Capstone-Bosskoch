
import axios from "axios";
import {Receipt} from "../Models/Receipt.ts";
import {Link} from "react-router-dom";
import BlankPic from "../assets/teller.jpg"
import {useEffect, useState} from "react";


export default function Startpage({receiptList}:{receiptList: Receipt[]}){

    const [filter, setFilter] = useState<string>("");
    const [filteredReceiptList, setFilteredReceiptList] = useState<Receipt[]>(receiptList);

    useEffect(() => {
        const filtered = receiptList.filter((receipt) => {
            return (
                (receipt.recipeName.toLowerCase().includes(filter.toLowerCase()) ||
                    receipt.additional.toLowerCase().includes(filter.toLowerCase()) ||
                    receipt.nationality.toLowerCase().includes(filter.toLowerCase())
                ));
        }).filter(recept => recept.id);
        setFilteredReceiptList(filtered);

    }, [filter, receiptList]);



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
            <div className={"linkContainer"}>
                <Link to={`/new`}>
                Rezept hinzufügen
                </Link>
            </div>
            <div className={"filtercontainer"}>
                <input className={"filterInput"} type="text"
                       placeholder="Suche nach Rezept"
                       value={filter}
                       onChange={(e) => setFilter(e.target.value)}
                />
            </div>


            <div className={"receiptCardContainer"}>
                {filteredReceiptList.map((receipt: Receipt, index) => (
                    <div key={index} className={"receiptCard"}>
                        <div className={"garbageIcon"} onClick={() => deleteReceipt(index)}>❌</div>
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
                            <Link to={`/detail/${receipt.id}`}>
                            <img src={receipt.imageSrc != "" ? receipt.imageSrc : BlankPic} alt={"Picture"}/>
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}