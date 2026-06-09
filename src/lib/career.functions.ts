/**
 * Server-only career handlers (TanStack Start createServerFn).
 * The app runs as a Vite SPA — use `@/lib/career.api` from client routes instead.
 *
 * Re-enable these when TanStack Start server middleware is configured in vite.config.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const applicationSchema = z.object({
  vacancyId: z.string().uuid().nullable().optional(),
  fullName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(20),
  address: z.string().trim().min(1).max(200),
  position: z.string().trim().min(1).max(100),
  experience: z.string().trim().min(10).max(2000),
  portfolioUrl: z.string().trim().url().or(z.literal("")).optional().nullable(),
  coverLetter: z.string().trim().max(5000).optional().nullable(),
  resume: z.object({
    name: z.string(),
    type: z.string(),
    base64: z.string(),
  }),
});

export const fetchVacanciesServer = createServerFn({ method: "GET" }).handler(async () => {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("job_vacancies")
    .select("*")
    .eq("is_active", true)
    .gte("application_deadline", nowIso)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Could not fetch vacancies from the database.");
  return data || [];
});

export const submitApplicationServer = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const buffer = Buffer.from(data.resume.base64, "base64");
    const filePath = `${Date.now()}_${data.resume.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(filePath, buffer, { contentType: data.resume.type });

    if (uploadError) throw new Error("Failed to upload CV/resume.");

    const { error: dbError } = await supabaseAdmin.from("job_applications").insert({
      vacancy_id: data.vacancyId || null,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      position: data.position,
      experience: data.experience,
      portfolio_url: data.portfolioUrl || null,
      cover_letter: data.coverLetter || null,
      resume_path: filePath,
      status: "pending",
    });

    if (dbError) {
      await supabaseAdmin.storage.from("resumes").remove([filePath]);
      throw new Error("Could not submit application.");
    }

    return { success: true as const };
  });
