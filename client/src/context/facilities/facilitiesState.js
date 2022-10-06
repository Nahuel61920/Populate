import React, { useReducer } from 'react';
import axios from 'axios';
import facilitiesContext from './facilitiesContext';
import facilitiesReducer from './facilitiesReducer';
import { 
    FACILITIES,
    FACILITY_ID,
    CLEAN_FACILITY
} from '../../type';



const FacilitiesState = props => {

    const initialState = {
        facilities: [],
        facilityID: []
    }


    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(facilitiesReducer, initialState)

    // Obtener los proyectos
    const getFacilities = async () => {
        try {
            const resultado = await axios.get("http://localhost:3001/api/facilities");
            dispatch({
                type: FACILITIES,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getFacility = async (id, numser) => {
        try {
            const resultado = await axios.get(`http://localhost:3001/api/facilities/${id}/nurses/${numser}/priority`);
            console.log(resultado.data);
            dispatch({
                type: FACILITY_ID,
                payload: resultado.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    const cleanFacility = () => {
        dispatch({
            type: CLEAN_FACILITY,
            payload: []
        })
    }

    
    console.log(state.facilityID);



    return (
        <facilitiesContext.Provider
            value={{
                facilities: state.facilities,
                facilityID: state.facilityID,
                getFacilities,
                getFacility,
                cleanFacility
            }}
        >
            {props.children}
        </facilitiesContext.Provider>
        
    )
}

export default FacilitiesState;