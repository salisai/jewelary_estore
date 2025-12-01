import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-black text-white",
  secondary: "bg-gray-100 text-gray-700",
  outline: "border border-gray-300 text-gray-600",
  success: "bg-green-100 text-green-800"
};

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <span className={cn("px-2 py-1 text-xs uppercase tracking-wide", variantClasses[variant], className)} {...props} />
);

