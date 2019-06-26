
import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';
import { Reducer } from 'redux';

export const enthusiasm: Reducer = (
  state: StoreState,
  action: EnthusiasmAction
): StoreState => {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel - 1 };
  }
  return state;
};