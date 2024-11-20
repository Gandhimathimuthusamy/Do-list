import { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import React from 'react';
   


const Additems = ({newItem,setNewItem,handleSubmit}) => {

  const inputRef =useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
     <label htmlFor="addItem">Add Item</label>   
        <input
            autoFocus
            ref={inputRef}
            type="text"
            id='addItem'
            placeholder='Add Item'
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
            required

        
        />

        <button
            type="submit"
            aria-label="Add Item"
            onClick={()=>inputRef.current.focus()}


            
          ><FaPlus/>
        </button>

    </form>
  )
}

export default Additems