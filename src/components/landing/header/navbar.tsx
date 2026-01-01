"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
    mobileOpen?: boolean;
    onMobileOpen?: Dispatch<SetStateAction<boolean>>
    onGetStarted?: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ mobileOpen, onMobileOpen, onGetStarted }: NavbarProps) => {
    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Features", href: "#features" },
        { label: "Why us", href: "#why-us" },
        { label: "Pricing", href: "#pricing" },
    ];

    return (
        <nav className={`flex items-center max-md:h-full gap-2 ${mobileOpen ? "flex-col w-full" : ""}`}>
            <ul className={`flex items-center ${mobileOpen ? "flex-col gap-8 w-full" : "gap-1"}`}>
                {navLinks.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={mobileOpen ? { opacity: 0, x: -20 } : {}}
                        animate={mobileOpen ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 }}
                        className={mobileOpen ? "w-full text-center" : ""}
                    >
                        <Link
                            href={item.href}
                            onClick={() => onMobileOpen?.(false)}
                            className={`
                                text-sm font-bold transition-all px-5 py-2 rounded-full
                                ${mobileOpen
                                    ? "text-3xl! uppercase font-mono tracking-tighter text-slate-900 hover:text-teal-600"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}
                            `}
                        >
                            {item.label}
                        </Link>
                    </motion.li>
                ))}
            </ul>

            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-auto w-full"
                >
                    <Button
                        onClick={() => onGetStarted?.(true)}
                        size="lg"
                        className="w-full rounded-4xl h-16 text-xl font-bold bg-teal-600 hover:bg-teal-700"
                    >
                        Get Started
                    </Button>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;