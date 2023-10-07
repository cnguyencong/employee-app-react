import { Jwt_token } from '../Config/Config';

export const configureFakeBackend = () => {
    let users = [{ email: 'test@gmail.com', password: 'test123' }];
    let realFetch = window.fetch;
    window.fetch = function (url: any, opts: any) {
        const isLoggedIn = opts.headers['Authorization'] === `Bearer ${Jwt_token}`;
        return new Promise((resolve: any, reject: any) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = opts.body;
                    const user = users.find(x => x.email === params.email && x.password === params.password);

                    if (!user) return error('Username or password is incorrect');
                    return ok(Jwt_token);
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body: any) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) });
                }

                function error(message: any) {

                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
                }
            }, 500);
        });
    };
};

export function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                localStorage.removeItem('token');
                localStorage.removeItem('profileURL');
            }
        }
        return data;
    });
}

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = localStorage.getItem('token');
    if (currentUser) {
        return { Authorization: `Bearer ${currentUser}` };
    } else {
        return {};
    }
}