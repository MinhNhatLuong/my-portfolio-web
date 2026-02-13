import { Loader2 } from "lucide-react";

/**
 * Full Page Loader
 * Used for initial page loads or blocking states.
 */
export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center space-x-2">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
}

/**
 * Inline Loader
 * Used for infinite scrolling or smaller loading sections.
 */
export function InlineLoader() {
  return (
    <div className="py-10 flex justify-center w-full">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );
}