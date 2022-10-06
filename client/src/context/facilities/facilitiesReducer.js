import { 
    FACILITIES,
    FACILITY_ID,
    CLEAN_FACILITY
} from '../../type';


export default (state, action) => {
    switch(action.type) {
        case FACILITIES:
            return {
                ...state,
                facilities: action.payload
            }
        case FACILITY_ID:
            return {
                ...state,
                facilityID: state.facilityID.concat(action.payload)
            }
        case CLEAN_FACILITY:
            return {
                ...state,
                facilityID: action.payload
            }

        default:
            return state;
    }
}