import { motion } from 'framer-motion'

interface CryptoIconProps {
  symbol: string
  size?: number
  className?: string
  animate?: boolean
}

const CryptoIcon = ({ symbol, size = 40, className = '', animate = true }: CryptoIconProps) => {
  const iconMap: { [key: string]: JSX.Element } = {
    BTC: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#F7931A"/>
        <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.745-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white"/>
      </svg>
    ),
    ETH: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
        <path d="M16.498 4v8.87l7.497 3.35z" fill="white" fillOpacity=".602"/>
        <path d="M16.498 4L9 16.22l7.498-3.35z" fill="white"/>
        <path d="M16.498 21.968v6.027L24 17.616z" fill="white" fillOpacity=".602"/>
        <path d="M16.498 27.995v-6.028L9 17.616z" fill="white"/>
        <path d="M16.498 20.573l7.497-4.353-7.497-3.348z" fill="white" fillOpacity=".2"/>
        <path d="M9 16.22l7.498 4.353v-7.701z" fill="white" fillOpacity=".602"/>
      </svg>
    ),
    BNB: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
        <path d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z" fill="white"/>
      </svg>
    ),
    SOL: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="url(#solana-gradient)"/>
        <defs>
          <linearGradient id="solana-gradient" x1="0" y1="16" x2="32" y2="16">
            <stop offset="0%" stopColor="#00FFA3"/>
            <stop offset="100%" stopColor="#DC1FFF"/>
          </linearGradient>
        </defs>
        <path d="M9.47 19.61a.59.59 0 01.42-.17h17.7c.31 0 .47.38.25.6l-3.63 3.63a.59.59 0 01-.42.17H6.09c-.31 0-.47-.38-.25-.6l3.63-3.63zm0-11.22a.59.59 0 01.42-.17h17.7c.31 0 .47.38.25.6l-3.63 3.63a.59.59 0 01-.42.17H6.09c-.31 0-.47-.38-.25-.6l3.63-3.63zm14.08 5.61a.59.59 0 00-.42-.17H5.43c-.31 0-.47.38-.25.6l3.63 3.63c.11.11.26.17.42.17h17.7c.31 0 .47-.38.25-.6l-3.63-3.63z" fill="white"/>
      </svg>
    ),
    XRP: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#23292F"/>
        <path d="M22.948 9h2.37l-5.837 5.837a4.762 4.762 0 01-6.736 0L6.682 9h2.37l4.656 4.656a2.857 2.857 0 004.04 0L22.948 9zM9.052 23H6.682l5.837-5.837a4.762 4.762 0 016.736 0L25.318 23h-2.37l-4.656-4.656a2.857 2.857 0 00-4.04 0L9.052 23z" fill="white"/>
      </svg>
    ),
    ADA: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#0033AD"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 7.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 20a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6.5-10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-13 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10.3-5.2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7.6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7.6 10.4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7.6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="white"/>
        <circle cx="16" cy="16" r="2.5" fill="white"/>
      </svg>
    ),
    DOGE: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#C2A633"/>
        <path d="M13 11h4.5c2.5 0 4.5 2 4.5 4.5S20 20 17.5 20H13v-9zm0 0V9m0 11v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 15h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    MATIC: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#8247E5"/>
        <path d="M21.03 11.52a1.5 1.5 0 00-1.5 0l-2.82 1.63-1.88 1.08-2.82 1.63a1.5 1.5 0 01-1.5 0l-2.25-1.3a1.5 1.5 0 01-.75-1.3v-2.6a1.5 1.5 0 01.75-1.3l2.25-1.3a1.5 1.5 0 011.5 0l2.25 1.3a1.5 1.5 0 01.75 1.3v1.63l1.88-1.08V8.89a1.5 1.5 0 00-.75-1.3L11.6 5.37a1.5 1.5 0 00-1.5 0L5.47 7.59a1.5 1.5 0 00-.75 1.3v4.44a1.5 1.5 0 00.75 1.3l4.63 2.67a1.5 1.5 0 001.5 0l2.82-1.63 1.88-1.08 2.82-1.63a1.5 1.5 0 011.5 0l2.25 1.3a1.5 1.5 0 01.75 1.3v2.6a1.5 1.5 0 01-.75 1.3l-2.25 1.3a1.5 1.5 0 01-1.5 0l-2.25-1.3a1.5 1.5 0 01-.75-1.3v-1.63l-1.88 1.08v1.63a1.5 1.5 0 00.75 1.3l4.63 2.67a1.5 1.5 0 001.5 0l4.63-2.67a1.5 1.5 0 00.75-1.3v-4.44a1.5 1.5 0 00-.75-1.3l-4.63-2.67z" fill="white"/>
      </svg>
    ),
    DOT: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#E6007A"/>
        <circle cx="16" cy="8" r="2.5" fill="white"/>
        <circle cx="16" cy="24" r="2.5" fill="white"/>
        <circle cx="8" cy="16" r="2.5" fill="white"/>
        <circle cx="24" cy="16" r="2.5" fill="white"/>
        <circle cx="11" cy="11" r="2" fill="white"/>
        <circle cx="21" cy="11" r="2" fill="white"/>
        <circle cx="11" cy="21" r="2" fill="white"/>
        <circle cx="21" cy="21" r="2" fill="white"/>
      </svg>
    ),
    AVAX: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#E84142"/>
        <path d="M18.8 20.4h3.6c.6 0 .9-.2 1.2-.6.3-.4.3-.8.1-1.2l-6.4-11.2c-.3-.5-.6-.7-1.2-.7s-.9.2-1.2.7L8.5 18.6c-.2.4-.2.8.1 1.2.3.4.6.6 1.2.6h3.6L16 13l2.8 7.4zm-9.6 0h2.4l1.6-4.2-2.8-4.9-1.2 2.1c-.3.5-.3 1 0 1.5l.6 1.1c.3.5.6.8 1.2.8l-1.8 3.6z" fill="white"/>
      </svg>
    ),
    LINK: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#2A5ADA"/>
        <path d="M16 6l-2.83 1.64v3.27L16 12.54l2.83-1.64V7.64L16 6zm5.66 3.27l-2.83 1.64v3.27l2.83 1.64 2.83-1.64V11.9l-2.83-1.63zm-11.32 0L7.51 10.9v3.27l2.83 1.64 2.83-1.64V11.9l-2.83-1.63zM16 13.45l-2.83 1.64v3.27L16 20l2.83-1.64v-3.27L16 13.45zm5.66 3.28l-2.83 1.63v3.28L21.66 23l2.83-1.64v-3.27l-2.83-1.64zm-11.32 0l-2.83 1.64v3.27L10.34 23l2.83-1.64v-3.27l-2.83-1.64zM16 20.91l-2.83 1.64V26L16 27.64 18.83 26v-3.45L16 20.91z" fill="white"/>
      </svg>
    ),
    UNI: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#FF007A"/>
        <path d="M19.5 13.5c0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5c0 1.4.82 2.6 2 3.16v4.34h3v-4.34c1.18-.56 2-1.76 2-3.16zm-3.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>
        <path d="M8 20h3v3H8v-3zm13 0h3v3h-3v-3z" fill="white" fillOpacity=".6"/>
      </svg>
    ),
  }

  const IconComponent = iconMap[symbol] || (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#64748b"/>
      <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
        {symbol.substring(0, 3)}
      </text>
    </svg>
  )

  if (!animate) {
    return (
      <div
        className={className}
        style={{ width: size, height: size }}
      >
        {IconComponent}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {IconComponent}
    </motion.div>
  )
}

export default CryptoIcon
