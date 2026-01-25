'use client'

import { useEffect } from 'react'

export default function TawkToChat() {
  useEffect(() => {
    // TODO: Get your Property ID and Widget ID from https://dashboard.tawk.to
    // After signup: Settings > Property ID and Widget ID
    const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || 'YOUR_PROPERTY_ID'
    const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'YOUR_WIDGET_ID'
    
    // Load Tawk.to script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    document.body.appendChild(script)

    // Optional: Set user attributes if authenticated
    // You can enhance this later to pull from UserContext
    // Example:
    // script.onload = () => {
    //   if (window.Tawk_API) {
    //     const user = getUserFromSession()
    //     if (user) {
    //       window.Tawk_API.setAttributes({
    //         name: user.name,
    //         email: user.email,
    //       })
    //     }
    //   }
    // }

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="tawk.to"]`)
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  // Widget renders automatically via script
  return null
}
