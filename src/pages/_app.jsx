import 'focus-visible'
import '@/styles/tailwind.css'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
  <SessionProvider session={session}>
 <Component {...pageProps} />
  </SessionProvider>
  )
}
