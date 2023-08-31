import axios from "axios";
import react, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

function VideogamesFORM({del}){

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")
    const [videoJuegos, setVideojuegos] = useState("")

    const Navigate = useNavigate()
    const {id} = useParams()

    useEffect(() =>{
        loadVideogame()
        console.log(id)
        if(id !== undefined)
            loadVideogameID()
    },[])

    async function loadVideogameID(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos/"+id)
            let data = await res.data
    
            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setPlataforma(data.plataforma)
            setPrecio(data.precio)
            setCategoria(data.categoria)
    
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }
    
    async function loadVideogame(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos")
            let data = await res.data
            
            setVideojuegos(data)
            //console.log(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

async function save(){
    try{
        let videogames = {
            titulo: titulo,
            descripcion: descripcion,
            plataforma: plataforma,
            precio: precio,
            categoria: categoria
        }

        let res = await axios.post("https://denny2023.azurewebsites.net/api/juegos", videogames)
        let data = await res.data

        if(data.status === 1){
            alert(data.message)
            Navigate("/videogames")
        }
    }
    catch(error){
        alert(error)
        console.log(error)
    }
}

async function edit(){
    try{
        let videogames = {
            juegoId: id,
            titulo: titulo,
            descripcion: descripcion,
            plataforma: plataforma,
            precio: precio,
            categoria: categoria,
        }

        let res = await axios.put("https://denny2023.azurewebsites.net/api/juegos", videogames)
        let data = await res.data

        if(data.status === 1){
            alert(data.message)
            Navigate("/videogames")
        }
    }
    catch(error){
        alert(error)
        console.log(error)
    }
}

async function deleteRecord(){
    try{
        let res = await axios.delete("https://denny2023.azurewebsites.net/api/juegos?id="+id)
        let data = await res.data

        if(data.status === 1){
            alert(data.message)
            Navigate("/videogames")
        }
    }
    catch(error){
        alert(error)
        console.log(error)
    }
}

function send(e){
    const submitform = document.querySelector("#submitform")
    e.preventDefault()
    e.stopPropagation()
    if (submitform.checkValidity()){
        if(id === undefined)
            save()
        else if(del === undefined)
            edit()
        else
            deleteRecord()
    }
    

    submitform.classList.add('was-validated')
}

function cancel(){
    Navigate("/videogames")
}

    return(
        <div>
            <form id="submitform" className="needs-validation" noValidate>
                {
                    id === undefined ?
                    ""
                    :
                    <div className="form-group">
                        <label className="form-label">ID</label>
                        <input type="text" value={id} readOnly disabled className="form-control" />
                    </div>
                }
                
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" required value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={del === undefined? false : true} />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Title required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={del === undefined? false : true} />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Description required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Platform</label>
                    <input type="text" className="form-control" required value={plataforma} onChange={(e) => setPlataforma(e.target.value)} disabled={del === undefined? false : true} />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Platform required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input type="text" className="form-control" required value={precio} onChange={(e) => setPrecio(e.target.value)} disabled={del === undefined? false : true} />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Price required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" required value={categoria} onChange={(e) => setCategoria(e.target.value)} disabled={del === undefined? false : true} />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Category required</div>
                </div>
                <hr />
                <button onClick={(e) => send(e)} className={"btn btn-"+(id === undefined ? "success" : del === undefined ? "warning" : "danger" )}>{id === undefined ? "Add" : del === undefined ? "Edit" : "Delete"}</button>
                <button onClick={cancel} className="btn btn-dark">Cancel</button>
            </form>
        </div>
    )
}

export default VideogamesFORM
