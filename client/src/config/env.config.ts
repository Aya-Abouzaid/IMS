const vars = new Map();

if (process.env.VITE_BACKEND_BASE_URL) {
  vars.set('backendBaseUrl', process.env.VITE_BACKEND_BASE_URL);
} else if (import.meta.env.VITE_BACKEND_BASE_URL) {
  vars.set('backendBaseUrl', import.meta.env.VITE_BACKEND_BASE_URL);
} else {
  vars.set('backendBaseUrl', 'http://0.0.0.0:5000/api/v1');
}

if (process.env.PUBLIC_URL) {
  vars.set('public', process.env.PUBLIC_URL);
} else if (import.meta.env.PUBLIC_URL) {
  vars.set('public', import.meta.env.PUBLIC_URL);
} else {
  vars.set('public', 'public');
}

vars.set('authTokenName', 'COCA_USER_TOKEN');
vars.set('projectName', 'Corelia cyber security');

export default vars;
