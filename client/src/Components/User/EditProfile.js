import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const EditProfile = () => {
    const { getLoggedIn, user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("male");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);
    const [address, setAddress] = useState("");
    const [blood, setBlood] = useState(0);
    const [edit, setEdit] = useState(true);
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAge(user.age);
            setGender(user.gender);
            setMail(user.email);
            setPhone(user.phone);
            const stateIndex = data.states.findIndex(e => e.state === user.state);
            if (stateIndex !== -1) {
                setState(stateIndex);
                setDistrict(data.states[stateIndex].districts.indexOf(user.district));
            }
            setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
            setAddress(user.address);
            setBlood(bloodGroups.indexOf(user.bloodGroup));
        }
    }, [user, data.states, bloodGroups]);

    const update = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            age,
            gender,
            bloodGroup: bloodGroups[blood],
            email: mail,
            phone,
            state: data.states[state].state,
            district: data.states[state].districts[district],
            address,
        };

        try {
            await axios.put(`${API_URL}/user/`, formData, { withCredentials: true });
            setEdit(!edit);
            await getLoggedIn();
            alert("User updated successfully");
        } catch (error) {
            alert("User not updated");
        }
    };

    return (
        <div>
            <section className="flex justify-center items-center">
                <form
                    className="space-y-2"
                    onSubmit={update}
                >
                    <table className="w-full" cellPadding={15}>
                        <tbody>
                            <tr>
                                <td>
                                    <label className="font-semibold leading-8">Name:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                        disabled={edit}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <label className="font-semibold leading-8">Age:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="number"
                                        placeholder="Enter your age"
                                        required
                                        disabled={edit}
                                        value={age}
                                        onChange={(e) => setAge(parseInt(e.target.value, 10))}
                                    />
                                </td>
                                <td>
                                    <label htmlFor="gender" className="font-semibold leading-8">Gender:<font color="red">*</font></label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        disabled={edit}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full p-3 text-md border border-silver rounded"
                                    >
                                        <option value="male" selected={gender === "male"}>Male</option>
                                        <option value="female" selected={gender === "female"}>Female</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="blood" className="font-semibold leading-8">Blood Group:<font color="red">*</font></label>
                                    <select
                                        name="blood"
                                        id="blood"
                                        disabled={edit}
                                        onChange={(e) => setBlood(parseInt(e.target.value, 10))}
                                        className="w-full p-3 text-md border border-silver rounded"
                                    >
                                        {bloodGroups.map((e, i) => (
                                            <option key={i} value={i} selected={blood === i}>{e}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <label className="font-semibold leading-8">Mobile:<font color="red">*</font></label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="number"
                                        placeholder="Enter your mobile"
                                        required
                                        disabled={edit}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </td>
                                <td className="absolute">
                                    <button
                                        type="button"
                                        onClick={() => setEdit(!edit)}
                                        className="w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom"
                                    >
                                        {edit ? "Edit" : "Cancel"}
                                    </button>
                                    <br />
                                    <button
                                        type="submit"
                                        className={`w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom ${edit && "hidden"}`}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="font-semibold leading-8">Password:</label><font color="red">*</font>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                        disabled
                                        value={password}
                                    />
                                </td>
                                <td>
                                    <label className="font-semibold leading-8">Email:</label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="email"
                                        placeholder="Enter your email"
                                        disabled={edit}
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="state" className="font-semibold leading-8">State:<font color="red">*</font></label>
                                    <select
                                        name="state"
                                        id="state"
                                        disabled={edit}
                                        onChange={(e) => { setState(parseInt(e.target.value, 10)); setDistrict(0); }}
                                        className="w-full p-3 text-md border border-silver rounded"
                                    >
                                        {data.states.map((e, i) => (
                                            <option key={i} value={i} selected={state === i}>{e.state}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <label htmlFor="district" className="font-semibold leading-8">District:<font color="red">*</font></label>
                                    <select
                                        name="district"
                                        id="district"
                                        disabled={edit}
                                        onChange={(e) => setDistrict(parseInt(e.target.value, 10))}
                                        className="w-full p-3 text-md border border-silver rounded"
                                    >
                                        {data.states[state].districts.map((e, i) => (
                                            <option key={i} value={i} selected={district === i}>{e}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <label className="font-semibold leading-8">Address:</label>
                                    <input
                                        className="w-full p-3 text-md border border-silver rounded"
                                        type="text"
                                        placeholder="Enter your address"
                                        disabled={edit}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </section>
        </div>
    );
}

export default EditProfile;
