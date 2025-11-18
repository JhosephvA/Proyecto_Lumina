type ProgressBarProps = { progress: number }

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div style={{
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden',
      height: 10,
      width: '100%'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: '#0070f3'
      }} />
    </div>
  )
}
