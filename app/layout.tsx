import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import AuthProvider from './auth/AuthProvider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter(
  {
    subsets: ['latin'],
    variable: '--font-inter',
  }
)

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="purple">
              <Navbar />
              <main>
                <Container>
                  {children}
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html >
  )
}
