import React, { useContext, useEffect, useState } from "react";
import queryContext from "../context/query/queryContext";

function ButtomQuery() {

    const queryContexto = useContext(queryContext);
    const { nurses, jobs, facility, getFacility, getNurses, getJobs} = queryContexto;

    useEffect(() => {
        getNurses();
        getJobs();
        getFacility();
    }, []);

    const handleQ4 = () => {
        console.log("Execute Q4 Query", nurses);
    };

    const handleQ5 = () => {
        console.log("Execute Q5 Query", jobs);
    };

    const handleQ6 = () => {
        console.log("Execute Q6 Query", facility);
    };
    
    return (
        <div>
            <button onClick={handleQ4}>Execute Q4 Query</button>
            <button onClick={handleQ5}>Execute Q5 Query</button>
            <button onClick={handleQ6}>Execute Q6 Query</button>
        </div>
    );
}

export default ButtomQuery;
