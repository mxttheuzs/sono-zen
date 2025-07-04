import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CopyProtection } from "@/components/protection/copy-protection";
import { ExitIntentPopup } from "@/components/ui/exit-intent-popup";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CopyProtection />
        <Toaster />
        <ExitIntentPopup />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
