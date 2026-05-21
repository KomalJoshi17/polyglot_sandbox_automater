import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const app = express();
const TEMP_DIR = path.resolve(process.cwd(), "temp").replace(/\\/g, "/");

app.use(cors());
app.use(express.json());

app.post("/execute", (req, res) => {

    const { language, code } = req.body;

    if (!language || !code) {
        return res.status(400).json({
            error: "Language and code are required"
        });
    }

    let filePath = "";
    let command = "";

    // PYTHON
    if (language === "python") {

        filePath = path.join(process.cwd(), "temp", "code.py");
        
        fs.writeFileSync(filePath, code);

        command = `docker run --rm --memory=256m --cpus=0.5 -v polyglot-sandbox-automator_shared-temp:/app python-runner python /app/code.py`;
    }

    // JAVASCRIPT
    else if (language === "javascript") {

        filePath = path.join(process.cwd(), "temp", "code.js");

        fs.writeFileSync(filePath, code);

        command = `docker run --rm --memory=256m --cpus=0.5 -v polyglot-sandbox-automator_shared-temp:/app nodejs-runner node /app/code.js`;
    }

    else {
        return res.status(400).json({
            error: "Unsupported language"
        });
    }

    exec(command, (error, stdout, stderr) => {

        if (error) {
            return res.status(500).json({
                error: stderr
            });
        }

        res.json({
            output: stdout
        });
    });
});

app.get("/", (req, res) => {
    res.send("Polyglot Sandbox Automator Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});