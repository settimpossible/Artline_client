import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response?.data) {
    console.log(error.response && error.response?.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getActivities() {
    return service
      .get("/api/activity")
      .then((res) => {
        return res.data;
      })
      .catch(errorHandler);
  },

  getActivity(activityId) {
    return service
      .get(`/api/activity/${activityId}`)
      .then((res) => {
        return res.data;
      })
      .catch(errorHandler);
  },

  removeActivity(activityId) {
    return service
      .delete(`/api/activity/${activityId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateActivity(activityId, data) {
    return service
      .patch(`/api/activity/${activityId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserActivities(creator) {
    return service
      .get(`/api/activity/user/${creator}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addActivity(data) {
    return service
      .post("/api/activity", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getFavActivities(userId) {
    return service
      .get(`/api/activity/favorites/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeActivityFromFav(userId, activityId) {
    return service
      .delete(`/api/activity/${userId}/${activityId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addActivityToFav(userId, activityId) {
    return service
      .post(`/api/activity/${userId}/${activityId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addMark(userId, activityId, mark) {
    return service
      .post(`/api/activity/marks/${userId}/${activityId}`, { mark })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addComment(userId, activityId, comment) {
    return service
      .post(`/api/activity/comments/${userId}/${activityId}`, { comment })
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
