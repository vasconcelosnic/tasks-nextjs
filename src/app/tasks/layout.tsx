import '../globals.css'

export const metadata = {
  title: 'Tarefas',
  description: 'Gestão de tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className=''>
        <nav className="flex items-center justify-between text-center flex-wrap px-6 py-3 bg-gradient-to-r from-green-900 to-green-600 ">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src='/img/logo-nicbr.png' title='Logo NIC BR' />
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="/tasks" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-extrabold mr-4 text-2xl font-bold">
                        TAREFAS
                    </a>
                </div>
            </div>
        </nav>
        
        {children}
        
        
        
        
        </body>
    </html>
  )
}
