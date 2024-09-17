"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadSchema } from "@/schema/upload-form.schema";

export default function UploadForm() {
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            datasetName: "",
            dataType: "occurrence",
            startDate: "",
            endDate: "",
            location: "",
            species: "",
            comments: "",
            file: undefined,
            dataFormat: "csv",
        },
    });

    function onSubmit(values: z.infer<typeof uploadSchema>) {
        const formData = new FormData();

        // Append form values to formData
        formData.append("datasetName", values.datasetName);
        formData.append("dataType", values.dataType);
        formData.append("startDate", values.startDate);
        formData.append("endDate", values.endDate);
        formData.append("location", values.location);
        formData.append("species", values.species || "");
        formData.append("comments", values.comments || "");
        formData.append("dataFormat", values.dataFormat);

        // Append file if it's present
        if (values.file) {
            formData.append("file", values.file);
        }

        // Send the POST request to the backend API route
        fetch('/api/uploadData', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from server:", data);
            })
            .catch((error) => {
                console.error("Error sending data to server:", error);
            });
    }

    return (
        <div className="max-w-lg mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Dataset Name Field */}
                    <FormField
                        control={form.control}
                        name="datasetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dataset Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dataset Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Data Type Field */}
                    <FormField
                        control={form.control}
                        name="dataType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Type</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className="border border-gray-300 rounded-md p-3 w-full">
                                            <SelectValue placeholder="Select Data Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="occurrence">Species Occurrence</SelectItem>
                                            <SelectItem value="abundance">Species Abundance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Start Date Field */}
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* End Date Field */}
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Location Field */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Species Field */}
                    <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Species (comma separated)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Tuna, Salmon" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Data Format Field */}
                    <FormField
                        control={form.control}
                        name="dataFormat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Format</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className="border border-gray-300 rounded-md p-3 w-full">
                                            <SelectValue placeholder="Select Data Format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="xlsx">XLSX</SelectItem>
                                            <SelectItem value="csv">CSV</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* File Upload Field */}
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload File</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".csv,.json,.xlsx"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(file);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Comments Field */}
                    <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Comments</FormLabel>
                                <FormControl>
                                    <Input placeholder="Comments" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
