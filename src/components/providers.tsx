import SocketContextProvider from "@/contexts/socketio";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    disableTransitionOnChange
  >
      <SocketContextProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
      </SocketContextProvider>
  </ThemeProvider>;
};
