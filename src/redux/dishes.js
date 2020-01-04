import { DISHES } from '../shared/dishes'; 

export const Dishes = (state = DISHES, action )  => {
    // state function contains DISHES and actions as parameters

    switch(action.type) {
        default:
            return state;
    }

}
