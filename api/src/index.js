import app from "./app.js";
import express from "express";

app.use(express.json());

app.set("port", process.env.PORT || 3001);


app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});


