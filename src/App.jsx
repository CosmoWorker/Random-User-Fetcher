import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import  axios  from 'axios';
import loadingGif from "./assets/spinning-loading.gif"

const apiUrl="https://randomuser.me/api/"
export default function App(){
  const [page, setPage]=useState(1);
  const [randomData, setRandomData]=useState([]);
  const [loading, setLoading]=useState(true)

  const newPage=()=>{
    setPage(page=>page+1);
  }

  useEffect(()=>{
    const getUsers=async ()=>{
      try{
        setLoading(true)
        const resp=await axios.get(apiUrl ,{
          params : {page: {page}, results: 10}
        })
        setRandomData((prevRandomData)=>([...prevRandomData, ...resp.data.results]));
      }catch(err){
        console.log(`Error Fetching data: `, err);
      }finally{
        setLoading(false)
      }
    }

    getUsers();
  }, [page])

  return (
    <>
      <header>Random Users</header>
      <div id="user-pages">
        {randomData.map(d=>(
          <UserCard name={d.name.first +" "+ d.name.last} img={d.picture.medium} key={d.login.uuid}/>
        ))}
      </div>
      {loading?<img id="load-gif" src={loadingGif}/>: <button onClick={newPage}>Load More Users</button>}
    </>
  )
}