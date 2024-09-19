import React, { useState, useEffect } from 'react'
import axios from "axios";

const Stock = () => {
    const [data, setData] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios.get(`${API_URL}/bank/getStock`).then((r) => {
            setData(r.data.stock);
        }).catch((err) => { alert("Something went wrong") })
    }, []);
    return (
        <div>
            <div className="flex justify-center flex-wrap text-center text-white-900 text-2xl">
                {
                    data && Object.keys(data).map((e) => {
                        return (
                            <div className='bg-blood h-22 w-22 m-10 p-7 rounded-b-full'>
                                <p className='font-bold'>{data[e]}mL</p>
                                <code>{e}</code>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Stock
