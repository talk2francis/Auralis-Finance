import { z } from "zod";
import { verifyRatingHash } from "@auralis/core";
import { HashSchema, json } from "../../../../lib/api";
const Body = z.object({ ratingJson: z.unknown(), ratingHash: HashSchema });
export async function POST(req: Request) { const body = Body.parse(await req.json()); return json({ valid: verifyRatingHash(body.ratingJson, body.ratingHash) }); }
