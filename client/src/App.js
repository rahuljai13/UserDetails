
import { useEffect, useState } from 'react';
import './App.css';
//import { IoMdCloseCircleOutline } from "react-icons/io";
import  axios from "axios";
import Formtabl from './components/Formtabl';

axios.defaults.baseURL ="http://localhost:8080/"

function App() {
  const [addSection,setAddSection] =useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name:"",
    mail:"",
    mobile:"",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name:"",
    mail:"",
    mobile:"",
    _id:"",
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange =(e)=>{
    const {value,name} =e.target
    setFormData((preve)=>{
      return {...preve,
        [name]:value
      }
    })
  }



  const handleSubmit = async(e)=>{
    e.preventDefault();
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      alert(data.data.message )
      setAddSection(false)
      getFetchData()
      setFormData({
        name:"",
        mail:"",
        mobile:"", 
      })
    }
  }

  const getFetchData = async()=>{ 
     const data =  await axios.get("/")
     console.log(data) 
     if(data.data.success){
      setDataList(data.data.data) 
  }
}
 useEffect(()=>{
  getFetchData()
 },[])

const handleDelete = async(id)=>{
  const data =await axios.delete("delete/"+id)
  if (data.data.success){
    getFetchData()
    alert (data.data.message)
  }
}

const handleUpdate = async (e)=>{
  e.preventDefault()
  const data = await axios.put("/update",formDataEdit)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
    setEditSection(false)
  }
}
const handleEditOnChange = async(e)=>{
  const {value,name} = e.target
  setFormDataEdit((perve) => {
    return {
      ...perve,
      [name]:value
    }
  })
}
 const handleEdit =(e)=>{
  setFormDataEdit(e)
  setEditSection(true)
 }
  return (
    <>
      <div className="container">
        <button className="btn-add" onClick={()=>setAddSection(true)} >Add</button>

        {
          addSection && (
            <Formtabl
              handleSubmit = {handleSubmit}
              handleOnChange = {handleOnChange}
              handleclose = {()=>setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editSection&& (
            <Formtabl
              handleSubmit = {handleUpdate}
              handleOnChange = {handleEditOnChange} 
              handleclose = {()=>setEditSection(false)}
              rest={formDataEdit}
              />
          )
        }

         <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              { dataList[0] ? (
                dataList.map((e)=>{
                  console.log(e )
                  return(
                    <tr>
                      <td>{e.name}</td>
                      <tb>{e.mail}</tb>
                      <td>{e.mobile} </td>
                      <td>
                        <button className="btn btn-edit" onClick= {()=>handleEdit(e)}> Edit </button>
                        <button className="btn btn-delete"  onClick={()=>handleDelete(e._id)}> Delete </button>
                      </td>
                    </tr>
                  )
                }))
                :(
                  <p style={{textAlign :"center"}}> No Data </p>
                )
              }
            </tbody>
          </table>
         </div> 
      </div>
    </>
  );
}

export default App; 
