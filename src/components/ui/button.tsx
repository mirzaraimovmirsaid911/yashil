import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-terracotta text-surface hover:bg-terracotta-deep",
        forest: "bg-forest text-surface hover:bg-forest-deep",
        outline:
          "bg-transparent text-ink shadow-[var(--shadow-border)] hover:bg-paper",
        ghost: "bg-transparent text-ink hover:bg-paper",
        cream: "bg-surface text-forest hover:bg-paper",
      },
      size: {
        sm: "h-10 rounded-lg px-3.5 text-sm",
        md: "h-12 rounded-xl px-5 text-sm",
        lg: "h-14 rounded-xl px-7 text-base",
        icon: "size-12 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
