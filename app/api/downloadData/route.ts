import { NextResponse, NextRequest } from 'next/server';
import * as XLSX from 'xlsx';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
    const { species, dataType, location, dataFormat } = await request.json();

    try {
        // Fetch data based on the user's input
        const data = await prisma.fishCatchData.findMany({
            where: {
                species: species || undefined,
                // Add other filters as necessary based on dataType and location
            },
        });

        let responseBlob;
        
        if (dataFormat === 'xlsx') {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
            const xlsxBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            responseBlob = new Blob([xlsxBuffer], { type: 'application/octet-stream' });
        } else if (dataFormat === 'csv') {
            const csvData = XLSX.utils.json_to_sheet(data);
            const csvBuffer = XLSX.utils.sheet_to_csv(csvData);
            responseBlob = new Blob([csvBuffer], { type: 'text/csv' });
        } else if (dataFormat === 'json') {
            responseBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        } else {
            return NextResponse.json({ message: 'Invalid format' }, { status: 400 });
        }

        const response = new Response(responseBlob);
        response.headers.set('Content-Disposition', `attachment; filename=data.${dataFormat}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
}
