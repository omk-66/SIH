'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6 border-2 border-black relative overflow-hidden">
      {/* Water Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="water-animation"></div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 max-w-4xl mx-auto -translate-y-5 z-10 relative">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Revolutionizing Fisheries Data for Smarter Forecasting
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A unified platform to store, analyze, and visualize geo-referenced fish catch data for species-specific habitat modeling and forecasting.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="#get-started">
            <button className="bg-primary text-white py-3 px-6 rounded-lg text-lg hover:bg-primary-dark transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      <style jsx>{`
        .water-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('/path/to/your/water-texture.png') repeat; /* Add your water texture image */
          animation: wave 10s linear infinite;
          opacity: 0.5;
        }

        @keyframes wave {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </main>
  );
}
