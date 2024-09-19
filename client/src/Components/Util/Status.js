import React, { useState } from 'react';
import axios from "axios";

const Status = (props) => {
    const [status, setStatus] = useState(props.status);
    const choices = ['Pending', 'Approved', 'Denied', (props.handle === "donations" ? 'Donated' : "Completed")];
    const API_URL = process.env.REACT_APP_API_URL; // Access environment variable

    const updateStatus = async (newStatus) => {
        let url;
        const updateData = { id: props.id, status: newStatus };

        if (newStatus === "Donated") {
            url = `${API_URL}/bank/updateStock`;
            await axios.put(url, { bloodGroup: props.bloodGroup, units: props.units });
        } else if (newStatus === "Completed") {
            url = `${API_URL}/bank/deleteStock`;
            await axios.put(url, { bloodGroup: props.bloodGroup, units: props.units });
        }
        url = `${API_URL}/bank/${props.handle}`;
        await axios.put(url, updateData);
    };

    return (
        <div>
            <select
                name="status"
                id="status"
                onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                        await updateStatus(newStatus);
                        setStatus(newStatus);
                        props.setId(props.i);
                        props.setStatus(newStatus);
                    } catch (error) {
                        alert("Something went wrong");
                    }
                }}
                disabled={status === "Denied" || status === "Donated" || status === "Completed"}
                className={`${status === "Pending" ? "border-metal text-metal" : 
                            status === "Approved" ? "border-yellowX text-yellowX" : 
                            status === "Denied" ? "border-red text-red" : 
                            "border-green text-green"} border-2 px-4 py-2 rounded-xl hover:shadow-md cursor-pointer`}
            >
                {choices.map((e) => (
                    <option key={e} value={e} selected={status === e}>{e}</option>
                ))}
            </select>
        </div>
    );
};

export default Status;
