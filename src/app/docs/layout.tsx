import { Providers } from '@/app/providers'
import { Layout } from '@/components/layout'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
      <Providers>
        <div className="w-full">
          <Layout>{children}</Layout>
        </div>
      </Providers>
    </div>
  )
}
