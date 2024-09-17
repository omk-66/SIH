import z from "zod";

// Update schema to accept csv, json, and xlsx formats
export const uploadSchema = z.object({
    datasetName: z.string().min(1, "Dataset Name is required"),
    dataType: z.enum(["occurrence", "abundance"], { invalid_type_error: "Data Type is required" }),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
    location: z.string().min(1, "Location is required"),
    species: z.string().optional(),
    comments: z.string().optional(),
    file: z
        .instanceof(File)
        .refine((file) =>
            ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file?.type), {
            message: "Only CSV, JSON, or XLSX files are allowed.",
        })
        .optional(),
    dataFormat: z.enum(["csv", "json", "xlsx"], { invalid_type_error: "Data Format is required" }),
});
