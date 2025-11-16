import Notification from './Notification'

export default function Navbar() {
  return (
    <nav style={{
      padding: '15px 30px',
      backgroundColor: '#0070f3',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>Lumina Edu</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Notification count={3} />
        <span>Admin</span>
      </div>
    </nav>
  )
}
