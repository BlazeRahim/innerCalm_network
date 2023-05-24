import React, { useState } from "react";

const UpdateAvailability = () => {
  const [timeSlots, setTimeSlots] = useState([]);

  const handleAddSlot = () => {
    setTimeSlots([...timeSlots, { startTime: "", endTime: "" }]);
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = [...timeSlots];
    updatedSlots.splice(index, 1);
    setTimeSlots(updatedSlots);
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the updated time slots to the server
    // Example: send to /updateavailability endpoint using fetch or axios
    console.log(timeSlots);
  };

  return (
    <div>
      <h2>Update Availability</h2>
      <form onSubmit={handleSubmit}>
        {timeSlots.map((slot, index) => (
          <div key={index}>
            <input
              type="time"
              value={slot.startTime}
              onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
              required
            />
            <span> to </span>
            <input
              type="time"
              value={slot.endTime}
              onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveSlot(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSlot}>
          Add Slot
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateAvailability;
