import axios from "axios";

const state = {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.token,
    getError: state => state.error,
};

const actions = {
    async registerUser({ commit }, data) {
        try {
            const response = await axios.post("/api/register", data);
            commit("SET_TOKEN", response.data.data.token);
            localStorage.setItem("token", response.data.data.token);
            return true
        } catch (error) {
            commit("SET_ERROR", error.response.data.data.error);
            return false
        }
    },
    async login({ commit }, credentials) {
        try {

            const response = await axios.post("/api/login", credentials);

            const userInfo = {id: response.data.data.id, name: response.data.data.name}
            const userToken = response.data.data.token

            commit("SET_USER", userInfo);
            commit("SET_TOKEN", userToken);

            localStorage.setItem("token", userToken);
            localStorage.setItem("user", JSON.stringify(userInfo));

            return true

        } catch (error) {
            commit("SET_ERROR", error.response.data.data.error);
            return false
        }
    },
    async logout ({ commit, state }) {
        try {
            console.log(state.token);
            const response = await axios.get("/api/logout", {
                headers: {
                    'Authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/json'
                  }
            });
            console.log(response.data);
            commit("SET_TOKEN", null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return true
        } catch (error) {
            console.log(error.response.data.message);
            commit("SET_ERROR", error.response.data.message);
            return false
        }
    }
};

const mutations = {
    SET_TOKEN(state, token){
        state.token = token
    },

    SET_USER(state, user){
        state.user = user
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
