import { MagnifyingGlass } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import AvatarCustom from '~/components/AvatarCustom';
import Input from '~/components/Input';
import { useAuth } from '~/hooks/useAuth';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

export default function SideBar() {
    const { user } = useAuth();
    return (
        <div className={cx('side-bar')}>
            <Input
                className={cx('input_')}
                placeholder={'Search...'}
                rightIcon={<MagnifyingGlass size={25} weight="bold" />}
            />
            <Link className={cx('user')} to={`/admin-account/${user?.id}`}>
                <h2>{user?.name}</h2>
                <AvatarCustom src={user?.avatar?.url} stringAva={user?.name} />
            </Link>
        </div>
    );
}
