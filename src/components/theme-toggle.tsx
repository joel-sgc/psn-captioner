"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size='icon'
      onClick={() => {
      if (theme === "dark") {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }}>
      {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  )
}
