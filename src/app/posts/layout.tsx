export default function PostLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main>
        {/* <h1 className="text-xl">This is Post layout</h1> */}
        {children}
      </main>
    )
  }