type ButtonProps = {
  text: string
  onClick?: () => void
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#0070f3',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600
      }}
    >
      {text}
    </button>
  )
}
