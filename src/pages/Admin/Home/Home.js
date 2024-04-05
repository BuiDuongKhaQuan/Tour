import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { BarChart, PieChart } from '@mui/x-charts';
import { AirplaneLanding, AirplaneTakeoff, MapTrifold, UsersThree } from '@phosphor-icons/react';

const cx = classNames.bind(styles);

export default function Home() {
    const Box = ({ icon, title, count }) => (
        <div className={cx('box')}>
            <span>{icon}</span>
            <p>{title}</p>
            <h2>{count}</h2>
        </div>
    );

    return (
        <div>
            <div className={cx('list')}>
                <Box icon={<UsersThree color="#2417d9" weight="duotone" />} title={'User'} count={'992'} />
                <Box icon={<AirplaneTakeoff color="#17d951" weight="duotone" />} title={'Tour'} count={'110'} />
                <Box icon={<MapTrifold color="#d9a517" weight="duotone" />} title={'Destination'} count={'56'} />
                <Box icon={<AirplaneLanding color="#b701f9" weight="duotone" />} title={'Booked Tour'} count={'509'} />
            </div>
            <div className={cx('chart')}>
                <div className={cx('chart-pie')}>
                    <PieChart
                        colors={['red', 'blue', 'green']}
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
                <div className={cx('chart-bar')}>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        height={290}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                </div>
            </div>
        </div>
    );
}
