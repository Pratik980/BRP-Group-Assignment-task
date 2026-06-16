import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "@/lib/contact.functions";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      organization: String(fd.get("organization") || ""),
      message: String(fd.get("message") || ""),
    };

    const next: Record<string, string> = {};
    if (!data.name.trim()) next.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Please enter a valid email";
    if (data.message.trim().length < 10) next.message = "Please write at least 10 characters";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setLoading(true);
    try {
      await submitContact({
        data: {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          organization: data.organization.trim(),
          message: data.message.trim(),
        },
      });

      setDone(true);
      toast.success("Thank you — we'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Could not send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/40 bg-background/60 p-12 text-center backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500"
        >
          <CheckCircle className="h-7 w-7 text-white" />
        </motion.div>
        <div className="font-display text-2xl text-gradient">Message received.</div>
        <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
          A member of the BRP Group team will reach out shortly.
        </p>
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => setDone(false)}
          className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
        >
          Send another
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border/40 bg-background/60 p-5 text-left backdrop-blur-sm sm:p-7 md:p-9"
    >
      <div className="mb-7 border-b border-border/30 pb-6">
        <h3 className="font-display text-xl text-foreground">Send us a message</h3>
        <p className="mt-1.5 text-sm font-light text-muted-foreground">
          We typically respond within one business day.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            error={errors.name}
            maxLength={100}
            required
            focused={focused === "name"}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="Your full name"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            error={errors.email}
            maxLength={255}
            required
            focused={focused === "email"}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            placeholder="you@company.com"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Phone (optional)"
            name="phone"
            type="tel"
            maxLength={20}
            focused={focused === "phone"}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            placeholder="+977 98XXXXXXXX"
          />
          <Field
            label="Organization (optional)"
            name="organization"
            maxLength={150}
            focused={focused === "organization"}
            onFocus={() => setFocused("organization")}
            onBlur={() => setFocused(null)}
            placeholder="Your company"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Message
          </label>
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={5}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused(null)}
            className={`w-full resize-none rounded-xl border bg-background/80 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/50 ${
              focused === "message"
                ? "border-primary shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.12)]"
                : "border-border/50"
            }`}
            placeholder="Tell us what you're building or exploring…"
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 overflow-hidden text-xs text-destructive"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex w-full min-h-11 items-center justify-center gap-2.5 rounded-xl bg-foreground px-8 py-3.5 text-sm font-medium text-background shadow-float transition-shadow duration-300 hover:shadow-glow disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  maxLength,
  required,
  focused,
  onFocus,
  onBlur,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  maxLength?: number;
  required?: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </label>
      <motion.div animate={focused ? { y: -1 } : { y: 0 }} transition={{ duration: 0.2 }}>
        <input
          name={name}
          type={type}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full rounded-xl border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/50 ${
            focused
              ? "border-primary shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.12)]"
              : "border-border/50"
          } ${error ? "border-destructive" : ""}`}
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 overflow-hidden text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
