import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trash2,
  Upload,
  User,
} from "lucide-react";

import { Nav } from "@/components/brp/Nav";
import { Footer } from "@/components/brp/Footer";
import { ThemeBackdrop } from "@/components/brp/ThemeBackdrop";
import { SectionScene3DLazy } from "@/components/brp/SectionScene3DLazy";
import { fetchVacancies, submitApplication } from "@/lib/career.api";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "BRP Group — Careers" },
      {
        name: "description",
        content:
          "Submit your application to join BRP Group's premier diversified venture ecosystem. Upload your CV and contact details to get in touch with our recruitment team.",
      },
      { property: "og:title", content: "BRP Group — Join Our Team" },
      {
        property: "og:description",
        content:
          "Join an innovative, fast-growing ecosystem of ventures in Nepal. Submit your general application today.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { data: vacancies = [] } = useQuery({
    queryKey: ["public-careers"],
    queryFn: fetchVacancies,
  });

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Form status states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // File drop/change handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, DOC, and DOCX files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }
    setResumeFile(file);
    // Clear resume file error if present
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next.resume;
      return next;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Client-side validations
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!phone.trim() || phone.trim().length < 5) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!address.trim()) errors.address = "Address is required";
    if (!position.trim()) errors.position = "Position is required";
    if (!experience.trim() || experience.trim().length < 10) {
      errors.experience = "Please write a summary of your experience (at least 10 characters)";
    }
    if (portfolioUrl.trim() && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(portfolioUrl.trim())) {
      errors.portfolioUrl = "Portfolio/LinkedIn link must start with http:// or https://";
    }
    if (!resumeFile) {
      errors.resume = "CV/Resume file is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setSubmitting(true);
    try {
      await submitApplication(
        {
          vacancyId: null,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          position: position.trim(),
          experience: experience.trim(),
          portfolioUrl: portfolioUrl.trim() || null,
          coverLetter: null,
        },
        resumeFile!,
      );
      setSubmitSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to submit application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPosition("");
    setExperience("");
    setPortfolioUrl("");
    setResumeFile(null);
    setSubmitSuccess(false);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SectionScene3DLazy
        variant="career"
        className="pointer-events-none fixed inset-0 z-[1] opacity-40 mix-blend-normal"
      />
      <ThemeBackdrop variant="page" className="z-[2] opacity-50" />
      <Nav />
      <div className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background pt-32 pb-10 md:pb-12">
          <ThemeBackdrop variant="hero" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                <Sparkles className="h-3 w-3 text-primary shrink-0 mr-1.5 animate-pulse" />
                Careers at BRP Group
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-foreground"
            >
              Work with <span className="text-gradient italic">BRP Group</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-xl mx-auto text-sm sm:text-base font-light text-muted-foreground leading-relaxed"
            >
              We are always looking for talented individuals to join our growing ecosystem of
              ventures across Nepal. Fill out the application form below and our recruitment team
              will get back to you.
            </motion.p>
          </div>
        </section>

        {/* --- OPEN POSITIONS SECTION --- */}
        {vacancies.length > 0 && (
          <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-12 md:py-16">
            <ThemeBackdrop variant="section" />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 xl:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <div className="glass mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                  <Building2 className="h-3 w-3 shrink-0 mr-1.5" />
                  Open positions
                </div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                  Current <span className="text-gradient italic">vacancies</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                  Browse our available positions and apply directly.
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {vacancies.map((vacancy, i) => (
                  <motion.div
                    key={vacancy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="glass-strong group relative overflow-hidden rounded-2xl border border-border/40 p-5 transition-all duration-300 hover:shadow-float hover:-translate-y-1"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display text-lg font-bold text-foreground leading-snug">
                          {vacancy.title}
                        </h3>
                        <span className="shrink-0 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary whitespace-nowrap">
                          {vacancy.employment_type}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5 shrink-0" />
                          <span>{vacancy.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span>{vacancy.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 shrink-0" />
                          <span>{vacancy.experience_required}</span>
                        </div>
                        {vacancy.application_deadline && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                            <span>
                              Deadline:{" "}
                              {new Date(vacancy.application_deadline).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {vacancy.description}
                      </p>

                      {vacancy.requirements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                            Requirements
                          </p>
                          <ul className="space-y-1">
                            {vacancy.requirements.slice(0, 3).map((req, j) => (
                              <li
                                key={j}
                                className="text-[11px] text-muted-foreground flex items-start gap-1.5"
                              >
                                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                                {req}
                              </li>
                            ))}
                            {vacancy.requirements.length > 3 && (
                              <li className="text-[11px] text-muted-foreground">
                                +{vacancy.requirements.length - 3} more
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="mt-auto pt-3 border-t border-border/30 flex flex-wrap gap-2">
                        {vacancy.apply_url && (
                          <a
                            href={vacancy.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                          >
                            Apply now
                          </a>
                        )}
                        {vacancy.apply_email && (
                          <a
                            href={`mailto:${vacancy.apply_email}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                          >
                            {vacancy.apply_email}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- APPLICATION FORM SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/25 to-background pb-16 md:pb-20">
          <ThemeBackdrop variant="section" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 xl:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-strong border border-border/40 p-5 sm:p-7 rounded-3xl shadow-glass relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/10 to-sky-500/10 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    /* Success State */
                    <motion.div
                      key="success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto"
                    >
                      <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mb-6 text-primary shadow-glow">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-display text-foreground">
                        Application Submitted
                      </h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        Thank you for your interest in joining BRP Group,{" "}
                        <span className="font-semibold text-foreground">{fullName}</span>. We have
                        successfully received your details and resume. Our recruitment team will
                        review your profile and contact you if it aligns with our requirements.
                      </p>
                      <button
                        onClick={handleResetForm}
                        className="mt-8 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-xl border border-border transition-colors cursor-pointer text-sm"
                      >
                        Submit Another Application
                      </button>
                    </motion.div>
                  ) : (
                    /* Application Form */
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="border-b border-border pb-3 mb-4">
                        <h2 className="text-lg font-bold tracking-tight text-foreground font-display flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Application Form
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          Please provide accurate information and upload your latest CV/resume.
                        </p>
                      </div>

                      {/* Personal Info Grid */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              onFocus={() => setFocusedField("fullName")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.fullName
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "fullName"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="Your name"
                            />
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.fullName && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.fullName}
                            </span>
                          )}
                        </div>

                        {/* Email */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Email Address <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setFocusedField("email")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.email
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "email"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="Your email"
                            />
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.email && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Phone Number <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onFocus={() => setFocusedField("phone")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.phone
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "phone"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="Your phone number"
                            />
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.phone && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.phone}
                            </span>
                          )}
                        </div>

                        {/* Address */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Current Address <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              onFocus={() => setFocusedField("address")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.address
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "address"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="Your address"
                            />
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.address && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.address}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Position Field (Editable, regular input) */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Position Applied For <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              onFocus={() => setFocusedField("position")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.position
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "position"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="Position applied for"
                            />
                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.position && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.position}
                            </span>
                          )}
                        </div>

                        {/* Portfolio / LinkedIn Link */}
                        <div className="relative group">
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                            Portfolio / LinkedIn
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              value={portfolioUrl}
                              onChange={(e) => setPortfolioUrl(e.target.value)}
                              onFocus={() => setFocusedField("portfolioUrl")}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-background border ${
                                formErrors.portfolioUrl
                                  ? "border-destructive focus:ring-destructive/30"
                                  : focusedField === "portfolioUrl"
                                    ? "border-primary ring-2 ring-primary/25"
                                    : "border-border hover:border-muted-foreground/30"
                              } rounded-xl text-sm focus:outline-none transition-all duration-300`}
                              placeholder="https://..."
                            />
                            <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                          </div>
                          {formErrors.portfolioUrl && (
                            <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {formErrors.portfolioUrl}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Professional Experience Summary */}
                      <div className="relative group">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Experience Summary <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          onFocus={() => setFocusedField("experience")}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-2.5 bg-background border ${
                            formErrors.experience
                              ? "border-destructive focus:ring-destructive/30"
                              : focusedField === "experience"
                                ? "border-primary ring-2 ring-primary/25"
                                : "border-border hover:border-muted-foreground/30"
                          } rounded-xl text-sm focus:outline-none transition-all duration-300 resize-none`}
                          placeholder="Your experience summary"
                        />
                        {formErrors.experience && (
                          <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.experience}
                          </span>
                        )}
                      </div>

                      {/* CV / Resume File Upload Drag-and-drop */}
                      <div className="relative">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Upload CV / Resume <span className="text-destructive">*</span>
                        </label>

                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 ${
                            dragOver
                              ? "border-primary bg-primary/5 scale-[0.98]"
                              : resumeFile
                                ? "border-primary/50 bg-primary/5"
                                : formErrors.resume
                                  ? "border-destructive bg-destructive/5"
                                  : "border-border hover:border-primary/30 hover:bg-muted/10"
                          }`}
                        >
                          <input
                            type="file"
                            id="cv-upload"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          {resumeFile ? (
                            <div className="space-y-2">
                              <div className="p-2.5 bg-primary/10 text-primary border border-primary/20 rounded-full w-fit mx-auto">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground max-w-md truncate mx-auto">
                                  {resumeFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => setResumeFile(null)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Remove File
                              </button>
                            </div>
                          ) : (
                            <label htmlFor="cv-upload" className="cursor-pointer space-y-2">
                              <div className="p-2.5 bg-muted text-muted-foreground rounded-full w-fit mx-auto group-hover:text-primary transition-colors">
                                <Upload className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Supports PDF, DOC, DOCX up to 10MB
                                </p>
                              </div>
                            </label>
                          )}
                        </div>

                        {formErrors.resume && (
                          <span className="text-xs text-destructive mt-1.5 block flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {formErrors.resume}
                          </span>
                        )}
                      </div>

                      {/* Submit Action */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:shadow-glow transition-all duration-300 disabled:opacity-50 text-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                              Submitting application...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
