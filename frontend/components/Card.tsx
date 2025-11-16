type CardProps = { title: string; value: number }

export default function Card({ title, value }: CardProps) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: 200,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: 0, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{value}</p>
    </div>
  )
}
