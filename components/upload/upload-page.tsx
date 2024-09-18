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
import { useState } from "react";

export default function UploadForm() {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: {
            datasetName: "",
            dataType: "occurrence",
            location: "",
            species: "",
            comments: "",
            file: undefined,
            dataFormat: "csv",
        },
    });

    const onSubmit = async (values: z.infer<typeof uploadSchema>) => {
        // console.log(values);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value || "");
        });

        // Inspect the contents of FormData using forEach
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        setLoading(true);
        setFeedback("");

        try {
            const response = await fetch('/api/uploadData', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("error in response")
                throw new Error(data.message || "Error uploading data");
            }
            console.log("-----------------------------------")

            console.log("Response from server:", data);
            setFeedback("Upload successful!");
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
                    {/* Dataset Name Field */}
                    <FormField
                        control={form.control}
                        name="datasetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="datasetName">Dataset Name</FormLabel>
                                <FormControl>
                                    <Input id="datasetName" placeholder="Dataset Name" {...field} />
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

                    {/* Species Field */}
                    <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="species">Species (comma separated)</FormLabel>
                                <FormControl>
                                    <Input id="species" placeholder="e.g., Tuna, Salmon" {...field} />
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

                    {/* File Upload Field */}
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="file">Upload File</FormLabel>
                                <FormControl>
                                    <Input
                                        id="file"
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
                                <FormLabel htmlFor="comments">Comments</FormLabel>
                                <FormControl>
                                    <Input id="comments" placeholder="Comments" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>

                    {feedback && <p className="text-center text-green-500">{feedback}</p>}
                </form>
            </Form>
        </div>
    );
}
