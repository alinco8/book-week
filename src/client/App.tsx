import { useContext, useEffect, useReducer } from 'react';
import {
    State,
    Action,
    dataContext,
    dataDispatchContext,
} from '@/context/data';
import { socketContext } from '@/context/socket';
import { Chart } from './components/Chart';
import { Control } from './components/Control';
import './assets/normalize.css';
import './App.scss';

export const App = () => {
    const [data, dispatch] = useReducer(dataReducer, null);
    const socket = useContext(socketContext);

    useEffect(() => {
        socket
            .on('all', (db) => {
                dispatch({
                    type: 'init',
                    state: db,
                });
            })
            .on('changed', (key, value) => {
                data && (data[key] = value);
                dispatch({
                    type: 'set',
                    key,
                    value,
                });
            })
            .emit('init');

        return () => {
            socket?.off('all').off('changed');
        };
    }, []);

    return (
        <socketContext.Provider value={socket}>
            <dataContext.Provider value={data}>
                <dataDispatchContext.Provider value={dispatch}>
                    <Control />
                    <Chart />
                </dataDispatchContext.Provider>
            </dataContext.Provider>
        </socketContext.Provider>
    );
};

function dataReducer(state: State, action: Action) {
    switch (action.type) {
        case 'init':
            return action.state;
        case 'set':
            return { ...state, ...{ [action.key]: action.value } };
    }
}
