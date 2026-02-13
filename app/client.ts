import { createClient } from 'honox/client'
import './style.css'

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import('react-dom/client')
    hydrateRoot(root, elem as unknown as import('react').ReactNode)
  },
  createElement: async (type: any, props: any) => {
    const { createElement } = await import('react')
    return createElement(type, props) as unknown as Node
  },
})
