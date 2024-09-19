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
import { downloadSchema } from "@/schema/download-form.schema"; // Ensure the schema is correctly imported
import { useState } from "react";

export default function DownloadForm() {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const form = useForm<z.infer<typeof downloadSchema>>({
        resolver: zodResolver(downloadSchema),
        defaultValues: {
            species: "",
            dataType: "occurrence",
            location: "",
            dataFormat: "xlsx", // Default to XLSX
        },
    });

    const onSubmit = async (values: z.infer<typeof downloadSchema>) => {
        setLoading(true);
        setFeedback("");

        try {
            const response = await fetch('/api/downloadData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error downloading data");
            }

            // Create a blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `data.${values.dataFormat}`; // Set the filename based on the format
            document.body.appendChild(a);
            a.click();
            a.remove();

            setFeedback("Download successful!");
            form.reset(); // Reset the form on success
        } catch (error) {
            console.error("Error sending data to server:", error);
            setFeedback("Error sending data to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Species Field */}
                    <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="species">Species (optional)</FormLabel>
                                <FormControl>
                                    <Input id="species" placeholder="e.g., Tuna, Salmon" {...field} />
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
                                <FormLabel htmlFor="dataType">Data Type</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
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

                    {/* Location Field */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="location">Location</FormLabel>
                                <FormControl>
                                    <Input id="location" placeholder="Enter location" {...field} />
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
                                <FormLabel htmlFor="dataFormat">Data Format</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
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

                    {/* Submit Button */}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Download"}
                    </Button>

                    {feedback && <p className="text-center text-green-500">{feedback}</p>}
                </form>
            </Form>
        </div>
    );
}
