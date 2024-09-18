import { NextResponse, NextRequest } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/db'; // Adjust the import based on your file structure


interface DataEntry {
    species: string;
    date: string; // Ensure date is in a string format that can be parsed
    latitude: number;
    longitude: number;
    depth?: number;
    catchWeight?: number;
    description?: string;
    id?: number; // Assuming id is used for locationId
}

export async function POST(request: NextRequest) {
    try {
        // Get form data from the request
        const formData = await request.formData();
        // console.log(formData)
        const values: { [key: string]: any } = {};
        let file: File | undefined;

        formData.forEach((value, key) => {
            if (key === 'file' && value instanceof File) {
                file = value;
            } else {
                values[key] = value;
            }
        });
        console.log(values)
        console.log(formData);

        if (file) {
            const buffer = await file.arrayBuffer();
            const data = new Uint8Array(buffer);
            let parsedData: DataEntry[] = [];

            if (file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                parsedData = XLSX.utils.sheet_to_json(sheet);
            } else if (file.type === 'application/json') {
                const text = new TextDecoder().decode(data);
                parsedData = JSON.parse(text);
            }
            // console.log(parsedData)

            for (const entry of parsedData) {
                console.log(entry)
                // const speciesName = entry.species;
                // if (typeof speciesName !== 'string') {
                //     throw new Error('Species name must be a string.');
                // }
                // const species = await prisma.species.upsert({
                //     where: { name: entry.species },
                //     create: { name: entry.species },
                //     update: {},
                // });
                // const species = await prisma.species.upsert({
                //     where: {
                //         name: entry.species,
                //         id: values.id
                //     },
                //     create: {
                //         name: entry.species,
                //         id: values.id
                //     },
                //     update: {},
                // });

                // Upsert location
                // const location = await prisma.location.upsert({
                //     where: {
                //         latitude_longitude: {
                //             latitude: entry.latitude,
                //             longitude: entry.longitude,
                //         },
                //     },
                //     create: {
                //         latitude: entry.latitude,
                //         longitude: entry.longitude,
                //         description: entry.description || null,
                //     },
                //     update: {},
                // });
                // console.log(entry.latitude)
                // Create FishCatchOccurrence entry
                // await prisma.fishCatchOccurrence.create({
                //     data: {
                //         date: new Date(entry.date),
                //         latitude: entry.latitude,
                //         longitude: entry.longitude,
                //         depth: entry.depth || null,
                //         speciesId: values.id,
                //         catchWeight: entry.catchWeight || null,
                //         dataSource: values.dataSource || 'Uploaded Data',  // Add dataSource
                //         locationId: values.location
                //     },
                // });
                await prisma.fishCatchData.create({
                    data: {
                        species: entry.species,
                        date: new Date(entry.date),
                        latitude: entry.latitude,
                        longitude: entry.longitude,
                        depth: entry.depth || null,
                        catchWeight: entry.catchWeight || null,
                        description: entry.description || null,
                        locationId: entry.id || null,
                    },
                });
                // Create FishCatchAbundance entry if applicable
                // if (entry.catchWeight) {
                //     await prisma.fishCatchAbundance.create({
                //         data: {
                //             date: new Date(entry.date),
                //             latitude: entry.latitude,
                //             longitude: entry.longitude,
                //             depth: entry.depth || null,
                //             speciesId: species.id,
                //             catchWeight: entry.catchWeight,
                //             dataSource: values.dataSource || 'Uploaded Data',  // Add dataSource
                //             locationId: location.id,  // Add locationId
                //         },
                //     });
                // }
                // Upsert species

            }
        }

        return NextResponse.json({ message: 'Form data received and stored' });
    } catch (error) {
        console.error('Error processing form:', error);
        return NextResponse.json({ message: 'Error processing form', error }, { status: 500 });
    }
}
