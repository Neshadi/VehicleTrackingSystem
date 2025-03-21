import axios from "axios";
import React, { useState } from "react";

const AddVehicle = ({ onAddVehicle }) => {
	const [newVehicle, setNewVehicle] = useState({
		companyName: "",
		distanceCovered: "",
		mileage: "",
		serviceDates: [], // Store service dates as an array
		owner: {
			name: "",
			email: "",
		},
		image: "",
	});

	const [serviceDateInput, setServiceDateInput] = useState(""); // For entering a single service date

	const handleAddServiceDate = () => {
		if (serviceDateInput) {
			setNewVehicle({
				...newVehicle,
				serviceDates: [...newVehicle.serviceDates, serviceDateInput],
			});
			setServiceDateInput(""); // Clear input after adding
		}
	};

	const handleRemoveServiceDate = (index) => {
		const updatedServiceDates = newVehicle.serviceDates.filter(
			(_, i) => i !== index
		);
		setNewVehicle({ ...newVehicle, serviceDates: updatedServiceDates });
	};

	const handleAddVehicle = () => {
		axios
			.post("http://ec2-51-20-121-222.eu-north-1.compute.amazonaws.com:3001/api/cars/api/cars", newVehicle)
			.then((response) => {
				onAddVehicle(response.data);

				// Clear the form after successful submission
				setNewVehicle({
					companyName: "",
					distanceCovered: "",
					mileage: "",
					serviceDates: [],
					owner: {
						name: "",
						email: "",
					},
					image: "",
				});
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="form-container">
			<h2 style={{ color: "#007BFF", textAlign: "center" }}>
				Add a New Vehicle
			</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleAddVehicle();
				}}
			>
				<div className="form-row">
					<label>
						Company Name:
						<input
							type="text"
							value={newVehicle.companyName}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									companyName: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
					<label>
						Distance Covered:
						<input
							type="number"
							value={newVehicle.distanceCovered}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									distanceCovered: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>
				<div className="form-row">
					<label>
						Mileage:
						<input
							type="number"
							value={newVehicle.mileage}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									mileage: e.target.value,
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>

				{/* Service Dates Section */}
				<div className="form-row1">
					<label>
						Add Service Date:
						<input
							type="date"
							value={serviceDateInput}
							onChange={(e) => setServiceDateInput(e.target.value)}
							className="form-input"
						/>
					</label>
					<button
						type="button"
						onClick={handleAddServiceDate}
						className="form-button1"
					>
						Add Date
					</button>
				</div>
				<div className="form-row2">
					<ul>
						{newVehicle.serviceDates.map((date, index) => (
							<li key={index}>
								{date}
								<button
									type="button"
									onClick={() => handleRemoveServiceDate(index)}
									style={{ marginLeft: "10px", marginBottom: "10px",color: "white" }}
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="form-row">
					<label>
						Owner Name:
						<input
							type="text"
							value={newVehicle.owner.name}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									owner: {
										...newVehicle.owner,
										name: e.target.value,
									},
								})
							}
							required
							className="form-input"
						/>
					</label>
					<label>
						Owner Email:
						<input
							type="email"
							value={newVehicle.owner.email}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									owner: {
										...newVehicle.owner,
										email: e.target.value,
									},
								})
							}
							required
							className="form-input"
						/>
					</label>
				</div>
				<div className="form-row">
					<label>
						Image URL:
						<input
							type="text"
							value={newVehicle.image}
							onChange={(e) =>
								setNewVehicle({
									...newVehicle,
									image: e.target.value,
								})
							}
							className="form-input"
						/>
					</label>
				</div>
				<button type="submit" className="form-button">
					Add New Vehicle
				</button>
			</form>
		</div>
	);
};

export default AddVehicle;
