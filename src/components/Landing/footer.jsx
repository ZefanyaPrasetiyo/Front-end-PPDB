"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="bg-white" data-aos="fade-up">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="">
              <img src="/images/Logoinstansi/logotb.png" alt="" className="w-72 h-72 object-contain" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">1on1 Coaching</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Company Review</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Accounts Review</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">HR Consulting</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">SEO Optimisation</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">About</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Meet the Team</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Accounts Review</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Helpful Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Contact</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">FAQs</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Live Chat</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Privacy Policy</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Terms & Conditions</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Returns Policy</a></li>
                <li><a className="text-gray-700 transition hover:text-gray-700/75" href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          &copy; 2024. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}