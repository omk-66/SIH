'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaUpload, FaTachometerAlt, FaChartLine, FaUser } from 'react-icons/fa';
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
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <Button
                            onClick={() => handleNavigation('/upload')}
                            className={cn(
                                'flex items-center space-x-3 p-2 w-full text-left rounded-md transition-colors duration-150 ease-in-out',
                                isActive('/upload') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                            )}
                            variant="ghost"
                        >
                            <FaUpload className="w-5 h-5" />
                            <span>Upload Data</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => handleNavigation('/dashboard')}
                            className={cn(
                                'flex items-center space-x-3 p-2 w-full text-left rounded-md transition-colors duration-150 ease-in-out',
                                isActive('/dashboard') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                            )}
                            variant="ghost"
                        >
                            <FaTachometerAlt className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => handleNavigation('/visualization')}
                            className={cn(
                                'flex items-center space-x-3 p-2 w-full text-left rounded-md transition-colors duration-150 ease-in-out',
                                isActive('/visualization') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                            )}
                            variant="ghost"
                        >
                            <FaChartLine className="w-5 h-5" />
                            <span>Visualization</span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            onClick={() => handleNavigation('/profile')}
                            className={cn(
                                'flex items-center space-x-3 p-2 w-full text-left rounded-md transition-colors duration-150 ease-in-out',
                                isActive('/profile') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                            )}
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
