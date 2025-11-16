import SidebarItem from './SidebarItem'

export default function Sidebar() {
  return (
    <aside style={{
      width: 240,
      backgroundColor: '#f5f5f5',
      padding: 20,
      minHeight: '100vh',
      boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginBottom: 20 }}>Menú</h3>
      <SidebarItem label="Dashboard" href="/dashboard" />
      <SidebarItem label="Administrar Cursos" href="/admin/courses" />
      <SidebarItem label="Tareas" href="/teacher/tasks" />
      <SidebarItem label="Estudiantes" href="/student/list" />
    </aside>
  )
}
