import React, { useState, useRef } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const DataTable = ({ data, onDelete, onFilter }) => {
    const sRef = useRef();

    const handleDelete = (index) => {
        console.debug('Delete', index);
        onDelete(index);
    };

    const handleSearch = () => {
        console.log('Search', sRef.current.value)
        const keyword = sRef.current.value
        onFilter(keyword)
    };

    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '}
            <Button onClick={handleSearch} 
            variant="outline-primary">
                <i className="bi bi-search"></i>Search</Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i
                                    className="bi bi-trash"
                                    onClick={() => handleDelete(index)}
                                ></i>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
