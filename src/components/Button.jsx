import React from 'react'

function Button({leftIcon,title,id,rightIcon,containerClass}) {
  return (
    <button id={id} className={`flex items-center relative z-10 w-fit cursor-ppinter overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`} >
      {leftIcon}
      <span className='relative overflow-hidden font text-xs uppercase'></span>
      <div>
        {title}
      </div>
      {rightIcon}
    
    </button>
  )
}

export default Button