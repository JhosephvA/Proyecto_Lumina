// Simula llamadas a backend
type User = { name: string; email: string; role: string }

export async function loginUser(email: string, password: string) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@test.com') resolve({ name: 'Admin', email, role: 'admin' })
      else if (email === 'teacher@test.com') resolve({ name: 'Profesor', email, role: 'teacher' })
      else if (email === 'student@test.com') resolve({ name: 'Estudiante', email, role: 'student' })
      else reject(new Error('Usuario no encontrado'))
    }, 500)
  })
}

export async function registerUser(name: string, email: string, password: string) {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ name, email, role: 'student' })
    }, 500)
  })
}
