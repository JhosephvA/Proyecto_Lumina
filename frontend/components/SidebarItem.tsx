import Link from 'next/link'

type SidebarItemProps = {
  label: string
  href: string
}

export default function SidebarItem({ label, href }: SidebarItemProps) {
  return (
    <div style={{ marginBottom: 15 }}>
      <Link href={href} style={{
        color: '#333',
        fontWeight: 500,
        textDecoration: 'none'
      }}>{label}</Link>
    </div>
  )
}
