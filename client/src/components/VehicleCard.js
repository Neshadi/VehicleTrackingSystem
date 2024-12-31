import moment from "moment";
import React, { useState } from "react";

const VehicleCard = ({
	vehicle,
	onContactOwner,
	onDeleteVehicle,
	onUpdateVehicle,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

	const handleUpdateClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setUpdatedVehicle(vehicle); // Reset to original values
	};

	const handleSaveClick = () => {
		// Implement the logic to save the updated details
		onUpdateVehicle(updatedVehicle);
		setIsEditing(false);
	};

	// Handle the input change for updating vehicle fields
	const handleInputChange = (fieldName, value) => {
		const [field, subField] = fieldName.split(".");

		// For serviceDates, update as an array of dates
		if (field === "serviceDates" && subField === undefined) {
			// Add the new service date while keeping previous ones
			const newServiceDate = moment(value).format("YYYY-MM-DD");
			setUpdatedVehicle((prevVehicle) => ({
				...prevVehicle,
				serviceDates: [...prevVehicle.serviceDates, newServiceDate],
			}));
		} else {
			// For other fields, update normally
			setUpdatedVehicle((prevVehicle) => ({
				...prevVehicle,
				[field]: subField
					? { ...prevVehicle[field], [subField]: value }
					: value,
			}));
		}
	};

	// Handle removing a service date
	const handleRemoveServiceDate = (dateToRemove) => {
		setUpdatedVehicle((prevVehicle) => ({
			...prevVehicle,
			serviceDates: prevVehicle.serviceDates.filter(
				(date) => date !== dateToRemove
			),
		}));
	};

	return (
		<div className="vehicle-card">
			{isEditing ? (
				// Render editable fields for updating details
				<div>
					<label>
						Company Name:
						<input
							type="text"
							value={updatedVehicle.companyName}
							onChange={(e) =>
								handleInputChange("companyName", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Distance Covered:
						<input
							type="number"
							value={updatedVehicle.distanceCovered}
							onChange={(e) =>
								handleInputChange(
									"distanceCovered",
									e.target.value
								)
							}
							required
						/>
					</label>
					<label>
						Mileage:
						<input
							type="number"
							value={updatedVehicle.mileage}
							onChange={(e) =>
								handleInputChange("mileage", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Add Service Date:
						<input
							type="date"
							value={""} // Empty value for adding a new service date
							onChange={(e) =>
								handleInputChange("serviceDates", e.target.value)
							}
							required
						/>
					</label>
					{/* Display all current service dates */}
					<h4>Current Service Dates:</h4>
					<ul>
						{updatedVehicle.serviceDates.map((date, index) => (
							<li key={index} className="service-date-item">
								{moment(date).format("MMMM D, YYYY")}
								<button className="service"
									onClick={() => handleRemoveServiceDate(date)}
									
								>
									Remove
								</button>
							</li>
						))}
					</ul>
					<label>
						Owner Name:
						<input
							type="text"
							value={updatedVehicle.owner.name}
							onChange={(e) =>
								handleInputChange("owner.name", e.target.value)
							}
							required
						/>
					</label>
					<label>
						Owner Email:
						<input
							type="email"
							value={updatedVehicle.owner.email}
							onChange={(e) =>
								handleInputChange("owner.email", e.target.value)
							}
							required
						/>
					</label>
					<button onClick={handleSaveClick}>Save</button>
					<button onClick={handleCancelClick}>Cancel</button>
				</div>
			) : (
				// Display details in view mode
				<div>
					<h3 style={{ fontWeight: "bold" }}>
						{vehicle.companyName}
					</h3>
					<p>
						<span style={{ fontWeight: "bold" }}>
							Distance Covered:
						</span>{" "}
						{vehicle.distanceCovered}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Mileage:</span>{" "}
						{vehicle.mileage}
					</p>

					{vehicle.owner && (
						<div>
							<p>
								<span style={{ fontWeight: "bold" }}>
									Owner Name:
								</span>{" "}
								{vehicle.owner.name}
							</p>
							<p>
								<span style={{ fontWeight: "bold" }}>
									Owner Email:
								</span>{" "}
								{vehicle.owner.email}
							</p>
						</div>
					)}

					{vehicle.image && (
						<div className="image-container">
							<img
								src={vehicle.image}
								alt={vehicle.companyName}
								className="vehicle-image"
							/>
						</div>
					)}
					<p>Service Dates:</p>
					<ul>
						{vehicle.serviceDates.map((item, i) => (
							<li key={i}>{moment(item).format("MMMM D, YYYY")}</li>
						))}
					</ul>

					<div className="button-container">
						<button
							className="contact"
							onClick={() =>
								onContactOwner(
									vehicle.owner ? vehicle.owner.email : ""
								)
							}
						>
							Contact Owner
						</button>
						<button
							className="delete"
							onClick={() => onDeleteVehicle(vehicle._id)}
						>
							Delete Vehicle
						</button>
						<button className="update" onClick={handleUpdateClick}>
							Update
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default VehicleCard;
