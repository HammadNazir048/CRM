import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const configPath = join(process.cwd(), ".vercel", "output", "config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

if (!config.crons) {
	console.log("• no crons in the build output");
} else {
	delete config.crons;
	writeFileSync(configPath, JSON.stringify(config));
	console.log("• removed crons — a Hobby plan rejects sub-daily schedules");
}
