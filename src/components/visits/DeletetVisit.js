import React from 'react'

const DeleteVisit = ({ onClose, deleteVisit, id, userID, time }) => {

    return (
        <div className="popUpDeleteVisit">
            <div className="confirmDeleteVisit">
                <h3>Czy chcesz trwale usunąć wizytę z {time}?</h3>
                <div className="btnsDeleteVisit">
                    <button onClick={(e) => { e.preventDefault(); deleteVisit(id, userID) }} className="agree">Tak</button>
                    <button onClick={onClose} className="cancel">Nie</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteVisit