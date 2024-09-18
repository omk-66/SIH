'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaHome, FaUpload, FaTachometerAlt, FaChartLine, FaUser, FaDatabase, FaDownload } from 'react-icons/fa';
import { cn } from '@/lib/utils'; // Utility for conditional classes

export default function SideBar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="w-64 bg-secondary text-secondary-foreground h-screen flex flex-col border-r border-border-light">
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 p-4">
                    {[
                        { path: '/', icon: <FaHome />, label: 'Home' },
                        { path: '/upload', icon: <FaUpload />, label: 'Upload Data' },
                        { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
                        { path: '/visualization', icon: <FaChartLine />, label: 'Visualization' },
                        { path: '/profile', icon: <FaUser />, label: 'Profile' },
                        { path: '/preview', icon: <FaDatabase />, label: 'Preview Database' },
                        { path: '/download', icon: <FaDownload />, label: 'Download Data' },
                    ].map(({ path, icon, label }) => (
                        <li key={path}>
                            <Button
                                onClick={() => handleNavigation(path)}
                                className={cn(
                                    'flex items-center space-x-3 p-3 w-full text-left rounded-md transition-colors duration-150 ease-in-out',
                                    isActive(path) ? 'bg-primary text-white' : 'hover:bg-gray-200'
                                )}
                                variant="ghost"
                            >
                                <span className="flex items-center">{icon}</span>
                                <span className="flex-1 text-left">{label}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
