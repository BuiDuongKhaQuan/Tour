import { useTheme } from '@emotion/react';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CreditCard } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { MdPhoneAndroid } from 'react-icons/md';
import { Store } from 'react-notifications-component';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import routes from '~/config/routes';
import { initialOptions, notification } from '~/utils/constants';
import { paypalCapture, paypalOrder, paypalSendMail } from '~/utils/httpRequest';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
const DATA_SELECT = {
    id: 1,
    title: '--Please select your Bank--',
    icon: <MdPhoneAndroid size={20} />,
    items: [
        {
            value: '1',
            label: 'Momo',
        },
        {
            value: '2',
            label: 'Zalo pay',
        },
    ],
};

export default function Payment() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const tourBooked = location.state;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const createOrder = async () => {
        try {
            const orderData = await paypalOrder(tourBooked.id, tourBooked.price);
            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            senNotication('Danger', 'danger', `Could not initiate PayPal Checkout...`);
        }
    };
    const onApprove = async (data, actions) => {
        try {
            const orderData = await paypalCapture(data.orderID);
            const errorDetail = orderData?.details?.[0];
            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else {
                const transaction = orderData.purchase_units[0].payments.captures[0];
                await paypalSendMail(orderData, user.email, tourBooked.id);
                senNotication(
                    'Success',
                    'success',
                    `Transaction ${transaction.status}: ${transaction.id}. Check your email for invoice details`,
                );
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            }
        } catch (error) {
            console.error(error);
            senNotication('Danger', 'danger', `Sorry, your transaction could not be processed...`);
        }
    };
    const senNotication = (title, type, message) => {
        Store.addNotification({
            ...notification,
            title,
            message,
            type,
            dismiss: {
                duration: 5000,
                onScreen: true,
                pauseOnHover: true,
                showIcon: true,
            },
        });
        if (type === 'success') {
            setTimeout(() => {
                navigate(routes.home);
            }, 5000);
        }
    };
    return (
        <>
            <div className={cx('wraper')}>
                <div className={cx('container')}>
                    <div className={cx('tabs')}>
                        <AppBar position="static" className={cx('app-bar')}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Credit Card" {...a11yProps(0)} />
                                <Tab label="Paypal" {...a11yProps(1)} />
                                <Tab label="Net Banking" {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <div className={cx('tab-content')}>
                                    <form className={cx('from-submit')}>
                                        <div className={cx('input-wraper')}>
                                            <h4>Card Owner</h4>
                                            <Input classNameInput={cx('input')} placeholder={'Card Owner Name'} />
                                        </div>
                                        <div className={cx('input-wraper')}>
                                            <h4>Card Number</h4>
                                            <Input
                                                classNameInput={cx('input')}
                                                placeholder={'Valid card number'}
                                                classNameIconRight={cx('input-icon-right')}
                                                rightIcon={
                                                    <>
                                                        <CreditCard size={29} weight="bold" />
                                                        <FaCcVisa size={24} style={{ margin: '0 6px' }} />
                                                        <FaCcMastercard size={24} style={{ marginLeft: '2px' }} />
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className={cx('date-cvv')}>
                                            <div className={cx('input-wraper')}>
                                                <h4>Expiration Date</h4>
                                                <div className={cx('date')}>
                                                    <Input
                                                        classNameInput={cx('input')}
                                                        placeholder={'MM'}
                                                        type={'number'}
                                                    />
                                                    <Input
                                                        classNameInput={cx('input')}
                                                        placeholder={'YY'}
                                                        type={'number'}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('input-wraper')}>
                                                <h4>
                                                    CVV <AiFillQuestionCircle />
                                                </h4>
                                                <Input classNameInput={cx('input')} />
                                            </div>
                                        </div>
                                        <div className={cx('btn-submit')}>
                                            <Button
                                                leftIcon={<FaCcVisa size={20} />}
                                                className={cx('btn')}
                                                primary
                                                large
                                            >
                                                Confirm Payment
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <div className={cx('tab-content')}>
                                    <div className={cx('paypal')}>
                                        <h4>Select your paypal account type</h4>
                                        <div className={cx('option')}>
                                            <div className={cx('radio-wraper')}>
                                                <input type="radio" id="domestic" name="travel" />
                                                <label htmlFor="domestic">Domestic</label>
                                            </div>
                                            <div className={cx('radio-wraper')}>
                                                <input type="radio" id="international" name="travel" />
                                                <label htmlFor="international">International</label>
                                            </div>
                                        </div>
                                        <div className={cx('btn-submit')}>
                                            <PayPalScriptProvider options={initialOptions}>
                                                <PayPalButtons
                                                    style={{
                                                        shape: 'rect',
                                                        layout: 'vertical',
                                                        color: 'gold',
                                                        label: 'paypal',
                                                    }}
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
                                        <p>
                                            Note: After clicking on the button, you will be directed to a secure gateway
                                            for payment. After completing the payment process, you will be redirected
                                            back to the website to view details of your order.
                                        </p>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                <div className={cx('tab-content')}>
                                    <div className={cx('paypal')}>
                                        <h4>Select your Bank</h4>
                                        <div className={cx('option')}>
                                            <Select
                                                // selectedOption={selectedOption}
                                                // setSelectedOption={setSelectedOption}
                                                className={cx('bank-select')}
                                                classNameSelect={cx('select-content')}
                                                // placeholder={gender ? gender : 'Gender'}
                                                data={DATA_SELECT}
                                            />
                                        </div>
                                        <div className={cx('btn-submit')}>
                                            <Button
                                                leftIcon={<MdPhoneAndroid size={20} />}
                                                className={cx('btn')}
                                                primary
                                                large
                                            >
                                                Process Payment
                                            </Button>
                                        </div>
                                        <p>
                                            Note: After clicking on the button, you will be directed to a secure gateway
                                            for payment. After completing the payment process, you will be redirected
                                            back to the website to view details of your order.
                                        </p>
                                    </div>
                                </div>
                            </TabPanel>
                        </AppBar>
                    </div>
                </div>
            </div>
        </>
    );
}
