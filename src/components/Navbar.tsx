"use client";

import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Services", ariaLabel: "View our services", link: "/book" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Gallery", ariaLabel: "View our gallery", link: "/gallery" },
  { label: "Reviews", ariaLabel: "Read our reviews", link: "/reviews" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Facebook", link: "https://www.facebook.com/lukemobiledetailing/" },
  { label: "Instagram", link: "https://www.instagram.com/lukesmobiledetailingllc/" },
  { label: "TikTok", link: "https://tiktok.com/@lukesmobiledetailing" },
];

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      logoUrl="/Images/webPhotos/lukenewLogo-removebg-preview.png"
      openLogoUrl="/Images/webPhotos/lukenewLogo-inverted-removebg-preview.png"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering={false}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen
      colors={["#0f0f0f", "#1a1a1a"]}
      accentColor="#D21F3C"
      isFixed
      closeOnClickAway
    />
  );
}
