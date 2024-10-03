import axios from "axios";

const state = {
    notes: [],
    note: null,
    lsbels: [],
    error: null,
    pagination: null
};

const getters = {
    getNotes: (state) => state.notes,
    getNote: (state) => state.note,
    getLabels: (state) => state.labels,
    getPagination: (state) => state.pagination
};

const actions = {
    async fetchNotes({ commit, state, rootState }){
        try {
            const response = await axios.get("/api/notes", {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            });

            const noteRes = response.data.data.data
            const prevPageUrl = response.data.data.prev_page_url
            const nextPageUrl = response.data.data.next_page_url
            const currentPage = response.data.data.current_page

            const paginationInfo = {
                currentPage: currentPage,
                prevPage: prevPageUrl? parseInt(prevPageUrl.split('page=')[1]) : null,
                nextPage: nextPageUrl? parseInt(nextPageUrl.split('page=')[1]) : null,

            }

            commit('SET_NOTES', noteRes)
            commit('SET_PAGINATION', paginationInfo)

            return true

        } catch (error) {

            commit('SET_ERROR', error.response.data.message)

            return false
        }
    },
    async fetchNote({ commit, rootState, state}, id){
        try {
            const response = await axios.get(`/api/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            })

            const noteFounded = response.data.data
            commit('SET_NOTE', noteFounded)
            return true
        } catch (error) {
            return false
        }
    },
    async fetchLabels({ commit, rootState }){
        try {
            const response = await axios.get('/api/notes/create', {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            });
            commit('SET_LABELS', response.data.data)

            return true

        } catch (error) {
            return false
        }
    },
    async paginationNotes({ commit, state, rootState }, page){
        try {
            const response = await axios.get(`/api/notes?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            });

            const noteRes = response.data.data.data
            const prevPageUrl = response.data.data.prev_page_url
            const nextPageUrl = response.data.data.next_page_url
            const currentPage = response.data.data.current_page

            const paginationInfo = {
                currentPage: currentPage,
                prevPage: prevPageUrl? parseInt(prevPageUrl.split('page=')[1]) : null,
                nextPage: nextPageUrl? parseInt(nextPageUrl.split('page=')[1]) : null,

            }

            commit('SET_NOTES', noteRes)
            commit('SET_PAGINATION', paginationInfo)

            return true

        } catch (error) {
            commit('SET_ERROR', error.response.data.message)

            return false
        }
    },
    async createNote({ commit, rootState}, data){
        try {
            const newNote = {...data, user_id: rootState.auth.user.id}
            const response = await axios.post('/api/notes', newNote, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            })

            const labelsNote = state.labels.filter(obj1 => data.labels.some(obj2 => obj2 === obj1.id))
            const noteRes = {...response.data.data, labels: labelsNote}
            const newArray = [...state.notes, noteRes]
            commit('SET_NOTES', newArray)
            return true
        } catch (error) {
            return false
        }
    },
    async updateNote({ commit, rootState}, data){
        try {
            const response = await axios.put(`/api/notes/${data.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            })

            const labelsNote = state.labels.filter(obj1 => data.labels.some(obj2 => obj2 === obj1.id))
            const newArray = [...state.notes]

            const index = newArray.findIndex(item => item.id === data.id);
            if(index !== -1){
                const updatedNote = {...newArray[index], ...data, labels: labelsNote}
                newArray[index] = updatedNote
            }

            commit('SET_NOTES', newArray)

            return true

        } catch (error) {
            return false
        }
    },
    async deleteNote({ commit, rootState, state}, id){
        try {
            const response = await axios.delete(`/api/notes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${rootState.auth.token}`,
                    'Content-Type': 'application/json'
                  }
            })

            const newArray = state.notes.filter(note => note.id != id)
            commit('SET_NOTES', newArray)
            return true
        } catch (error) {
            return false
        }
    },

};

const mutations = {
    SET_NOTES(state, notes){
        state.notes = notes
    },

    SET_NOTE(state, note){
        state.note = note
    },

    SET_LABELS(state, labels){
        state.labels = labels
    },

    SET_PAGINATION(state, pagination){
        state.pagination = pagination
    },

    SET_ERROR(state, error){
        state.error = error
    }
};

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}
