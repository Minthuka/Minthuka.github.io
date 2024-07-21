import React from 'react';
import Table from 'react-bootstrap/table'

const DataTable = ({ data }) => {
    return (
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
<th>Id</th>
<th>Product Name</th>
<th>Price</th>
<th>Qty</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                       <td>{item.id}</td>
                       <td>{item.name}</td>
                       <td>{item.price}</td>
                       <td>{item.qty}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DataTable;