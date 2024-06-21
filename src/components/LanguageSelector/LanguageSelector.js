import React, { useState } from 'react';
import styles from './LanguageSelector.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import AvatarCustom from '../AvatarCustom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export default function LanguageSelector({ onLanguageChange }) {
    const languages = [
        { code: 'th', name: 'Thailand (ประเทศไทย)', flag: images.thailan },
        { code: 'vn', name: 'Việt Nam (Tiếng Việt)', flag: images.vi },
        { code: 'en', name: 'Global (English)', flag: images.global },
        { code: 'sg', name: 'Singabore (English)', flag: images.sin },
    ];

    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLanguage = (languageCode) => {
        setSelectedLanguage(languageCode);
        i18n.changeLanguage(languageCode);
        onLanguageChange(languageCode);
    };

    return (
        <div className={cx('languages')}>
            <div className={cx('title')}>{t('common.language')}</div>
            <div className={cx('language')}>
                {languages.map((language) => (
                    <div
                        id={language.code}
                        key={language.code}
                        className={cx('language-option', `${selectedLanguage === language.code ? 'selected' : ''}`)}
                        onClick={() => changeLanguage(language.code)}
                    >
                        <span className={cx('language-item')}>
                            <AvatarCustom width={20} height={20} src={language.flag} stringAva={language.code} />
                            {language.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
