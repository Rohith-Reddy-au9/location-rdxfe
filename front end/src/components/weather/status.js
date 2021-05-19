import React from 'react'

const statusData = ({status}) => {
    let statusMessage = " "

    switch (status) {
        case "fetching" :
            statusMessage = "fetching weather data "
            break;
        case "unable":
            statusMessage = "unable to retrieve location"
            break;
        case "unsupport":
            statusMessage = "location tracking not supported or blocked";
            break
        default:
            statusMessage = " init"
        break
    }

    return (
        <h3 className='status-message'>{statusMessage}</h3>
    )
}

export default statusData


// this component shoes the status only according to switch cases 
// some browsers doesn't support that's why unsupport 
// location issues and 
// if all is well we will get the data 