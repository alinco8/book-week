import { useEffect, useReducer } from 'react';
import { Chart } from './components/Chart';
import { Control } from './components/Control';
import {
    type State,
    type Action,
    dataContext,
    dataDispatchContext,
} from './components/context/data';
import './assets/normalize.css';
import './App.scss';

export const App = () => {
    const [data, dispatch] = useReducer(dataReducer, null);
    const sync = async () => {
        dispatch({
            type: 'init',
            state: await (await fetch('http://localhost:3000')).json(),
        });
    };

    useEffect(() => {
        const id = setInterval(sync, 5000);
        sync();

        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <dataContext.Provider value={data}>
            <dataDispatchContext.Provider value={dispatch}>
                <Control />
                <Chart />
            </dataDispatchContext.Provider>
        </dataContext.Provider>
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
