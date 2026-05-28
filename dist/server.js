"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
const TEMP_DIR = path_1.default.resolve(process.cwd(), "temp").replace(/\\/g, "/");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
        filePath = path_1.default.join(process.cwd(), "temp", "code.py");
        fs_1.default.writeFileSync(filePath, code);
        command = `docker run --rm --memory=256m --cpus=0.5 -v polyglot-sandbox-automator_shared-temp:/app python-runner python /app/code.py`;
    }
    // JAVASCRIPT
    else if (language === "javascript") {
        filePath = path_1.default.join(process.cwd(), "temp", "code.js");
        fs_1.default.writeFileSync(filePath, code);
        command = `docker run --rm --memory=256m --cpus=0.5 -v polyglot-sandbox-automator_shared-temp:/app nodejs-runner node /app/code.js`;
    }
    else {
        return res.status(400).json({
            error: "Unsupported language"
        });
    }
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
