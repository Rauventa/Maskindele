import React from 'react';
import { $t } from '../../lib/i18n';
import './Footer.scss'

interface FooterProps {

}

export const Footer = ({

}: FooterProps) => {
  return (
    <footer>
      <div className="left-footer">
        {$t('(C) Maskindele')}
      </div>
      <div className="right-footer">
        {$t('2021. All right registered.')}
      </div>
    </footer>
  )
}