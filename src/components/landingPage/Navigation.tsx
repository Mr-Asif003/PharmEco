import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate,  useNavigation } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
const Navigation = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "#about", isRoute: false },
    { name: "Features", href: "#features", isRoute: false },
    { name: "Pricing", href: "#pricing", isRoute: false },
    { name: "Store Finder", href: "/store-finder", isRoute: true },
    { name: "Analytics", href: "#analytics", isRoute: false },
    { name: "Contact", href: "#contact", isRoute: false },
  ];
const handleLoginBtn = () => {
    navigate("/auth/");
  }
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-retailer to-patient flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-xl font-bold">PharmEco</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? "text-foreground bg-muted/50"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" onClick={handleLoginBtn}>Login</Button>
              <Button variant="retailer" onClick={handleLoginBtn}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 glass-effect rounded-lg mt-2 px-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? "text-foreground bg-muted/50"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            )}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button variant="retailer" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
