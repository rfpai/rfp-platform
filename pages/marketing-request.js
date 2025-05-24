import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function MarketingRequest() {
  const { t } = useTranslation('common')
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    requestDetails: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // لاحقًا نربطه بـ API حقيقي
    setMessage(t('submitted'))
    setForm({
      companyName: '',
      contactPerson: '',
      requestDetails: '',
    })
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <h1 className="text-2xl font-bold mb-4">{t('marketingTitle')}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder={t('companyName')}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="contactPerson"
          value={form.contactPerson}
          onChange={handleChange}
          placeholder={t('contactPerson')}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="requestDetails"
          value={form.requestDetails}
          onChange={handleChange}
          placeholder={t('requestDetails')}
          className="w-full border px-4 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t('submit')}
        </button>
        {message && (
          <p className="mt-2 text-green-700 font-medium">{message}</p>
        )}
      </form>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
