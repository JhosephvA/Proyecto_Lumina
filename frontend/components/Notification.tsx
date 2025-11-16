type NotificationProps = { count: number }

export default function Notification({ count }: NotificationProps) {
  return (
    <div style={{
      position: 'relative',
      width: 24,
      height: 24,
      cursor: 'pointer'
    }}>
      <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
        <path d="M12 24c1.104 0 2-.897 2-2h-4c0 1.103.896 2 2 2zm6.707-6.707l-1.414-1.414C16.373 14.373 16 13.743 16 13V9c0-2.206-1.794-4-4-4s-4 1.794-4 4v4c0 .743-.373 1.373-.879 1.879l-1.414 1.414C5.902 17.096 6 18.048 6 19h12c0-.952.098-1.904-.293-2.707z"/>
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: 'red',
          color: '#fff',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: 12
        }}>
          {count}
        </span>
      )}
    </div>
  )
}
