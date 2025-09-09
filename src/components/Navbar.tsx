import { useState, useEffect } from 'react';
import { Menu, X, Search, LogIn, ChevronDown } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import PlanAForm from './PlanAForm';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showPlanAForm, setShowPlanAForm] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Offres Speciales', href: '#special-packages' },
    { name: 'Gallery', href: '#gallery' },
    // { name: 'Plan A', href: '#', onClick: () => setShowPlanAForm(true) },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-serif text-3xl font-light tracking-wider text-foreground hover:text-primary transition-colors duration-300">
              MysticTravel
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="text-foreground font-light text-sm tracking-wide uppercase hover:text-primary transition-all duration-300 relative flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </button>
                ) : (
                  <a
                  href={link.href}
                  className="text-foreground font-light text-sm tracking-wide uppercase hover:text-primary transition-all duration-300 relative flex items-center space-x-1"
                  >
                  <span>{link.name}</span>
                  <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </a>
                )}
              </div>
            ))}
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-4 p-2 text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              <Search className="w-5 h-5" />
              <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
            
            {/* Login Button */}
            <a
              href="/login"
              className="ml-4 flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </a>
            
            {/* Cart Icon */}
            <a
              href="/cart"
              className="ml-2 flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all duration-300 font-medium relative"
            >
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="/login"
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <LogIn className="w-5 h-5" />
            </a>
            <a
              href="/cart"
              className="p-2 text-foreground hover:text-primary transition-colors duration-300 relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </a>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 border-t border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <div key={link.name}>
                  {link.onClick ? (
                    <button
                      onClick={() => {
                        link.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block text-foreground font-light text-lg tracking-wide uppercase hover:text-primary transition-all duration-300 hover:translate-x-2 w-full text-left"
                      style={{
                        transitionDelay: `${index * 50}ms`
                      }}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                    href={link.href}
                    className="block text-foreground font-light text-lg tracking-wide uppercase hover:text-primary transition-all duration-300 hover:translate-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                    >
                    {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Plan A Form */}
      <PlanAForm isOpen={showPlanAForm} onClose={() => setShowPlanAForm(false)} />
    </nav>
  );
};

export default Navbar;