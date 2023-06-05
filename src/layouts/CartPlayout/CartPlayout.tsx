import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function CartPlayout({ children }: Props) {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}
