import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Score from "./Components/Score";
import facilitiesContext from "./context/facilities/facilitiesContext";

function App() {
  const [facilitiesid, setFacilitiesid] = useState(0);

  const facilitiesContexto = useContext(facilitiesContext);
  const { facilities, getFacilities, getFacility, cleanFacility } = facilitiesContexto;

  function filterFacilities(e) {
    e.preventDefault(e);
    setFacilitiesid(e.target.value);
    cleanFacility();
  }

  function onSubmit(e) {
    e.preventDefault(e);
    for (let i = 1; i <= 5; i++) {
      getFacility(facilitiesid, i);
    }
  }

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <div className="App">
      <h1>Populate</h1>
      <div>
        <select onChange={(e) => filterFacilities(e)}>
          {facilities.map((facility) => (
            <option key={facility.facility_id} value={facility.facility_id}>
              {facility.facility_name}
            </option>
          ))}
        </select>
        <button onClick={(e) => onSubmit(e)}>Submit</button>
      </div>
      <Score/>
    </div>
  );
}

export default App;
