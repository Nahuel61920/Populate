import React, { useReducer } from 'react';
import axios from 'axios';
import queryContext from './queryContext';
import queryReducer from './queryReducer';
import { 
    NURSES,
    JOBS,
    FACILITY,
    CLEAN_FACILITY
} from '../../type';



const QueryState = props => {

    const initialState = {
        nurses: [],
        jobs: [],
        facility: [],
    }


    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(queryReducer, initialState)

    // Obtener los proyectos
    const getNurses = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/jobs/remaining");
            dispatch({
                type: NURSES,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getJobs = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/nurses/jobs");
            dispatch({
                type: JOBS,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getFacility = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/max/facilities");
            dispatch({
                type: FACILITY,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <queryContext.Provider
            value={{
                nurses: state.nurses,
                jobs: state.jobs,
                facility: state.facility,
                getNurses,
                getJobs,
                getFacility,
            }}
        >
            {props.children}
        </queryContext.Provider>
        
    )
}

export default QueryState;