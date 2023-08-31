import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";

function CellphonesFORM({del}){

    const [marca, setMarca] = useState('')
    const [modelo,setModelo] = useState('')
    const [color, setColor] = useState('')
    const [precio, setPrecio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [operadora, setOperadora] = useState ('')

    const Navigate = useNavigate()
    const {id} =  useParams();

    useEffect(() => {
        if(id != undefined){
            // Load the data
            loadCellphone()
        }

    }, [])

    async function loadCellphone(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/celulares/"+id)
            let data = await res.data

            setMarca (data.marca);
            setModelo (data.modelo);
            setColor (data.color);
            setPrecio (data.precio);
            setDescripcion (data.descripcion);
            setOperadora (data.operadora);
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function save(){
        try{
            let cellphones = {
                marca: marca,
                modelo: modelo,
                color: color,
                precio: precio,
                descripcion: descripcion,
                operadora: operadora,
            }
            
            let res = await axios.post("https://denny2023.azurewebsites.net/api/celulares", cellphones)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/cellphones")
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    async function edit(){
        try{
            let cellphones = {
                celularId: id,
                marca: marca,
                modelo: modelo,
                color: color,
                precio: precio,
                descripcion: descripcion,
                operadora: operadora
            }

            let res = await axios.put("https://denny2023.azurewebsites.net/api/celulares", cellphones)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/cellphones")
            }
        }
        catch(error){
            //alert(error)
            console.log(error)
            if(error.response.status === 404 || error.response.status === 500){
                alert("Record does not exist")
                Navigate("/cellphones")
            }
            
        }
    }

    async function deleteRecord(){
        try{
            let res = await axios.delete("https://denny2023.azurewebsites.net/api/celulares?id=" +id)
            let data = await res.data

            if(data.status === 1){
                alert(data.message)
                Navigate("/cellphones")
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
        Navigate("/cellphones")
    }

    return(
        <div>
            <form id="submitform" className="needs-validation" noValidate>
                {
                    id != undefined ?
                    <div className="form-group">
                        <label className="form-label">ID</label>
                        <input className="form-control" value={id} readOnly disabled />
                    </div>
                    :
                    ""
                }

                <div className="form-group">
                    <label className="form-label">Make</label>
                    <input className="form-control" value={marca} type="text" required onChange={(e) => setMarca(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Make required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Model</label>
                    <input className="form-control" value={modelo} type="text" required onChange={(e) => setModelo(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Model required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Color</label>
                    <input className="form-control" value={color} type="text" required onChange={(e) => setColor(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Color required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input className="form-control" value={precio} type="text" required onChange={(e) => setPrecio(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Price required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-control" value={descripcion} type="text" required onChange={(e) => setDescripcion(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Description required</div>
                </div>
                <div className="form-group">
                    <label className="form-label">Carrier</label>
                    <input className="form-control" value={operadora} type="text" required onChange={(e) => setOperadora(e.target.value)} disabled={del=== undefined ? false : true } />
                    <div className="valid-feedback">OK!</div>
                    <div className="invalid-feedback">Carrier required</div>
                </div>
                <hr />
                <button className={"btn btn-" + (id===undefined ? "success" : del === undefined ? "warning" : "danger")} onClick={(e) => send(e)}>{id === undefined ? "Add" : del === undefined ? "Edit" :  "Delete"}</button>
                <button className="btn btn-dark" onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
} 

export default CellphonesFORM