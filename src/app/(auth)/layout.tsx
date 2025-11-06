interface LayoutProps {
    children:React.ReactNode
}

const layout = ({children}:LayoutProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
        {children}
    </div>
  )
}

export default layout