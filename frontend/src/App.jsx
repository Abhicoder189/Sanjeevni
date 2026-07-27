import { Activity, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

import ChatBox from "./components/ChatBox";

function Feature({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border bg-white/70 backdrop-blur-xl p-6 shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground leading-6">
        {description}
      </p>
    </motion.div>
  );
}

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

        {/* Background */}

        <div className="absolute inset-0 -z-10 overflow-hidden">

          <div className="absolute -top-60 -left-48 h-[500px] w-[500px] rounded-full bg-sky-300/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[550px] w-[550px] rounded-full bg-cyan-300/20 blur-3xl" />

        </div>

        <main className="mx-auto max-w-6xl px-6 py-12">

          {/* Hero */}

          <motion.section
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >

            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2 shadow-sm">

              <Sparkles className="h-4 w-4 text-primary" />

              <span className="text-sm font-medium">
                Powered by Gemma 4
              </span>

            </div>

            <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl">

              AI Health

              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">

                Triage Assistant

              </span>

            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">

              Describe your symptoms naturally in your preferred language.
              Our multilingual AI understands your input and estimates the
              urgency of medical attention while encouraging professional care.

            </p>

          </motion.section>

          {/* Main Card */}

          <motion.section
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14"
          >

            <ChatBox />

          </motion.section>

          {/* Features */}

          <section className="mt-20 grid gap-6 md:grid-cols-3">

            <Feature
              icon={<Globe2 size={22} />}
              title="Multilingual AI"
              description="Supports English, Hindi, Marathi, Tamil, Telugu, Kannada, Gujarati and many more."
            />

            <Feature
              icon={<Activity size={22} />}
              title="Smart Triage"
              description="Classifies symptoms into Self Care, Routine, Urgent or Emergency with confidence estimation."
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Safe Assistance"
              description="Designed to assist—not diagnose. Encourages users to seek professional medical care."
            />

          </section>

          {/* Footer */}

          <footer className="mt-24 border-t py-8 text-center text-sm text-muted-foreground">

            Built with React • Express • Gemma 4 • Google AI Studio

          </footer>

        </main>

      </div>
    </>
  );
}