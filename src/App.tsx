import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import CreatorPortal from "./pages/CreatorPortal";
import CreatorSignUp from "./pages/CreatorSignUp";
import CreatorUpload from "./pages/CreatorUpload";
import CreatorEarnings from "./pages/CreatorEarnings";
import CreatorRequests from "./pages/CreatorRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/creator" element={<CreatorPortal />} />
          <Route path="/creator/signup" element={<CreatorSignUp />} />
          <Route path="/creator/upload" element={<CreatorUpload />} />
          <Route path="/creator/earnings" element={<CreatorEarnings />} />
          <Route path="/creator/requests" element={<CreatorRequests />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
