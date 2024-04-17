import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContactDetail.module.scss';
import Input from '~/components/Input';
import { Subtitles } from '@phosphor-icons/react';
import Button from '~/components/Button';
import TextArea from '~/components/TextArea';

const cx = classNames.bind(styles);

export default function ContactDetail() {
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <h2>Information</h2>
                <div className={cx('infor')}>
                    <div className={cx('input_list')}>
                        <Input
                            classNameInput={cx('input')}
                            rightIcon={<Subtitles size={20} weight="bold" />}
                            placeholder={'Topic'}
                            type="text"
                        />
                        <TextArea className={cx('text_area')} placeholder={'Content'} />
                    </div>
                    <div className={cx('action-btn')}>
                        <Button primary large className={cx('btn')}>
                            Send Message
                        </Button>
                        <Button primary large className={cx('btn')}>
                            Delete
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
