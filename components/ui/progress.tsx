'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={cn("h-2 w-full bg-gray-100", className)}>
    <div className="h-full bg-black transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
);

export { Progress };

