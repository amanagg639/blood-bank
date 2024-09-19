import React, { useState, useEffect } from 'react';
import data from "../../assets/data.json";
import axios from "axios";

const Camps = () => {
    const [stateIndex, setStateIndex] = useState(0);
    const [districtIndex, setDistrictIndex] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [filteredCamps, setFilteredCamps] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const stateName = data.states[stateIndex].state;
        const districtName = data.states[stateIndex].districts[districtIndex];
        
        axios.get(`${API_URL}/camps/allCamps/${stateName}/${districtName}/${date}`)
            .then((response) => setFilteredCamps(response.data))
            .catch((error) => alert("Something went wrong. Please try again."));
    }, [stateIndex, districtIndex, date, API_URL]);

    return (
        <div className='px-7'>
            <table cellPadding={7}>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="state" className="font-semibold leading-8">State:<font color="red">*</font></label>
                            <select 
                                name="state" 
                                id="state" 
                                onChange={(e) => { setStateIndex(e.target.value); setDistrictIndex(0); }} 
                                className="w-full p-3 text-md border border-silver rounded"
                                value={stateIndex}
                            >
                                {data.states.map((state, index) => (
                                    <option key={index} value={index}>{state.state}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <label htmlFor="district" className="font-semibold leading-8">District:<font color="red">*</font></label>
                            <select 
                                name="district" 
                                id="district" 
                                onChange={(e) => setDistrictIndex(e.target.value)} 
                                className="w-full p-3 text-md border border-silver rounded"
                                value={districtIndex}
                            >
                                {data.states[stateIndex].districts.map((district, index) => (
                                    <option key={index} value={index}>{district}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <label htmlFor="date" className="font-semibold leading-8">Date:<font color="red">*</font></label>
                            <input 
                                type="date" 
                                value={date} 
                                className="w-full p-3 text-md border border-silver rounded"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />

            <table className='w-full text-center'>
                <thead>
                    <tr>
                        <th className="p-3 text-md border border-silver rounded">Date</th>
                        <th className="p-3 text-md border border-silver rounded">Camp Name</th>
                        <th className="p-3 text-md border border-silver rounded">Address</th>
                        <th className="p-3 text-md border border-silver rounded">State</th>
                        <th className="p-3 text-md border border-silver rounded">District</th>
                        <th className="p-3 text-md border border-silver rounded">Contact</th>
                        <th className="p-3 text-md border border-silver rounded">Conducted By</th>
                        <th className="p-3 text-md border border-silver rounded">Organized By</th>
                        <th className="p-3 text-md border border-silver rounded">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCamps.length > 0 ? (
                        filteredCamps.map((camp, index) => (
                            <tr key={index}>
                                <td className="p-3 text-md border border-silver rounded">{new Date(camp.date).toLocaleDateString()}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.name}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.address}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.state}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.district}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.contact}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.bankId?.name || "N/A"}</td>
                                <td className="p-3 text-md border border-silver rounded">{camp.organizer}</td>
                                <td className="p-3 text-md border border-silver rounded"><code>{camp.startTime} - {camp.endTime}</code></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="p-3 text-md border border-silver rounded">No camps available for the selected date and location.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Camps;
