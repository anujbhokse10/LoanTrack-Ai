'use client';

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLoanContext } from "@/contexts/loan-context";

export function DemoModeToggle() {
    const { isDemoMode, toggleDemoMode } = useLoanContext();

    return (
        <div className="flex items-center space-x-2">
            <Switch 
                id="demo-mode" 
                checked={isDemoMode}
                onCheckedChange={toggleDemoMode}
                aria-label="Toggle demo mode"
            />
            <Label htmlFor="demo-mode" className="text-sm font-medium">Demo Mode</Label>
        </div>
    );
}
