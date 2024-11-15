"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = ({ children, className, ...props }) => (
  <div className={`bg-popover-foreground text-foreground text-xs p-2 rounded ${className}`} {...props}>
    {children}
  </div>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
