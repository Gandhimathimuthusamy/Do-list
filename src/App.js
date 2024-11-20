import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Additems from "./Additems";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";




function App() {

  const API_URL='http://localhost:3500/items'
  const [items,setItems]=useState([])    
 const [newItem,setNewItem]=useState('')
 const [search,setSearch]=useState('')
 const [fetchError,setFetchError]=useState(null)
 const [loading,SetIsLoading]=useState(true)


 useEffect(()=>{
   const fetchItems=async()=>{
    try{
      const response=await fetch(API_URL)
      if (!response.ok) throw Error ("Data not received")
      const ListItems= await response.json()
      setItems(ListItems)
      setFetchError(null)
    }
    catch(err){
      setFetchError(err.message)

    }
    finally{
      SetIsLoading(false)
    }

   }
   setTimeout(()=>{
  
     (async () => await fetchItems())()},2000)

},[])

  // const addItem = (item) => {
  // const id = items.length ? items[items.length - 1].id + 1 : 1;
  // const myNewItem = { id, checked: false, item };
  // const listItems = [...items, myNewItem];
   //setItems(listItems);
   
 
    const addNewItem=async(item)=>{
    const id=items.length ?  (items[items.length -1].id + 1 ): 1;
    const addItem={ id, checked: false, item }
    const ListItems=[...items,addItem]
    setItems(ListItems)
    // localStorage.setItem('todo_list',JSON.stringify(ListItems))
    const  postOptions={
     method:"POST",
     headers:{
      'Content-Type':'application/json'
     },
     body:JSON.stringify(addItem)
    }
   const result=await apiRequest(API_URL,postOptions) 
   if (result) setFetchError(result)

 }


 const handleCheck=async(id)=>{
    const ListItems=items.map((item)=>(item.id===id? {...item,checked:!item.checked}:item))
    setItems(ListItems)
    // localStorage.setItem('todo_list',JSON.stringify(ListItems))
  
    const myItem=ListItems.filter((item)=>(
      item.id===id))

    const  updateOptions={
        method:"PATCH",
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({checked:myItem[0].checked})
       }
      const reqUrl=`${API_URL}/${id}` 
      const result=await apiRequest(reqUrl, updateOptions) 
      if (result) setFetchError(result)


  
 }   

 const handleDelete=async(id)=>{
    const ListItems=items.filter((item)=>
    item.id!==id)
    setItems(ListItems)
    // localStorage.setItem('todo_list',JSON.stringify(ListItems))
    const  deleteOptions={method:"DELETE"}

    const reqUrl=`${API_URL}/${id}` 
    const result=await apiRequest(reqUrl, deleteOptions) 
    if (result) setFetchError(result)
  
}

 const handleSubmit=(e)=>{
    e.preventDefault()
   if(!newItem) return  
   addNewItem(newItem)
   setNewItem('')
    
 } 


return (
            <div className="App">
              <Header title="To do list"/>
              <Additems
                  newItem={newItem}
                  setNewItem={setNewItem}
                  handleSubmit={handleSubmit}
            
              /> 
              <SearchItem
                 search={search}
                 setSearch={setSearch}
              />
            <main>
              {loading && <p> Is Loading ...</p>   }
              {fetchError && <p>{` Error:${fetchError}`} </p>}
              {!loading && !fetchError && <Content
                items={items.filter((item)=>((item.item).toLowerCase()).includes((search).toLowerCase()))}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
              />}
             </main>  
              <Footer
                length={items.length}
              />
            </div>
          );
}

export default App;



 