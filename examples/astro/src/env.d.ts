/// <reference types="astro/client" />

interface Window {
  zenovay?: (command: string, ...args: unknown[]) => void
}
