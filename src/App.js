import './App.css';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import Api from "./services/api";

function App() {

  const [input,setInput] = useState("");
  const [cep,setCep] = useState({})
  
 async function  handleSearch() {

  if(input === ""){
    alert("insira  o seu cep")
    return
  }
    
  try{
    const response = await Api.get(`${input}/json`)
      setCep(response.data)
      console.log(response.data)
      setInput("")
  }catch{
   alert("erro ao buscar !")

  }


  }



  return (
    <div className="App">
      <h2>buscador de cep</h2>

      <div className='containerInput'>
       <input  onChange={(e)=>setInput(e.target.value)}  type="text" placeholder='Insira o seu cep' />

       <button onClick={handleSearch}><FaSearch size={"19px"} color={"white"} /></button>

      </div>

      {Object.keys(cep).length > 0 && (
            <div className='cont__cep'>
            <h2>cep: {cep.cep}</h2>
            <h3>rua: {cep.logradouro === "" ? "nao encontrado": cep.logradouro}</h3>
            <h3>complemento: {cep.complemento === "" ? "nao encontrado": cep.complemento}</h3>
            <h3>Bairro: {cep.bairro === "" ? "nao encontrado": cep.bairro}</h3>
            <h3>ibge: {cep.ibge}</h3>
            <h3>siafi: {cep.siafi === "" ? "nao encontrado": cep.siafi} </h3>
            <h3>ddd: {cep.ddd === "" ? "nao encontrado": cep.ddd} </h3>
            <h3>{cep.localidade} - {cep.uf}</h3>
            </div>
      )}

     
    </div>
  );
}

export default App;
