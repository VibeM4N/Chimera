import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../common/Header";
import Footer from "../common/Footer";
import PageTransition from "../common/PageTransition";

export default function AppShell() {
  const location = useLocation();
  

  return (
    <div className="min-h-screen flex flex-col relative pt-8">
      <Header />
      
      <AnimatePresence mode="sync" initial={false}>
        <PageTransition key={location.key} className="flex-1">
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
