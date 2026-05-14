import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import FloatingUrgentHelp from "@/components/FloatingUrgentHelp";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Exploring from "./pages/Exploring.tsx";
import Forums from "./pages/Forums.tsx";
import ForumCategory from "./pages/ForumCategory.tsx";
import ForumThread from "./pages/ForumThread.tsx";
import NotFound from "./pages/NotFound.tsx";
import Quiz from "./pages/Quiz.tsx";
import Tailored from "./pages/Tailored.tsx";
import Resources from "./pages/Resources.tsx";
import Tools from "./pages/Tools.tsx";
import Activities from "./pages/Activities.tsx";
import YourSpace from "./pages/YourSpace.tsx";
import CaregiverStage from "./pages/CaregiverStage.tsx";
import SmallCircle from "./pages/SmallCircle.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/exploring" element={<Exploring />} />
            <Route path="/your-space" element={<YourSpace />} />
            <Route path="/caregiver/:stage" element={<CaregiverStage />} />
            <Route path="/small-circle" element={<SmallCircle />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/forums/:slug" element={<ForumCategory />} />
            <Route path="/forums/:slug/:threadId" element={<ForumThread />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/tailored" element={<Tailored />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/activities" element={<Activities />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingUrgentHelp />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
