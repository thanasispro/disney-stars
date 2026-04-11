import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DisneyCharacter } from '../types/disney'

interface ModalState {
    selectedCharacter: DisneyCharacter | null
    isModalOpen: boolean
}

const initialState: ModalState = {
    selectedCharacter: null,
    isModalOpen: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<DisneyCharacter>) => {
            state.selectedCharacter = action.payload
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.isModalOpen = false
            state.selectedCharacter = null
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
