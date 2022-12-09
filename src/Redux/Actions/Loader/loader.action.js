import * as types from '../../../Constants/_Types/types.reduxStore';

export const startLoader = () => {
    return {
        type: types.START_LOADER
    }
}

export const stopLoader = () => {
    return {
        type: types.STOP_LOADER
    }
}