import { useEffect } from "react"

const useSetActiveTheme = (newTheme: string) => {
  useEffect(() => {
    window.localStorage.setItem('ASTRID_THEME', newTheme)

  }, [newTheme])
}

export default useSetActiveTheme