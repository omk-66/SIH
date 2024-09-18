import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";

export default async function Preview() {
    const data = await prisma.fishCatchData.findMany();

    return (
        <div className="p-8 bg-white dark:bg-card shadow-lg rounded-lg">
            <Table className="min-w-full table-auto border-separate border-spacing-0 border border-violet-200">
                <TableCaption className="text-lg font-bold text-violet-700 mb-4">Fish Catch Data Preview</TableCaption>
                <TableHeader>
                    <TableRow className="bg-violet-100 dark:bg-violet-900">
                        <TableHead className="w-[100px] px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">ID</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Species</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Latitude</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Longitude</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Depth</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Catch Weight</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Description</TableHead>
                        <TableHead className="px-4 py-3 text-left text-sm font-semibold text-violet-800 dark:text-violet-300">Location ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id} className="hover:bg-violet-200 hover:text-violet-900 dark:hover:bg-violet-700 dark:hover:text-white transition duration-300">
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.id}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.species}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.latitude}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.longitude}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.depth ?? 'N/A'}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.catchWeight ?? 'N/A'}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.description ?? 'N/A'}</TableCell>
                            <TableCell className="px-4 py-3 text-sm text-foreground dark:text-white">{item.locationId ?? 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-violet-100 dark:bg-violet-900">
                        <TableCell colSpan={8} className="text-right px-4 py-3 font-semibold text-violet-800 dark:text-violet-300">Total Records: {data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
