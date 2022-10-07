import {
    NURSES,
    JOBS,
    FACILITY,
    CLEAN_FACILITY,
} from "../../type";

export default (state, action) => {
    switch (action.type) {
        case NURSES:
            return {
                ...state,
                nurses: action.payload,
            };
        case JOBS:
            return {
                ...state,
                jobs: action.payload,
            };
        case FACILITY:
            return {
                ...state,
                facility: action.payload,
            };
        default:
            return state;
    }
};
