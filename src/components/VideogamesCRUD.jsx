import react, {useEffect, useState}  from "react";
import Table from "./Table";
import axios from "axios";

function VideogamesCRUD(){

    const[videogames, setVideogames] = useState()

    useEffect(() => {
        loadVideogames()
    }, [])

    async function loadVideogames(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos")
            let data = await res.data

            setVideogames(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    return(
        <div>
            {videogames === undefined ?
            <div><h2>Loading...</h2>
                <div className="spinner-border text-danger" role="status">
                    <span className="visible-hidden">Loading...</span>
                </div>
            </div>
            :
                <Table control={"videogames"} list={videogames} cols={["ID", "Title", "Description", "Platform", "Price", "Category"]}/> /*translate to spanish*/
            }
        </div>
    )
}



export default VideogamesCRUD;