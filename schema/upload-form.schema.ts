import * as z from "zod";
import { zfd } from "zod-form-data";

// Define the Zod schema for the upload form
export const uploadSchema = z.object({
    datasetName: z.string().min(1, "Dataset Name is required"),
    dataType: z.enum(["occurrence", "abundance"], { invalid_type_error: "Data Type is required" }),
    location: z.string().min(1, "Location is required"),
    species: z.string().optional(),
    comments: z.string().optional(),
    file: zfd.file().refine((file) =>
        ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type),
        {
            message: "Only CSV, JSON, or XLSX files are allowed.",
        }
    ),
    dataFormat: z.enum(["csv", "json", "xlsx"], { invalid_type_error: "Data Format is required" }),
});

// Create a TypeScript type from the schema
export type UploadFormData = z.infer<typeof uploadSchema>;
