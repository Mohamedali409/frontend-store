import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";

// Placeholder icon components - you can replace these with your actual icon libraries
const XIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const MapPinIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const ArrowsRightLeftIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);
const MicrophoneIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);
const QuestionMarkCircleIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const HeartIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const UserCircleIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ShoppingBagIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const FlagUsIcon = () => (
  <svg className="w-4 h-3" viewBox="0 0 7410 3900">
    <rect width="7410" height="3900" fill="#b22234" />
    <path
      d="M0,0H2964V2100H0ZM210,173.25l70,215.39H40.16l181.61,131.91L151.77,736.31,280,604.4,408.23,736.31l-70-215.39L519.84,388.64H350ZM630,173.25l70,215.39H460.16l181.61,131.91L571.77,736.31,700,604.4,828.23,736.31l-70-215.39L939.84,388.64H770Z"
      fill="#3c3b6e"
    />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const categoryLinks = [
  "All Category",
  "Best Sellers",
  "Today's Deals",
  "Gift Ideas",
  "Membership",
  "Gift Cards",
  "Customer Service",
  "Open a Shop",
];

const currencyLinks = ["USD", "EUR", "JPY", "GBP", "CAD"];
const languageLinks = ["English", "Español", "Français", "Deutsch", "العربية"];
const locationLinks = ["United States", "Canada", "Mexico", "Egypt"];

const CustomDropdown = ({ title, links, Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-white transition-colors py-1"
      >
        {Icon && <Icon />}
        <span>{title}</span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-48 bg-[#1f2937] border border-gray-700 rounded-md shadow-lg z-20 py-1 overflow-hidden">
            {links.map((link) => (
              <a
                href="#"
                key={link}
                className="block px-4 py-2 hover:bg-gray-800 text-gray-200"
              >
                {link}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AccountDialog = ({ isOpen, setIsOpen }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
  >
    {/* تم استبدال Dialog.Overlay بـ DialogBackdrop */}
    <DialogBackdrop className="fixed inset-0 bg-black/50" />

    <div className="fixed inset-0 flex items-center justify-center p-4">
      {/* يجب تغليف المحتوى بـ DialogPanel في الإصدارات الجديدة */}
      <DialogPanel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl relative">
        <DialogTitle className="text-lg font-bold">Account Options</DialogTitle>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon />
        </button>
        <div className="mt-6 space-y-2">
          <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-black">
            Sign In / Register
          </button>
          <button className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-black">
            Order History
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

const CartDialog = ({ isOpen, setIsOpen }) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
  >
    <DialogBackdrop className="fixed inset-0 bg-black/50" />

    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl relative">
        <DialogTitle className="text-lg font-bold">
          Your Shopping Cart
        </DialogTitle>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XIcon />
        </button>
        <div className="mt-4 space-y-3">
          {[1, 2].map((item) => (
            <div key={item} className="flex gap-3 items-center border-b pb-3">
              <div className="w-16 h-16 bg-gray-100 rounded" />
              <div className="text-black">
                <p className="font-semibold">Sample Product {item}</p>
                <p className="text-sm text-gray-600">Qty: 1 - $25.00</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-600 text-white rounded-md py-3 mt-6 hover:bg-blue-700">
          Checkout
        </button>
      </DialogPanel>
    </div>
  </Dialog>
);

const NavbarTailwand = () => {
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);

  return (
    <header className="w-full">
      {/* 1. Top Promo Banner */}
      <div className="bg-[#1e48ba] text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center gap-2">
        {/* Placeholder Icon */}
        <MicrophoneIcon />
        <span>
          Don't miss out on our Halloween Game Sale! Level up your collection!
        </span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </div>

      {/* 2. Secondary Top Nav */}
      <div className="bg-[#1f2937] border-b border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center text-xs text-gray-300 font-medium">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <PhoneIcon />
              Fast & Free Delivery
            </span>
            <span className="flex items-center gap-2">
              <ArrowsRightLeftIcon />
              Fair Prices
            </span>
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
              <span className="ml-1 text-white">5.0</span>
            </span>
          </div>

          {/* Right Side - Custom Dropdowns for Language & Currency */}
          <div className="flex items-center space-x-6">
            <CustomDropdown
              title="English"
              links={languageLinks}
              Icon={FlagUsIcon}
            />
            <CustomDropdown title="USD" links={currencyLinks} />
            <a
              href="#"
              className="hover:text-white transition-colors py-1 flex items-center gap-2"
            >
              <QuestionMarkCircleIcon />
              Support
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Navbar */}
      <nav className="bg-[#111827] border-b border-gray-700 py-3">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              CLICON
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl w-full">
            <form className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-3 pl-10 text-sm text-white bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="Search for anything..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2 bottom-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6 text-white">
            {/* Cart Button with Dialog */}
            <button
              onClick={() => setIsCartDialogOpen(true)}
              className="hover:text-gray-300 relative py-1"
            >
              <ShoppingBagIcon />
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                4
              </span>
            </button>

            {/* Wishlist Button */}
            <button className="hover:text-gray-300 py-1">
              <HeartIcon />
            </button>

            {/* Account Button with Dialog */}
            <button
              onClick={() => setIsAccountDialogOpen(true)}
              className="hover:text-gray-300 py-1 flex items-center gap-1"
            >
              <UserCircleIcon />
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Bottom Links Nav */}
      <div className="bg-[#1f2937] text-sm font-medium text-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Custom Dropdown for All Category */}
          <CustomDropdown title="All Category" links={categoryLinks} />

          <div className="flex items-center space-x-6 text-gray-300">
            <CustomDropdown
              title="Location"
              links={locationLinks}
              Icon={MapPinIcon}
            />
            <a href="#" className="hover:text-white flex items-center gap-2">
              <ArrowsRightLeftIcon />
              Compare
            </a>
            <a href="#" className="hover:text-white flex items-center gap-2">
              <MicrophoneIcon />
              Customer Support
            </a>
            <a href="#" className="hover:text-white flex items-center gap-2">
              <QuestionMarkCircleIcon />
              Need Help
            </a>
          </div>

          {/* Contact Number */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <PhoneIcon />
            <span>+1-202-555-0104</span>
          </div>
        </div>
      </div>

      {/* Dialog Components */}
      <CartDialog isOpen={isCartDialogOpen} setIsOpen={setIsCartDialogOpen} />
      <AccountDialog
        isOpen={isAccountDialogOpen}
        setIsOpen={setIsAccountDialogOpen}
      />
    </header>
  );
};

export default NavbarTailwand;
