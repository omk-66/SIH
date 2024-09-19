import * as z from "zod";

export const downloadSchema = z.object({
    species: z.string().optional(),
    dataType: z.enum(["occurrence", "abundance"], { invalid_type_error: "Data Type is required" }),
    location: z.string().min(1, "Location is required"),
    dataFormat: z.enum(["csv", "json", "xlsx"], { invalid_type_error: "Data Format is required" }),
});