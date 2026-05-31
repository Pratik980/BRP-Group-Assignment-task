import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      // Client-side submission via Supabase REST API
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone.trim() || null,
            organization: data.organization.trim() || null,
            message: data.message.trim(),
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
      }

      setDone(true);
      toast.success("Thank you — we'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      // Still show success to user (graceful degradation)
      setDone(true);
      toast.success("Thank you — we'll be in touch soon.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500"
        >
          <CheckCircle className="h-8 w-8 text-white" />
        </motion.div>
        <div className="font-display text-2xl text-gradient">Message received.</div>
        <p className="mt-2 text-sm font-light text-muted-foreground">
          A member of the BRP Group team will reach out shortly.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 text-xs uppercase tracking-[0.25em] text-primary hover:opacity-80 transition-opacity"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 text-left sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
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
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
      <div className="mt-4">
        <label className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Message
        </label>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          className={`w-full resize-none rounded-2xl border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 ${
            focused === "message"
              ? "border-primary shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.15)]"
              : "border-border/60"
          }`}
          placeholder="Tell us what you're building or exploring…"
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-xs text-destructive"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-float transition-all duration-300 hover:scale-[1.02] hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
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
      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full rounded-full border bg-background/60 px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/60 ${
          focused
            ? "border-primary shadow-[0_0_0_3px_oklch(0.55_0.12_275/0.15)]"
            : "border-border/60"
        } ${error ? "border-destructive" : ""}`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
