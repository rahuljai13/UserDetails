import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../App.css"
const Formtabl = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addContainer"> 
            <form onSubmit= {handleSubmit}>
               <div className="close-btn" onClick={handleclose} > <IoMdCloseCircleOutline /> </div>
                 <label htmlFor="name">Name:</label>
                 <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

                 <label htmlFor="mail">Mail:</label>
                 <input type="email" id="mail" name="mail" onChange={handleOnChange} value={rest.mail}/>

                 <label htmlFor="mobile">Mobile:</label>
                 <input type="number" id="mobile" name="mobile"onChange={handleOnChange} value={rest.mobile}/>
             
                 <button type="submit" className="btn-submit">Submit</button>
             </form>
           </div>  
  )
}

export default Formtabl
