import React, { useEffect, useState } from "react"
import { useSpring } from "react-spring"
import { animated } from "react-spring"

interface FadeInProps {
  text: string
}

export default function FadeIn({ text }: FadeInProps) {
  const [isVisible, setVisible] = useState(true)

  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0 })

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 450)

    return () => {
      setVisible(false)
      clearTimeout(timer1)
    }
  }, [text])

  if (text) return <animated.div style={{ opacity }}>{text}</animated.div>
  else return <></>
}
