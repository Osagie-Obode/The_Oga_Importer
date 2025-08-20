export function requireAuth(to, from, next) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    next('/login');
  } else {
    next();
  }
}

export function requireAdmin(to, from, next) {
  const role = localStorage.getItem('userRole');
  if (role === 'admin') {
    next();
  } else {
    next('/unauthorized'); // or redirect to dashboard
  }
}
