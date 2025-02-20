import axios from "axios";
import store from '../../redux/store'
import toast from "react-hot-toast";

const PORT =process.env.REACT_APP_PORT

export const API = axios.create({
  baseURL: PORT,
  // timeout: 5000, https://sore-red-scrubs.cyclic.app,  process.env.REACT_APP_API_BASE_URL
  headers: {},
});

API.interceptors.request.use((req) => {
  const auth = store.getState().authReducer;
  if (auth.token) {
    req.headers.authorization = `Bearer ${auth.token}`;
  }
  return req;
},(error) => {
    console.log(error);
    toast.error(error.response.message);
    return Promise.reject(error)
})

API.interceptors.response.use((response) => {
  if(response) return response.data;
},(error) => { 
  if(error.axiosError){
    toast.error(error.message);
  }
    // console.log(error);
    if(error.response.status===401){
      store.dispatch({type:"LOGOUT"})
    }
    return  Promise.reject(error)
});


export const validate =(token)=>API.get(`/auth/validate/${token}`)

export const googleOneTap = (CredentialResponse) => API.post('/auth/google-one-tap', {CredentialResponse}, {withCredentials: true});
export const googleAuth = (codeResponse) => API.post('/auth/google-oauth', {codeResponse}, {withCredentials: true});
export const signup =(authData)=>API.post("/auth/signup",authData)
export const login =(authData)=>API.post("/auth/login",authData)

export const forgot = (email)=>API.post("/auth/forgot-password",email)
export const reset = (token, password)=>API.post(`/auth/reset-password/${token}`,password)

export const create = (formData) => API.post("/post", formData);
export const update = (id, formData) => API.patch(`/post/update/${id}`, formData);
export const deletePostId = (id) => API.post(`post/${id}`); 
export const postLike = (postId) => API.patch(`/post/like/${postId}`);

export const fetchAllPosts = (page, limit) => API.get(`/post?_page=${page}&_limit=${limit}`);
export const search = (search) => API.get(`/post/search?_search=${search}`);
export const getPost = (id) => API.get(`/post/${id}`);
export const slideImages = () => API.get('/post/slide-show-images')

export const postComments = (id, commentData) => API.post(`/comment/${id}`, commentData);
export const commentLike = (commentId, postId) => API.patch(`/comment/like/${commentId}/${postId}`);
export const deletePostComment = (commentId, postId) => API.delete(`/comment/${commentId}/${postId}`);

export const findUser = (id) => API.get(`/user/${id}`);
export const getUserPosts = (id) => API.get(`/user/user-posts/${id}`);
export const follow = (userId) => API.patch(`/user/follow/${userId}`);
export const updateUserData = (formData) => API.patch(`/user/update`, formData);