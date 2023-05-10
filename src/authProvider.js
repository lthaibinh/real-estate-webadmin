// Authenticated by default
export default {
  login: ({ username, password }) => {
    // if (username === 'login' && password === 'password') {
    //     localStorage.removeItem('not_authenticated');
    //     localStorage.removeItem('role');
    //     return Promise.resolve();
    // }
    // if (username === 'user' && password === 'password') {
    //     localStorage.setItem('role', 'user');
    //     localStorage.removeItem('not_authenticated');
    //     return Promise.resolve();
    // }
    // if (username === 'admin' && password === 'password') {
    //     localStorage.setItem('role', 'admin');
    //     localStorage.removeItem('not_authenticated');
    //     return Promise.resolve();
    // }
    // localStorage.setItem('not_authenticated', true);
    // return Promise.reject();
    const request = new Request('http://localhost:9090/api/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          console.log("binhtest res", response);
          throw new Error("Incorrect Entry");
        }
        console.log("binhtest cuoi", response)
        return response.json();
      })
      .then(({ access_token }) => {
        localStorage.setItem('access_token', access_token);
        localStorage.removeItem('not_authenticated');
        //localStorage.setItem('role', 'admin');
        return Promise.resolve();
      })
      .catch(e => {

        localStorage.setItem('not_authenticated', true);
        return Promise.reject(e);
      })

  },
  logout: () => {
    localStorage.setItem('not_authenticated', true);
    localStorage.removeItem('role');
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    return status === 401 || status === 403
      ? Promise.reject()
      : Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('not_authenticated')
      ? Promise.reject()
      : Promise.resolve();
  },
  getPermissions: () => {
    const role = localStorage.getItem('access_token');
    return Promise.resolve(role);
  },
};
