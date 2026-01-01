"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Navbar from "./navbar";
import { Menu, Stethoscope, X } from "lucide-react";
import AuthPopup from "@/components/authentication/authPopup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for glass effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleGetStarted = () => {
        setMobileMenuOpen(false);
        if (session) router.push("/dashboard");
        else setShowAuthPopup(true);
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileMenuOpen])

    return (
        <>
            <header
                className={`
                    fixed z-50 max-md:top-5.5 top-8 left-1/2 -translate-x-1/2
                    w-[90%] max-w-6xl h-15 md:h-18
                    flex justify-between items-center px-4 md:px-6
                    rounded-full border transition-all duration-300
                    ${scrolled
                        ? "bg-white/80 backdrop-blur-lg border-slate-200 shadow-lg py-2"
                        : "bg-white border-transparent py-4"}
                    ${mobileMenuOpen && 'shadow-xl'}
                `}
            >
                <Link href="/" className="flex items-center gap-2 text-teal-600 group">
                    <div className="bg-teal-600 w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform">
                        <Stethoscope size={20} className="text-white" />
                    </div>
                    <h2 className="font-bold text-xl md:text-2xl tracking-tighter text-slate-900">
                        Futunurse
                    </h2>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:block">
                    <Navbar />
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleGetStarted}
                        className="hidden md:flex rounded-full px-8 bg-slate-900 hover:bg-teal-600 text-white font-bold transition-all shadow-md hover:shadow-teal-600/20"
                    >
                        Get Started
                    </Button>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-900"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden bg-white px-6 pt-32 pb-10 flex flex-col"
                    >
                        <Navbar
                            mobileOpen={mobileMenuOpen}
                            onMobileOpen={() => setMobileMenuOpen(false)}
                            onGetStarted={handleGetStarted}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthPopup open={showAuthPopup} onClose={() => setShowAuthPopup(false)} />
        </>
    );
};

export default Header;