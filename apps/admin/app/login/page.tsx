import { LogIn } from "lucide-react";

export const metadata = {
  title: "Sign in — Possible CMS",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-sm rounded-lg bg-surface-raised p-8 shadow-sm">
        <h1 className="text-center text-xl font-bold text-text-primary">
          Possible CMS
        </h1>
        <p className="mt-2 text-center text-sm text-text-secondary">
          Sign in to manage your sites.
        </p>
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
        >
          <LogIn size={16} />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
