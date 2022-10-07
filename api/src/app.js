import express from "express";
import { sequelize } from "./db.js";
import cors from "cors";
const app = express();
app.use(cors())




app.get("/api/facilities", async (req, res) => {
    const facilities = await sequelize.query("SELECT facility_id, facility_name FROM facilities", {
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(facilities);
});

app.get("/api/facilities/:id", async (req, res) => {
    const { id } = req.params;
    const facilities = await sequelize.query("SELECT facility_id, facility_name FROM facilities WHERE facility_id = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(facilities);
});



app.get("/api/facilities/:id/nurses", async (req, res) => {
    const { id } = req.params;
    try {
        const nurses = await sequelize.query("SELECT nurse_id, worked_shift, call_out, no_call_no_show FROM clinician_work_history WHERE facility_id = :id", {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
        });

        res.send(nurses);
    } catch (error) {
        console.log(error);
    }
});


app.get("/api/facilities/:id/nurses/:nurse_id/priority", async (req, res) => {
    const { id, nurse_id } = req.params;
    const nurses = await sequelize.query("SELECT nurse_id, worked_shift, call_out, no_call_no_show FROM clinician_work_history WHERE facility_id = :id AND nurse_id = :nurse_id", {
        replacements: { id, nurse_id },
        type: sequelize.QueryTypes.SELECT,
    });

    let priorityScore = [
        {
            score: 0,
            id: nurse_id
        }
    ]

    nurses.forEach(nurse => {
        if (nurse.worked_shift) {
            priorityScore.map((item) => {
                item.score += 1
            })
        }
        if (nurse.call_out) {
            priorityScore.map((item) => {
                item.score -= 3
            })
        }
        if (nurse.no_call_no_show) {
            priorityScore.map((item) => {
                item.score -= 5
            })
        }
    });

    res.send(priorityScore);

});

// query #4
app.get("/api/jobs/remaining", async (req, res) => {
    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    const nurseHiredJobs = await sequelize.query("SELECT job_id, nurse_id FROM nurse_hired_jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    let jobsFilter = jobs.map(job => {
        let nurseHiredJobsFilter = nurseHiredJobs.filter(nurseHiredJob => nurseHiredJob.job_id === job.job_id);
        let jobsCount = job.total_number_nurses_needed - nurseHiredJobsFilter.length;

        let jobRemaining = {
            job,
            jobsCount,
        }

        return jobRemaining;
    });

    res.send(jobsFilter);

});

// query #5
app.get("/api/nurses/jobs", async (req, res) => {
    const nurses = await sequelize.query("SELECT nurse_id, nurse_name, nurse_type FROM nurses", {
        type: sequelize.QueryTypes.SELECT,
    });

    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    const nurseHiredJobs = await sequelize.query("SELECT job_id, nurse_id FROM nurse_hired_jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    let nursesFilter = nurses.map(nurse => {
        let jobsFilter = jobs.filter(job => job.nurse_type_needed === nurse.nurse_type);
        let nurseHiredJobsFilter = nurseHiredJobs.filter(nurseHiredJob => jobsFilter.some(job => job.job_id === nurseHiredJob.job_id));
        let jobsCount = jobsFilter.length - nurseHiredJobsFilter.length + 1;

        let nurseJobs = {
            nurse,
            jobsCount,
        }

        return nurseJobs;
    });

    res.send(nursesFilter);
});

// query #6
app.get("/api/max/facilities", async (req, res) => {
    const facilities = await sequelize.query("SELECT facility_id, facility_name FROM facilities", {
        type: sequelize.QueryTypes.SELECT,
    });

    const nurseHiredJobs = await sequelize.query("SELECT job_id, nurse_id FROM nurse_hired_jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs", {
        type: sequelize.QueryTypes.SELECT,
    });

    const nurses = await sequelize.query("SELECT nurse_id, nurse_name, nurse_type FROM nurses", {
        type: sequelize.QueryTypes.SELECT,
    });

    let facilitiesFilter = facilities.map(facility => {
        let jobsFilter = jobs.filter(job => job.facility_id === facility.facility_id);
        let nurseHiredJobsFilter = nurseHiredJobs.filter(nurseHiredJob => jobsFilter.some(job => job.job_id === nurseHiredJob.job_id));
        let nursesFilter = nurses.filter(nurse => nurseHiredJobsFilter.some(nurseHiredJob => nurseHiredJob.nurse_id === nurse.nurse_id));
        let nursesCount = nursesFilter.reduce((acc, nurse) => {
            acc[nurse.nurse_name] = (acc[nurse.nurse_name] || 0) + 1;
            return acc;
        }, {});

        let maxNurse = Object.keys(nursesCount).reduce((a, b) => nursesCount[a] > nursesCount[b] ? a : b);

        let facilityNurse = {
            facility,
            maxNurse,
        }

        return facilityNurse;
    });

    res.send(facilitiesFilter);

});



export default app;