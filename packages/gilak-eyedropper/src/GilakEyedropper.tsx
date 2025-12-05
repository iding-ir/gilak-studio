import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './GilakEyedropper.module.scss'

export const GilakEyedropper: React.FC = () => {
  const { t } = useTranslation('eyedropper')

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('greeting')}</h2>
      <p className={styles.description}>{t('description')}</p>
    </div>
  )
}
