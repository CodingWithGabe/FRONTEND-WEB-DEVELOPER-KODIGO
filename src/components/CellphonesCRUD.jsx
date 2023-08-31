import React, {useState, useEffect} from "react";
import Table from "./Table";
import axios from "axios"

function CellphonesCRUD(){

    const[cellphones, setCellphones] = useState()

    useEffect(() =>{
        loadCellphones()
    }, [])

    async function loadCellphones(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/celulares")
            let data = await res.data

            setCellphones(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return(
        <div>
            {cellphones === undefined ?
            <div><h2>Loading...</h2>
                <div className="spinner-border text-danger" role="status">
                    <span className="visible-hidden">Loading...</span>
                </div>
            </div>
                
            :
                <Table control={'cellphones'} list={cellphones} cols={["ID", "Make", "Model", "Color", "Price", "Description", "Carrier"]} /> /*translate to spanish*/
            }
        </div>
    )
}

export default CellphonesCRUD;