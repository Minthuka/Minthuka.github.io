import React, { useState, useRef } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const DataTable = ({ data, onDelete, onFilter, discount }) => {
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

    const groupedData = data.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.name === item.name);
        if (existingItem) {
            existingItem.qty += Number(item.qty);  
        } else {
            acc.push({ ...item, qty: Number(item.qty) });  
        }
        return acc;
    }, []);

    const total = groupedData.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountedTotal = total - discount;

    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Qty</th>
                        <th></th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i
                                    className="bi bi-trash"
                                    onClick={() => handleDelete(index)}
                                ></i>
                            </td>
                            <td>{item.qty}</td>
                            <td>{item.name}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{(item.price * item.qty * 0.1).toFixed(2)}</td>
                            <td>{(item.price * item.qty - item.price * item.qty * 0.1).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>{discount.toFixed(2)}</td>
                        <td>{discountedTotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;