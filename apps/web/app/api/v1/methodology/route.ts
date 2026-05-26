import { METHODOLOGY } from "@auralis/core";
import { json } from "../../../../lib/api";
export async function GET() { return json(METHODOLOGY); }
