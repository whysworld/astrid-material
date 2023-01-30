import { useEffect, useState } from "react"

const useGetActiveTheme = () => {
  const [theme, setTheme] = useState<string | null>(null)
  useEffect(() => {
    const currentTheme = window.localStorage.getItem('ASTRID_THEME')
    setTheme(currentTheme)
  }, [])
  return theme
}

export default useGetActiveTheme