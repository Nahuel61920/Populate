import React, { useContext, useEffect, useState } from "react";
import queryContext from "../context/query/queryContext";

function ButtomQuery() {

    const queryContexto = useContext(queryContext);
    const { nurses, nursesJobs, jobs, hiredJobs,  getNurses, getNursesJobs, getJobs, getNurseHiredJobs, cleanNursesJobs} = queryContexto;

    

    function callJobs() {
        jobs.map((job) => {
            getNurseHiredJobs(job.job_id);
        });
    }

    function callNursesJobs() {
        nurses.map((nurse) => (
            getNursesJobs(nurse.nurse_id)
        ));
    }



    useEffect(() => {
        getNurses();
        getJobs()
    }, []);

    const handleQ4 = () => {
        callJobs();
        cleanNursesJobs();
    };

    const handleQ5 = () => {
        callNursesJobs();
        cleanNursesJobs();
    };


    

    setTimeout(() => {
        if(hiredJobs.length === jobs.length && hiredJobs.length !== 0){
            console.log("Execute Q4 Query", hiredJobs);
        }
    }, 100);

    setTimeout(() => {
        if(nursesJobs.length === nurses.length && nursesJobs.length !== 0){
            console.log("Execute Q5 Query", nursesJobs);
        }
    }, 100);

    return (
        <div>
            <button onClick={handleQ4}>Execute Q4 Query</button>
            <button onClick={handleQ5}>Execute Q5 Query</button>
            <button>Execute Q6 Query</button>
        </div>
    );
}

export default ButtomQuery;
