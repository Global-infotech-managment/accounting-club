"use client";
import { NAV_LINKS } from "../../utils/helper";
import { Link } from "react-router-dom";
import PageLogo from '../../assets/images/png/logo.png'
import Icons from "./Icons";
import { useState } from "react";
import Button from "./Button";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (menuOpen) {
            document.body.classList.remove("overflow-hidden");
        } else {
            document.body.classList.add("overflow-hidden");
        }
        setDropdownOpen(null); // Close dropdowns when the menu closes
    };

    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    return (
        <header className="relative z-10 py-3 md:py-5 shadow-nav">
            <div className="max-w-[1184px] px-3 mx-auto flex justify-between items-center gap-6">
                <Link to="/">
                    <img
                        src={PageLogo}
                        width={260}
                        height={50}
                        alt="logo"
                        className="max-md:w-[169px]"
                        unoptimized
                    />
                </Link>
                <nav className="hidden xl:flex gap-6 items-center">
                    {NAV_LINKS.map((obj, index) => (
                        <div key={index} className="relative group">
                            <Link
                                to={obj.url}
                                className={`transition-all duration-300 flex items-center gap-2 font-normal text-light-black text-base leading-150 ${obj.title === "Home"
                                    ? ""
                                    : ""
                                    }`}
                            >
                                {obj.title}{" "}
                                {obj.subLinks && (
                                    <Icons iconName="dropdown" className="size-4" />
                                )}
                            </Link>
                            {obj.subLinks && (
                                <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md w-40">
                                    {obj.subLinks.map((subLink, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subLink.url}
                                            className="block px-4 py-2 text-slate hover:bg-gray-100"
                                        >
                                            {subLink.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
                <div className="flex gap-5 items-center max-xl:hidden">
                    <Button path={"/"} transparentBtn="Sign up" />
                    <Button bgBtn="Student’s Login" />
                </div>
                {/* Mobile Menu Toggle */}
                <div className="flex items-center xl:hidden gap-4">
                    <div className="flex gap-5 max-md:hidden items-center">
                        <Button path={"/"} transparentBtn="Sign up" />
                        <Button bgBtn="Student’s Login" />
                    </div>
                    <button onClick={toggleMenu} className="relative z-40 bg-primary rounded-1">
                        <Icons
                            iconName={menuOpen ? "close" : "hamburger"}
                            className="size-6"
                        />
                    </button>
                </div>
            </div>
            {/* Mobile Sidebar */}
            <div
                className={`xl:hidden bg-primary px-4 py-20 absolute top-14 md:top-[90px] w-full flex flex-col gap-3 min-h-screen z-20 transition-all duration-300 ${menuOpen ? "right-0" : "-right-full "
                    }`}
            >
                {NAV_LINKS.map((obj, index) => (
                    <div key={index} className="relative">
                        <button
                            className="flex items-center gap-2 font-normal text-base leading-150 text-white"
                            onClick={() => toggleDropdown(index)}
                        >
                            {obj.title}
                            {obj.subLinks && <Icons iconName="dropdown" className="size-4" />}
                        </button>
                        {dropdownOpen === index && obj.subLinks && (
                            <div className="bg-gray-100 rounded-md mt-2">
                                {obj.subLinks.map((subLink, subIndex) => (
                                    <Link
                                        key={subIndex}
                                        to={subLink.url}
                                        className="font-normal text-base leading-150"
                                    >
                                        {subLink.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex max-sm:flex-col gap-3 md:hidden items-center">
                    <Button className="max-sm:w-full text-center" path={"/"} transparentBtn="Sign up" />
                    <Button className="max-sm:w-full text-center bg-white !text-primary" bgBtn="Student’s Login" />
                </div>
            </div>
            {menuOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed w-full h-screen top-0 left-0"
                ></div>
            )}
        </header>
    );
};

export default Navbar;