"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
    mobileOpen?: boolean;
    onMobileOpen?: Dispatch<SetStateAction<boolean>>
    onGetStarted?: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ mobileOpen, onMobileOpen, onGetStarted }: NavbarProps) => {
    return (
        <nav
            className={`
                flex items-center gap-5 z-20
                max-md:absolute max-md:top-full max-md:left-1/2 max-md:-translate-x-1/2
                max-md:w-[calc(100%-2.5rem)]
                max-md:bg-white
                max-md:rounded-3xl
                max-md:overflow-hidden
                max-md:transition-all max-md:duration-300 max-md:ease-out
                max-md:flex-col
                ${mobileOpen
                    ? "max-md:opacity-100 max-md:translate-y-0 max-md:h-[calc(100vh-8rem)]"
                    : "max-md:opacity-0 max-md:-translate-y-3 max-md:max-h-0"}
            `}
        >
            <ul className="flex items-center max-md:flex-col max-md:w-full max-md:py-4">
                {[
                    { label: "About", href: "#about" },
                    { label: "Features", href: "#features" },
                    { label: "Why us", href: "#why-us" },
                ].map((item, index) => (
                    <li
                        key={index}
                        onClick={() => onMobileOpen?.(false)}
                        className="max-md:w-full cursor-pointer"
                    >
                        <Link
                            href={item.href}
                            className=" block px-5 h-11 leading-11
                                text-base font-medium text-gray-700
                                rounded-full text-center
                                hover:bg-teal-50 hover:text-teal-700
                                transition-colors max-md:text-3xl max-md:uppercase max-md:font-mono"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Button
                onClick={onGetStarted ? () => onGetStarted(true) : undefined}
                size="lg"
                className="rounded-full w-[calc(100%-28px)] h-13 text-lg mt-auto mb-7 md:hidden"
            >
                Get Started
            </Button>
        </nav>
    );
};

export default Navbar;
