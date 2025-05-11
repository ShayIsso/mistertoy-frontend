import { toyService } from "../../services/toy.service.js"

//* Cars
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_ERROR = 'SET_ERROR'


const initialState = {
    toys: [],
    lastToys: [],
    filterBy: toyService.getDefaultFilter(),
    flag: {
        isLoading: false,
        error: null,
    },
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        case TOY_UNDO:
            return {
                ...state,
                lastToys
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return { ...state, flag: { ...state.flag, isLoading: action.isLoading } }

        case SET_ERROR:
            return { ...state, flag: { ...state.flag, error: action.error } }

        default:
            return state
    }
}