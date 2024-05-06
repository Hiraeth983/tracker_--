export const getUserInfo = (user = {}) => {
  return {
    userId: 1,
    name: "Leo",
    date: new Date().getTime(),
    userAgent: navigator.userAgent
  }
}