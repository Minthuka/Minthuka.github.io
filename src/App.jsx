import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [a, setA] = useState(1)
  const [vat, setVat] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount , setDiscount] = useState(0)
  const [grossPrice , setGrossPrice] = useState(0)

  function handlePrice(e) {
    let p = parseFloat(e.target.value) || 0 
    setPrice(p)
    let v = p * 0.07
    setVat(v.toFixed(2))
    updateGrossPrice(p,discount,v)
  }

  function handleDiscount(e){
    let d = parseFloat(e.target.value) || 0
    setDiscount(d)
    updateGrossPrice(price,d,vat)
  }

  function updateGrossPrice(p,d,v){
    let gross = p - d + parseFloat(v)
    setGrossPrice(gross.toFixed(2))
  }

  return (
    <>
<h2>Price</h2>
<input type="number" 
onChange={handlePrice}
style={{fontSize: '20pt'}}/>

      <p>VAT = {vat}</p>
      <h2>Discount</h2>
      <input type="number"
      onChange={handleDiscount}
      style={{fontSize: '20pt'}}/>

      <p>Discount = {discount}</p>
      <p>Gross Price = {grossPrice}</p>

    </>
  )
}

export default App