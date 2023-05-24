import { Menu } from '../components/molecules/menu';

import '../styles/globals.css';
import { NextAuthProvider } from '../components/molecules/authProvider';

export const metadata = {
    title: {
        default: 'Next.js App Router',
        template: '%s | Next.js App Router',
    },
    description:
        'A playground to explore new Next.js App Router features such as nested layouts, ' +
        'instant loading states, streaming, and component level data fetching.',
};

export default function RootLayout({ children }) {
    return (
        // <html lang="en" className="[color-scheme:dark]">
        <html lang="en">
            <body>
                <NextAuthProvider>
                    <Menu />
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
