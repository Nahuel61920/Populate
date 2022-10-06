import React, { useContext, useEffect, useState } from "react";
import facilitiesContext from "../context/facilities/facilitiesContext";

function Score() {
    const facilitiesContexto = useContext(facilitiesContext);
    const { facilityID } = facilitiesContexto;

    if (facilityID){
        facilityID.sort((a, b) => (a.score > b.score) ? 1 : -1);
    } else if (facilityID.score === facilityID.score) {
        facilityID.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }

  return (
    <div className="score">
        {
            facilityID ? (
                facilityID.map((facility) => (
                    <div key={facility.id} className="card">
                        <h2>{facility.id}</h2>
                    </div>
                ))
            ) : null
        }
    </div>
  )
}

export default Score