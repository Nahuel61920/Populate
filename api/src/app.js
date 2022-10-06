import express from "express";
import { sequelize } from "./db.js";
import cors from "cors";
const app = express();
app.use(cors())


var priorityScore = [{
    score: 0,
}]


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

app.get("/api/facilities/:id/nurses/:nurse_id", async (req, res) => {
    const { id, nurse_id } = req.params;
    const nurses = await sequelize.query("SELECT nurse_id, worked_shift, call_out, no_call_no_show FROM clinician_work_history WHERE facility_id = :id AND nurse_id = :nurse_id", {
        replacements: { id, nurse_id },
        type: sequelize.QueryTypes.SELECT,
    });

    priorityScore = [
        {
            score: 0,
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

    res.send(nurses.concat(priorityScore));
});


app.get("/api/facilities/:id/nurses/:nurse_id/priority", async (req, res) => {
    const { id, nurse_id } = req.params;
    const nurses = await sequelize.query("SELECT nurse_id, worked_shift, call_out, no_call_no_show FROM clinician_work_history WHERE facility_id = :id AND nurse_id = :nurse_id", {
        replacements: { id, nurse_id },
        type: sequelize.QueryTypes.SELECT,
    });

    priorityScore = [
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




app.get("/api/jobs", async (req, res) => {
    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs", {
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(jobs);
});

app.get("/api/jobs/:id", async (req, res) => {
    const { id } = req.params;
    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs WHERE job_id = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(jobs);
});

app.get("/api/jobs/:id/remaining", async (req, res) => {
    const { id } = req.params;
    const jobs = await sequelize.query("SELECT job_id, facility_id, total_number_nurses_needed, nurse_type_needed FROM jobs WHERE job_id = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(jobs);
});


app.get("/api/nurses", async (req, res) => {
    const nurses = await sequelize.query("SELECT nurse_id, nurse_name, nurse_type FROM nurses", {
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(nurses);
});

app.get("/api/nurses/:id", async (req, res) => {
    const { id } = req.params;

    const nurses = await sequelize.query("SELECT nurse_id, nurse_name, nurse_type FROM nurses WHERE nurse_id = :id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });
    res.send(nurses);
});





app.get("/api/facilities/:id/nurses/:nurse_id/shifts", async (req, res) => {
    const { id, nurse_id } = req.params;
    const nurses = await sequelize.query("SELECT nurse_id, worked_shift, call_out, no_call_no_show FROM clinician_work_history WHERE facility_id = :id AND nurse_id = :nurse_id", {
        replacements: { id, nurse_id },
        type: sequelize.QueryTypes.SELECT,
    });

    priorityScore = [
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
    });

    res.send(priorityScore);
});



export default app;