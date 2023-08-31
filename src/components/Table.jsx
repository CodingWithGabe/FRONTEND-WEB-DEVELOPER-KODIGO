import React, {useEffect} from "react";
import { Link } from "react-router-dom";

function Table({list, cols, control}){

    /*
    useEffect(() => {
        //console.log(list)
        //console.log(cols)
        list.map((value, index) => {
            console.log(value)
            console.log(Object.values(value))
        })
    }, [])*/

    return(
        <div>
            <table className="table  table-striped">
                <thead>
                    <tr>
                        <th>
                            <Link to={`/${control}/new`} className="btn btn-success">Add New</Link>
                        </th>
                        {
                            cols.map((value, index) =>{
                                return <th key={index}>{value}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((value, index) => {
                            return <tr key={index}>
                                <td>
                                    <Link to={`/${control}/edit/${Object.values(value)[0]}`} className="btn btn-warning">Edit</Link>
                                    <Link to={`/${control}/delete/${Object.values(value)[0]}`} className="btn btn-danger">Delete</Link>
                                </td>
                                {
                                    Object.values(value).map((value2, index2)=>{
                                        return<td key={index2}>{value2}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                        {
                            cols.map((value, index) =>{
                                return <th key={index}>{value}</th>
                            })
                        }
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Table;