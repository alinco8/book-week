import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext, useEffect, useState } from 'react';
import { dataContext } from '../context/data';
import styles from './style.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const Chart = () => {
    const [size, setSize] = useState({ w: innerWidth, h: innerHeight });
    const data = useContext(dataContext);
    const onResize = () => {
        setSize({ w: innerWidth, h: innerHeight });
    };
    useEffect(() => {
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    });

    return (
        <div className={styles.chart}>
            {data ? (
                <>
                    <div style={{ width: size.w - 300, height: size.h }}>
                        <Bar
                            width={size.w - 300}
                            height={size.h}
                            data={{
                                labels: Object.keys(data),
                                datasets: [
                                    {
                                        label: '一覧',
                                        data: Object.values(data),
                                    },
                                ],
                            }}
                            options={{ responsive: true }}
                        />
                    </div>
                    <table className={styles.ranking}>
                        <thead>
                            <tr>
                                <th />
                                <th>
                                    <span>クラス</span>
                                </th>
                                <th>
                                    <span>貸出数</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data)
                                .sort(
                                    ([, point2], [, point]) =>
                                        Number(point > point2) || -1,
                                )
                                .map(([hr, point], i) => (
                                    <tr
                                        className={styles.rank}
                                        key={hr}
                                        data-r={i + 1}
                                    >
                                        <td>
                                            <span>{i + 1}</span>
                                        </td>
                                        <td>
                                            <span>{hr}</span>
                                        </td>
                                        <td>
                                            <span>{point}</span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h1>Loading!</h1>
            )}
        </div>
    );
};
