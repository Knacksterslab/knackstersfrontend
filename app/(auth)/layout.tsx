import SuperTokensProvider from '@/components/providers/SuperTokensProvider'

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperTokensProvider>{children}</SuperTokensProvider>;
}
