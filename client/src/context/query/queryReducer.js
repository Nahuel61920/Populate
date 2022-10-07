import { 
    NURSES,
    NURSES_JOBS,
    JOBS,
    HIRED_JOBS,
    CLEAN_FACILITY
} from '../../type';


export default (state, action) => {
    switch(action.type) {
        case NURSES:
            return {
                ...state,
                nurses: action.payload
            }
        case NURSES_JOBS:
            return {
                ...state,
                nursesJobs: state.nursesJobs.concat(action.payload)
            }
        case CLEAN_FACILITY:
            return {
                ...state,
                nursesJobs: action.payload,
                hiredJobs: action.payload
            }
        case JOBS:
            return {
                ...state,
                jobs: action.payload
            }
        case HIRED_JOBS:
            return {
                ...state,
                hiredJobs: state.hiredJobs.concat(action.payload)
            }
        default:
            return state;
    }
}