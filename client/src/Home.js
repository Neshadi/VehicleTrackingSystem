// src/App.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import AddVehicle from "./components/AddVehicle";
import VehicleList from "./components/VehicleList";

const Home = () => {
	const [vehicles, setVehicles] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		// Update the API URL to use the remote server address
		axios
			.get("http://ec2-51-20-121-222.eu-north-1.compute.amazonaws.com:3001/api/cars")
			.then((response) => setVehicles(response.data))
			.catch((error) => console.error(error));
	}, []);

	const handleAddVehicle = (newVehicle) => {
		console.log("new vehicle", newVehicle);

		setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
	};

	const handleContactOwner = (email) => {
		alert(`Contacting the owner of the vehicle at ${email}`);
	};

	const handleDeleteVehicle = (vehicleId) => {
		console.log(`Deleting ${vehicleId}`);
		axios
			.delete(`http://ec2-51-20-121-222.eu-north-1.compute.amazonaws.com:3001/api/cars/${vehicleId}`)
			.then((response) => {
				// Filter out the deleted vehicle from the state
				setVehicles((prevVehicles) =>
					prevVehicles.filter((vehicle) => vehicle._id !== vehicleId)
				);
			})
			.catch((error) => console.error(error));
	};

	const handleUpdateVehicle = async (updatedVehicle) => {
		try {
			const response = await axios.put(
				`http://ec2-51-20-121-222.eu-north-1.compute.amazonaws.com:3001/api/cars/${updatedVehicle._id}`,
				updatedVehicle
			);

			// Handle the response
			console.log("Vehicle updated successfully:", response.data);

			// Update the vehicles array with the updated vehicle
			setVehicles((prevVehicles) =>
				prevVehicles.map((vehicle) =>
					vehicle._id === updatedVehicle._id ? response.data : vehicle
				)
			);
		} catch (error) {
			// Handle errors, e.g., show an error message to the user
			console.error("Error updating vehicle:", error);
		}
	};

	return (
		<div className="main-container">
			<h1 className="gfg">Tharukaa Car Sale</h1>
			<h1>Car Tracking System</h1>
			<button onClick={() => setShowForm(!showForm)}>
				{showForm ? "Close" : "Add New Vehicle"}
			</button>
			<div className="">
				{showForm && <AddVehicle onAddVehicle={handleAddVehicle} />}
				{vehicles && (
					<VehicleList
						onDeleteVehicle={handleDeleteVehicle}
						onUpdateVehicle={handleUpdateVehicle}
						vehicles={vehicles}
						onContactOwner={handleContactOwner}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
