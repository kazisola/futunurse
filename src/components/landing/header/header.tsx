"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Navbar from "./navbar";
import { Menu, Stethoscope, X } from "lucide-react";
import AuthPopup from "@/components/authentication/authPopup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className="
                    p-2 max-sm:p-2.5 flex justify-between items-center
                    bg-white rounded-full shadow-md fixed z-30
                    top-10 max-sm:top-5 left-0 right-0 mx-auto
                    w-6xl max-xl:w-4xl max-lg:w-3xl
                    max-md:w-xl max-sm:w-[calc(100vw-2.5rem)]
                "
            >
                <Link href="/" className="flex items-center gap-2 text-teal-600 pl-4">
                    <div className="md:bg-teal-600 md:w-8 md:h-8 rounded-sm flex items-center justify-center">
                        <Stethoscope size={22} className="text-white max-md:text-teal-600" />
                    </div>
                    <h2 className="font-semibold text-2xl">Futunurse</h2>
                </Link>

                {/* Desktop nav unchanged */}
                <div className="max-md:hidden">
                    <Navbar />
                </div>

                <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="rounded-full w-42 h-12 text-lg max-md:hidden"
                >
                    Get Started
                </Button>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileMenuOpen((p) => !p)}
                    className="md:hidden text-teal-600 pr-2"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Mobile dropdown */}
            <div className="fixed top-22 left-0 right-0 z-20 md:hidden ">
                <Navbar mobileOpen={mobileMenuOpen} onMobileOpen={() => setMobileMenuOpen(false)} onGetStarted={handleGetStarted} />
            </div>

            <AuthPopup open={showAuthPopup} onClose={() => setShowAuthPopup(false)} />
        </>
    );
};

export default Header;
