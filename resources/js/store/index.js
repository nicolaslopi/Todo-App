import { createStore } from 'vuex';
import auth from './auth';
import notes from './notes';

export default createStore({
    modules: {
        auth,
        notes
    }
})
