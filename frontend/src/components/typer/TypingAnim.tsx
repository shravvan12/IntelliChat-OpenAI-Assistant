import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
  return (
    <div>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with IntelliChat',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built with OpenAI 🤖',
        2000,
        'Ask Anything, Anytime ⏱️',
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '60px', color:'white' , display:'inline-block', textShadow:"1px 1px 20px #000"}}
      repeat={Infinity}
    />
    </div>
  )
}

export default TypingAnim
