import SuperTokensProvider from '@/components/providers/SuperTokensProvider'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <SuperTokensProvider>{children}</SuperTokensProvider>;
}
