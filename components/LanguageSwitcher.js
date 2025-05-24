'use client'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale, pathname, query, asPath } = router

  const changeLanguage = (lng) => {
    router.push({ pathname, query }, asPath, { locale: lng })
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={() => changeLanguage('ar')}
        className={`hover:opacity-80 ${locale === 'ar' ? 'font-bold' : ''}`}
      >
        🇸🇦 العربية
      </button>

      <button
        onClick={() => changeLanguage('en')}
        className={`hover:opacity-80 ${locale === 'en' ? 'font-bold' : ''}`}
      >
        🇺🇸 English
      </button>
    </div>
  )
}
