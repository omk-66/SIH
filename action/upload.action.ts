"use server";

import { actionClient } from "@/lib/safe-action";
import { uploadSchema } from "@/schema/upload-form.schema";

export const uploadAction = actionClient
    .schema(uploadSchema)
    .action(async ({ parsedInput }) => {
        console.log("Received Data:", parsedInput);
        // Process your data here
        return { ok: true };
    });
