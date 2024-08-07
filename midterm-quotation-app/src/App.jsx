import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import productList from './accessory-products.json';
import DataTable from './components/DataTable';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const deleteItemByIndex = (index) => {
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    setFilteredSelectedItems([...selectedItems]);
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
    calculateDiscount();
  };

  const handleProductChanged = (e) => {
    const pid = e.target.value;
    const product = productList.find((p) => p.id == pid);
    setPrice(product.price);
  };

  const handleClear = () => {
    setSelectedItems([]);
    setFilteredSelectedItems([]);
    setDiscount(0);
  };

  const calculateDiscount = () => {
    const total = filteredSelectedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountAmount = total * 0.1;
    setDiscount(discountAmount);
  };

  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Row>
            <Col>
              <Form.Label>Item</Form.Label>
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
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <span>{price}</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <input type="text" ref={qRef} defaultValue={1} />
            </Col>
          </Row>
          <Button variant="info" onClick={handleAdd} style={{ marginTop: '10px' }}>
            Add
          </Button>
        </Col>
        <Col xs={8}>
          <Row>
            <Col>
              <Button variant="danger" onClick={handleClear} style={{ marginBottom: '10px' }}>
                Clear
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <DataTable
                data={filteredSelectedItems}
                onDelete={deleteItemByIndex}
                onSort={sort}
                discount={discount}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;