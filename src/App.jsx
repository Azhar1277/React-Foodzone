import React, { useEffect } from 'react'
import './app.css'
import { useState } from 'react';
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL="http://localhost:9000";


const App = () => {
  const [data,setData]=useState();
    
  
 const[filterData,setFilterData]=useState(null);

  const[loading,setLoading]=useState(false);
  const[error,setError]=useState();
  const [selectBtn,setSelectBtn]=useState();
 

  useEffect(() => {
    const fetchedData =  async ()=>{
      setLoading(true)
         try {
          const response = await fetch(BASE_URL);
             
          const json=  await  response.json();
          setLoading(false);
         setFilterData(json);
         setData(json);
          
         } catch (error) {
          setError("unable to fetch data")
          
         }
    
      };
      fetchedData();
    
      }, []);


      const searchFood=(e)=>{
         const searchValue = e.target.value;
         console.log(searchValue);
         if(searchValue ==""){
            setFilterData(data);
         }


          else {
      
       
        const filter=  data?.filter((item)=>item.name.toLowerCase()
         .includes(searchValue.toLowerCase())
           );
          setFilterData(filter);
      

       }
    
    
  
      };

      const filterFood=(type)=>{
         if(type == "All"){
            setFilterData(data);
            setSelectBtn(All);
            return;

         }
         const filter = data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase())
      );
      setFilterData(filter);
      setSelectBtn(type)

      };

      const filterBtn =[
         {
            type:"All",
            name:"All",
         },
         {
            type:"Breakfast",
            name:"Breakfast",
         },
         {
            type:"Lunch",
            name:"Lunch",
         },
         {
            type:"Dinner",
            name:"Dinner",
         },
         {
            type:"Dessert",
            name:"Dessert",
         },
        
        





      ]
     
       
      
   
    

  if(error)return  <p>{error}</p>;
  if(loading) return <p>Loading...</p>


  
  



 




  return (

     <div>

  <div>

  

  <div className='top'>
    <div className='header'>

      <div className='logo'>FoodZone</div>
     
     <div>


     <input
      className='input'
      type='search'
      placeholder='Enter item'
      onChange={searchFood}
   
      
      
      
      />


     </div>

    
        
        
        
       



    </div>

    <div className='btn'>
      {filterBtn.map((value)=>(
       <button key={value.name} onClick={() => filterFood(value.type)}>

         {value.name}
         
         </button>
      
      ))}
    
    


    </div>
    </div>



    </div>
     
 
   
    {/*<FoodCart data={data}/> */}

    

 <SearchResult data={filterData}/>
 
    
     
      
      
      </div>
  )
}

export default App