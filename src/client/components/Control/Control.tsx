import { useContext } from 'react';
import { dataContext, dataDispatchContext } from '@/context/data';
import { socketContext } from '@/context/socket';
import styles from './style.module.scss';

export const Control = () => {
    const data = useContext(dataContext);
    const dispatch = useContext(dataDispatchContext);
    const socket = useContext(socketContext);

    const change = async (hr: string, num: 1 | -1) => {
        if (!dispatch || !data) return;

        dispatch({
            type: 'set',
            key: hr,
            value: data[hr] + num,
        });

        console.log('change');

        socket.emit('change', hr, num);
    };

    return (
        new URLSearchParams(location.search).has('c') &&
        data &&
        dispatch && (
            <div className={styles.control} style={{ width: 150 }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        {Object.entries(data)
                            .sort(([hr2], [hr]) => (hr < hr2 ? 1 : -1))
                            .map(([hr, value]) => (
                                <tr key={hr}>
                                    <td>{hr}</td>
                                    <td>{value}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => change(hr, 1)}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                0 < value && change(hr, -1)
                                            }
                                        >
                                            -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    );
};
