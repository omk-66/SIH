import HeatMap from "@/components/visualization/heat-map";

export default function VisualizationPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
            <div className="relative w-full h-full">
                <HeatMap />
            </div>
        </main>
    );
}
