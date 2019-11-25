import React from 'react'
import './MissingPage.css'


const MissingPage = (props) => {
    return (
        <div className="MissingPage">
            <div className="missingPage-cont">
                <h1>Error 404 - Page Not Found</h1>
                <button onClick={() => props.history.goBack()}>Back</button>
            </div>
        </div>
    )
}
export default MissingPage