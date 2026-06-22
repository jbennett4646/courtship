import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const payload = await req.json();

  // Database webhook sends { record: { email, created_at, ... } }
  const email = payload.record?.email ?? "unknown";
  const createdAt = payload.record?.created_at ?? new Date().toISOString();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "josh@joshwbennett.com",
      subject: "New Courtingly signup",
      html: `
        <p>A new user just signed up on <strong>Courtingly</strong>.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date(createdAt).toLocaleString("en-US", { timeZone: "UTC" })} UTC</p>
      `,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: res.ok ? 200 : 500,
  });
});
