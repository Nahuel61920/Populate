import React, { useReducer } from 'react';
import axios from 'axios';
import queryContext from './queryContext';
import queryReducer from './queryReducer';
import { 
    NURSES,
    NURSES_JOBS,
    JOBS,
    HIRED_JOBS,
    CLEAN_FACILITY
} from '../../type';



const QueryState = props => {

    const initialState = {
        nurses: [],
        nursesJobs: [],
        jobs: [],
        hiredJobs: []
    }


    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(queryReducer, initialState)

    // Obtener los proyectos
    const getNurses = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/nurses");
            dispatch({
                type: NURSES,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getNursesJobs = async (id) => {
        try {
            const resultado = await axios.get(`http://localhost:3001/api/nurses/${id}/jobs`);
            dispatch({
                type: NURSES_JOBS,
                payload: resultado.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    const getJobs = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/jobs");
            dispatch({
                type: JOBS,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getNurseHiredJobs = async (id) => {
        try {
            const resultado = await axios.get(`http://localhost:3001/api/jobs/${id}/nurse_hired_jobs`);
            dispatch({
                type: HIRED_JOBS,
                payload: resultado.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    
    const cleanNursesJobs = () => {
        dispatch({
            type: CLEAN_FACILITY,
            payload: []
        })
    }



    return (
        <queryContext.Provider
            value={{
                nurses: state.nurses,
                nursesJobs: state.nursesJobs,
                jobs: state.jobs,
                hiredJobs: state.hiredJobs,
                getNurses,
                getNursesJobs,
                getJobs,
                getNurseHiredJobs,
                cleanNursesJobs,
            }}
        >
            {props.children}
        </queryContext.Provider>
        
    )
}

export default QueryState;