/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react'

export function useHook() {
    const [isHovered, setHovered] = useState(false)
    const ref = useRef(null)

    function mouseEnter() {
        setHovered(true)
    } 

    function mouseLeave() {
        setHovered(false)
    } 

    useEffect(()=> {
      ref.current.addEventListener('mouseenter', mouseEnter)
      ref.current.addEventListener('mouseleave', mouseLeave)
      
          }, [])
  return (
     [isHovered, ref]
  )
}
