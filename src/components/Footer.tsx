import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-16 sm:pt-20 pb-10 sm:pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <div className="text-3xl font-display font-black italic text-white mb-6">
              LUKE&apos;S <span className="text-primary">MOBILE DETAILING</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
              Elevating mobile detailing to an art form. We don&apos;t just
              clean cars; we restore the bond between driver and machine using
              the finest products and techniques available.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/lukemobiledetailing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a
                href="https://www.instagram.com/lukesmobiledetailingllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a
                href="https://tiktok.com/@lukesmobiledetailing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold font-body not-italic uppercase tracking-widest mb-6 text-white border-b border-primary/50 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-primary transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Resources Column */}
          <div>
            <h4 className="text-xs font-bold font-body not-italic uppercase tracking-widest mb-6 text-white border-b border-primary/50 pb-2 inline-block">
              Helpful Resources
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/car-cleaning-tips" className="hover:text-primary transition-colors">
                  Car Cleaning Tips
                </Link>
              </li>
              <li>
                <Link href="/auto-detailing-guide" className="hover:text-primary transition-colors">
                  Auto Detailing Guide
                </Link>
              </li>
              <li>
                <Link href="/vehicle-detailing-maintenance" className="hover:text-primary transition-colors">
                  Vehicle Detailing Maintenance
                </Link>
              </li>
              <li>
                <Link href="/detailing-wiki" className="hover:text-primary transition-colors">
                  Detailing Wiki
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-bold font-body not-italic uppercase tracking-widest mb-6 text-white border-b border-primary/50 pb-2 inline-block">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-primary text-sm group-hover:scale-110 transition-transform">
                  call
                </span>
                <a
                  className="font-mono text-gray-300 hover:text-white transition-colors"
                  href="tel:5306503631"
                >
                  (530) 650-3631
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-primary text-sm group-hover:scale-110 transition-transform">
                  mail
                </span>
                <a
                  className="text-gray-300 hover:text-white transition-colors"
                  href="mailto:luke8888z@gmail.com"
                >
                  luke8888z@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="material-symbols-outlined text-primary text-sm group-hover:scale-110 transition-transform">
                  schedule
                </span>
                <span className="text-gray-300">Mon-Sat: 7am - 8pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Luke&apos;s Mobile Detailing. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-white transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
