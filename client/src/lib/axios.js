import axios from 'axios';

let baseUrl = 'http://localhost:3000/'

axios.defaults.baseURL = baseUrl;

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh && error.response.request.responseURL != (baseUrl + 'user/login')){
        refresh = true;
        const {data, status} = await axios.post('user/refresh', {}, {withCredentials: true});

        if(status === 200){
            axios.defaults.headers.common['Authorization'] = data.token;

            return axios(error.config);
        }
    } else if(error.response.status === 401 && refresh) {
        window.location.href = '/login';
    }
    refresh = false;
    return error;
})