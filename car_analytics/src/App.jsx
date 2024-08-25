import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import carsData from './data/cars.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [filteredCars, setFilteredCars] = useState(carsData.cars);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCars = carsData.cars.filter((car) => {
      return (
        car.brand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
      );
    });
    setSearchTerm(searchTerm);
    setFilteredCars(filteredCars);
  };

  const handleBrandSelect = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    if (selectedBrand === 'All') {
      setFilteredCars(carsData.cars);
    } else {
      setFilteredCars(carsData.cars.filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase()));
    }
  };

  const brands = ['All', ...new Set(carsData.cars.map(car => car.brand))];

  return (
    <div className="container">
      <h1 className="text-primary text-center my-4">Available Cars List</h1>
      <div className="row mb-4">
        <div className="col-md-4 offset-md-4">
          <select
            value={selectedBrand}
            onChange={handleBrandSelect}
            className="form-select"
            style={{ width: '250px' }} // Add this line
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 offset-md-4">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by brand or model"
            className="form-control"
            style={{ width: '250px' }} // Add this line
          />
        </div>
      </div>

      <div className="row">
        {filteredCars.map((car) => (
          <div key={car.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Value: {car.valueInBaht} Baht</p>
                <p className="card-text">Number of cars: {car.numberOfCars}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;