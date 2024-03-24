import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    className,
    upload = false,
    square = false,
    outline = false,
    small = false,
    large = false,
    circle = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        upload,
        square,
        outline,
        disabled,
        small,
        large,
        circle,
    });
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <div className={cx('icon')}>{leftIcon}</div>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <div className={cx('icon')}>{rightIcon}</div>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    primary: PropTypes.bool,
    upload: PropTypes.bool,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
