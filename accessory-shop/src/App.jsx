import { useState , useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row,Col} from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import productList from './accessory-products.json'
import DataTable from './components/DataTable'

function App() { 

  const pRef = useRef()
  const qRef = useRef()
  const [price,setPrice] = useState(productList[0].price)

  const [selectedItems,setSelectedItems]= useState([])



  const handleAdd = (e) => {
    
    const pid = pRef.current.value 
    const product = productList.find(p => p.id == pid)
    const q = qRef.current.value
    console.log(pid,q)
    selectedItems.push({
      //id: product.id ,
      //name: product.name ,
      //price: product.price , 
      ...product,
      qty: q 
    })
      console.table(selectedItems)
      setSelectedItems([...selectedItems])
  }
  const handleProductChanged = (e) => {
    const pid = e.target.value
    const product = productList.find(p => p.id == pid)
    const p = product.price
    console.log(p)
    setPrice(p)
  }

  return (
    <>
    <Container>
    <Row>
      <Col xs={2}>
        <span> Product</span>
        </Col>
        <Col>
          <Form.Select ref={pRef} onChange={handleProductChanged}>
  {
    productList.map((p) => (
      <option key={p.id} value={p.id}>{p.name}</option>
    ))
  }
          </Form.Select>
      </Col>
      <Row>
      </Row>
      <Col xs = {2}>
          Price:
        </Col>
        <Col>
          {price}
      </Col>
    </Row>
    <Row>
      <Col xs={2}>
        <span> Quantity</span>
      </Col>
      <Col>
      <Form.Control type="number" ref={qRef} onChange={handleAdd} />
      </Col>
    </Row>
      <Button variant = "primary" onClick={handleAdd}> Add</Button>

      <DataTable data = {selectedItems} />

    </Container>
    </>
  )
 

} 

export default App 