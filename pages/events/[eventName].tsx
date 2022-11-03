import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const postMessage = (message: string) => {
  window.parent.postMessage(message, '*')
}

const EventDetailPage = () => {
  const countRef = useRef(0)
  const { query } = useRouter()

  const handleMessage = (event: MessageEvent) => {
    console.log(event)
  }

  const handleClickButton = () => {
    postMessage(`count = ${countRef.current}`)
    countRef.current += 1
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    postMessage('event app screen loaded')
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div>
      <div>{`Event Page of ${query.eventName}`}</div>
      <button type="button" onClick={handleClickButton}>
        trigger
      </button>
    </div>
  )
}

export default EventDetailPage