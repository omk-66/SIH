import React from 'react';
import { Button } from '@/components/ui/button';
import { FaUpload, FaTachometerAlt, FaChartLine, FaUser } from 'react-icons/fa'; // Example icons

export default function SideBar() {
    return (
        <div className="w-64 bg-secondary text-secondary-foreground h-screen flex flex-col border-r border-border-light">
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Button
                            className="flex items-center space-x-3 p-2 w-full text-left rounded-md hover:bg-muted"
                            variant="ghost"
                        >
                            <FaUpload className="w-5 h-5" />
                            <span>Upload Data</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="flex items-center space-x-3 p-2 w-full text-left rounded-md hover:bg-muted"
                            variant="ghost"
                        >
                            <FaTachometerAlt className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="flex items-center space-x-3 p-2 w-full text-left rounded-md hover:bg-muted"
                            variant="ghost"
                        >
                            <FaChartLine className="w-5 h-5" />
                            <span>Visualization</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="flex items-center space-x-3 p-2 w-full text-left rounded-md hover:bg-muted"
                            variant="ghost"
                        >
                            <FaUser className="w-5 h-5" />
                            <span>Profile</span>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
