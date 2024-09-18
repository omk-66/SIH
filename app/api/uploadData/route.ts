import { NextResponse, NextRequest } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(request: NextRequest) {
    try {
        // Get form data from the request
        const formData = await request.formData();

        // Initialize an object to store form values
        const values: { [key: string]: any } = {};
        let file: File | undefined;

        formData.forEach((value, key) => {
            if (key === "file" && value instanceof File) {
                file = value;
            } else {
                values[key] = value;
            }
        });

        // Process the file if it's uploaded
        if (file) {
            const buffer = await file.arrayBuffer();
            const data = new Uint8Array(buffer);

            // Handle different file formats
            if (file.type === "text/csv") {
                // Parse CSV to JSON using xlsx
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                values["parsedFile"] = json;
            } else if (file.type === "application/json") {
                // Parse JSON file
                const text = new TextDecoder().decode(data);
                const json = JSON.parse(text);
                values["parsedFile"] = json;
            } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                // Parse XLSX to JSON using xlsx
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);
                values["parsedFile"] = json;
            } else {
                return NextResponse.json({ message: "Unsupported file type" }, { status: 400 });
            }
        }

        // Log all form values including the parsed file (if any)
        console.log("Received form data:", values);

        // Respond with success and the form data (including parsed file)
        return NextResponse.json({ message: "Form data received", data: values });
    } catch (error) {
        console.error("Error processing form:", error);
        return NextResponse.json({ message: "Error processing form", error }, { status: 500 });
    }
}
