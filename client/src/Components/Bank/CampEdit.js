import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Popup from '../Util/Popup';
import CampsCheck from './CampsCheck';

const CampEdit = (props) => {
    const [popup, setPopup] = useState(-1);
    const [sent, setSent] = useState([]);
    
    return (
        <div>
            {
                props.popup !== -1 && <div className="popup h-[150%] overflow-scroll z-10">
                    <div className='popup_inner rounded-lg p-7 overflow-scroll w-fit'>
                        <div>
                            <h1 className='text-2xl font-bold inline-block'>
                                Camp Donors
                            </h1>
                            <i onClick={() => props.setPopup(-1)} className="fa-solid fa-circle-xmark text-blood fa-xl float-right cursor-pointer hover:opacity-80"></i>
                        </div><br />
                        <div className='grid grid-cols-3 gap-4 w-max'>
                            {
                                props.data.donors.map((k, j) => {
                                    return (
                                        <CampsCheck setSent={setSent} popup={popup} setPopup={setPopup} data={k} camp={props.data._id} key={j} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            <Popup popup={popup} setPopup={setPopup} data={sent} handle="User" />
        </div>
    )
}

export default CampEdit;
