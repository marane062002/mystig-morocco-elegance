import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Hotels from "./pages/products/Hotels";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/dashboard/Statistics";
import Events from "./pages/dashboard/Events";
import TransportList from "./pages/dashboard/transport/TransportList";
import CreateTransport from "./pages/dashboard/transport/CreateTransport";
import Packages from "./pages/dashboard/Packages";
import Demands from "./pages/dashboard/Demands";
import SpecialPackages from "./pages/dashboard/SpecialPackages";
import Cities from "./pages/dashboard/Cities";
import Activities from "./pages/dashboard/Activities";
import Services from "./pages/dashboard/Services";
import Artisan from "./pages/dashboard/Artisan";
import Food from "./pages/dashboard/Food";
import Tickets from "./pages/dashboard/Tickets";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";
import Hotelsc from "./pages/dashboard/Hotels";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/hotels" element={<Hotels />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/dashboard/statistics" element={<Statistics />} />
                <Route path="/dashboard/demands" element={<Demands />} />
                <Route path="/dashboard/hotels" element={<Hotelsc />} />
                <Route path="/dashboard/special-packages" element={<SpecialPackages />} />
                <Route path="/dashboard/events" element={<Events />} />
                <Route path="/dashboard/transport" element={<TransportList />} />
                <Route path="/dashboard/transport/create" element={<CreateTransport />} />
                <Route path="/dashboard/cities" element={<Cities />} />
                <Route path="/dashboard/activities" element={<Activities />} />
                <Route path="/dashboard/services" element={<Services />} />
                <Route path="/dashboard/packages" element={<Packages />} />
                <Route path="/dashboard/artisan" element={<Artisan />} />
                <Route path="/dashboard/food" element={<Food />} />
                <Route path="/dashboard/tickets" element={<Tickets />} />
                <Route path="/dashboard/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;