import { Section } from "@/components/ui/Section";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  const googleAvailable = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <Section align="center" className="min-h-[60vh] flex items-center">
      <LoginForm googleAvailable={googleAvailable} />
    </Section>
  );
}
