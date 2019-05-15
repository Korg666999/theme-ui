import {
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import { useThemeUI } from './context'

const STORAGE_KEY = 'theme-ui-color-mode'

const get = (init) => window.localStorage.getItem(STORAGE_KEY) || init
const set = (value) => window.localStorage.setItem(STORAGE_KEY, value)

export const useColorState = () => {
  const [ mode, setMode ] = useState(get())

  useLayoutEffect(() => {
    const stored = get()
    if (!stored  || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
    if (!mode) return
    set(mode)
  }, [ mode ])

  return [ mode, setMode ]
}

export const useColorMode = (initialMode) => {
  const { colorMode, setColorMode } = useThemeUI()

  // initialize
  useEffect(() => {
    const init = get(initialMode)
    if (!init || init === colorMode) return
    setColorMode(init)
  }, [])

  return [ colorMode, setColorMode ]
}

export default useColorMode
