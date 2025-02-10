"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/shared"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-pink text-white hover:bg-brand-pink/90 focus-visible:ring-brand-pink/50",
        secondary: "bg-brand-green text-white hover:bg-brand-green/90 focus-visible:ring-brand-green/50",
        outline: "border-2 border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue/10 focus-visible:ring-brand-blue/50",
        ghost: "text-brand-blue hover:bg-brand-blue/10 focus-visible:ring-brand-blue/50",
        link: "text-brand-blue underline-offset-4 hover:underline focus-visible:ring-brand-blue/50",
        gradient: "bg-gradient-to-r from-brand-pink to-brand-green text-white hover:opacity-90 focus-visible:ring-brand-pink/50",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
