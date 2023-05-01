import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import './draggable-div.css'

interface DraggableProps {
  children: React.ReactNode
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  ({ children }, ref) => {
    const draggableRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault()
        if (isDragging && draggableRef.current) {
          const x = event.clientX - offset.x
          const y = event.clientY - offset.y
          const maxX = window.innerWidth - draggableRef.current.offsetWidth
          const maxY = window.innerHeight - draggableRef.current.offsetHeight
          const boundedX = Math.max(0, Math.min(x, maxX))
          const boundedY = Math.max(0, Math.min(y, maxY))
          draggableRef.current.style.left = `${boundedX}px`
          draggableRef.current.style.top = `${boundedY}px`
        }
      }

      const handleMouseUp = () => {
        setIsDragging(false)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }, [isDragging, offset])

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      if (draggableRef.current) {
        setIsDragging(true)
        const x = event.clientX - draggableRef.current.offsetLeft
        const y = event.clientY - draggableRef.current.offsetTop
        setOffset({ x, y })
      }
    }

    useImperativeHandle(ref, () => draggableRef.current!)

    return (
      <div
        ref={draggableRef}
        className="draggable"
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    )
  }
)

export default Draggable
