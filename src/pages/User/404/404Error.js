import { HouseLine } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Button from '~/components/Button';
import Image from '~/components/Image';
import routes from '~/config/routes';
import styles from './404Error.module.scss';

const cx = classNames.bind(styles);

export default function Error404() {
    return (
        <>
            <div className={cx('err_wrapper')}>
                <div className={cx('img')}>
                    <Image src={images.error_img} alt={'Error img'} />
                </div>
                <div className={cx('error-content')}>
                    <h2 className={cx('error-title')}>Opp’s that page can’t be found</h2>
                    <p className={cx('error-text')}>
                        It looks like nothing was found at this location. The page or post you are looking for has been
                        moved or removed.
                    </p>
                    <Button to={routes.home} primary large leftIcon={<HouseLine size={25} weight="fill" />}>
                        BACK GO HOME
                    </Button>
                </div>
            </div>
        </>
    );
}
