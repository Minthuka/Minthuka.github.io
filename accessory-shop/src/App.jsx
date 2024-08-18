import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import productList from './accessory-products.json';
import DataTable from './components/DataTable';
import { useLocalStorage } from 'react-use';  

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems,remove] = useLocalStorage("selected-items",[]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([...selectedItems]);
  const [totalPrice, setTotalPrice] = useState(0); // New state for totalPrice
  const [storedTotalPrice, setStoredTotalPrice, removeTotalPrice] = useLocalStorage("total-price", 0);

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
    calculateTotalPrice(); // Update totalPrice after deleting an item
  };

  const filter = (keyword) => {
    if (keyword.trim() === '') {
      setFilteredSelectedItems([...selectedItems]);
    } else {
      const filteredItems = selectedItems.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredSelectedItems(filteredItems);
    }
  };

  const sort = (direction) => {
    const sortedItems = [...filteredSelectedItems];
    sortedItems.sort((a, b) => {
      if (a.name < b.name) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a.name > b.name) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredSelectedItems(sortedItems);
  };

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find((p) => p.id == pid);
    const q = qRef.current.value;

    selectedItems.push({
      ...product,
      qty: q,
    });
    console.table(selectedItems);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
    calculateTotalPrice(); // Update totalPrice after adding an item
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find((p) => p.id == pid);
    setPrice(product.price);
  };

  const calculateTotalPrice = () => {
    const total = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    setTotalPrice(total);
    setStoredTotalPrice(total)
  };

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <span>Product: </span>
        </Col>
        <Col>
          <Form.Select ref={pRef} onChange={handleProductChanged}>
            {productList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col xs={2}>Price:</Col>
        <Col>{price}</Col>
      </Row>
      <Row>
        <Col xs={2}>
          <span>Quantity: </span>
        </Col>
        <Col>
          <input type="text" ref={qRef} defaultValue={1} />
        </Col>
      </Row>
      <Button variant="info" onClick={handleAdd}>
        Add
      </Button>
      <Row className="mt-3">
        <Col xs={6}>
          <Button variant="light" onClick={() => sort('asc')}>
            Sort A-Z <i className="bi bi-arrow-up"></i>
          </Button>
          <Button variant="light" onClick={() => sort('desc')}>
            Sort Z-A <i className="bi bi-arrow-down"></i>
          </Button>
        </Col>
      </Row>

      <DataTable
        data={filteredSelectedItems}
        onDelete={deleteItemByIndex}
        onFilter={filter}
        onSort={sort}
      />
      <Row>
        <Col xs={2}>Total Price:</Col>
        <Col>{totalPrice}</Col>
      </Row>
    </Container>
  );
}

export default App;