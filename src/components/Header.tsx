import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';

const Header = () => {
  const auth = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  function navigateToDashboard() {
    if (auth.user) {
      navigate("/dashboard");
    } else {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    }
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled
          ? "bg-white/80 backdrop-blur border-b border-gray-200/30 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-light">Fill</span>
          <span className="text-xl text-primary font-bold">CV</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-foreground/80"
            )}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/features") ? "text-primary" : "text-foreground/80"
            )}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/pricing") ? "text-primary" : "text-foreground/80"
            )}
          >
            Pricing
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!auth.user && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                supabase.auth.signInWithOAuth({ provider: "google" })
              }
            >
              Sign In
            </Button>
          )}
          <Button size="sm" onClick={() => navigateToDashboard()}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "w-6 h-0.5 bg-foreground transition-transform duration-300",
              mobileMenuOpen && "transform rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-foreground transition-opacity duration-300",
              mobileMenuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-foreground transition-transform duration-300",
              mobileMenuOpen && "transform -rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute left-0 right-0 top-full bg-white/90 backdrop-blur-lg border-b border-gray-200/30 shadow-sm transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-screen py-6" : "max-h-0 py-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link
            to="/"
            className={cn(
              "py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/") ? "text-primary" : "text-foreground/80"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={cn(
              "py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/features") ? "text-primary" : "text-foreground/80"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/pricing") ? "text-primary" : "text-foreground/80"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <div className="pt-4 border-t border-gray-200/50 flex flex-col space-y-2">
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button className="w-full justify-center" asChild>
              <Link to="/dashboard" onClick={() => navigateToDashboard()}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
