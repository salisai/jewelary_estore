import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn("flex h-10 w-full border border-gray-300 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-black", className)}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };

