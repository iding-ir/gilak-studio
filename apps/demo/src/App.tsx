import './i18n/config'
import { GilakCanvas } from 'gilak-canvas'
import { GilakEyedropper } from 'gilak-eyedropper'
import { useTranslation } from 'react-i18next'
import styles from './App.module.scss'

function App() {
  const { t } = useTranslation('demo')

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </div>

      <div className={styles.card}>
        <GilakCanvas />
        <GilakEyedropper />
      </div>

      <p className={styles.footer}>{t('footer')}</p>
    </div>
  )
}

export default App
