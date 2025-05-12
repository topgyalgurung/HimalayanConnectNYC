// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'
// import RootLayout from '../layout'


// // Mock the NavMenu component since we don't need to test its internals
// jest.mock('../(homepage)/NavMenu/NavMenu', () => {
//   return function MockNavMenu() {
//     return <nav data-testid="mock-nav-menu">Navigation Menu</nav>
//   }
// })

// // Mock the Toaster component
// jest.mock('react-hot-toast', () => ({
//   Toaster: () => <div data-testid="mock-toaster">Toaster</div>,
// }))

// // Mock the UserProvider
// jest.mock('@/app/context/UserProvider', () => ({
//   UserProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
// }))

// describe('RootLayout', () => {
//   const renderLayout = (children: React.ReactNode) => {
//     return render(
//       <RootLayout>
//         {children}
//       </RootLayout>
//     )
//   }

//   it('renders children correctly', () => {
//     const testMessage = 'Test Child Component'
//     renderLayout(<div>{testMessage}</div>)
//     expect(screen.getByText(testMessage)).toBeInTheDocument()
//   })

//   it('renders NavMenu component', () => {
//     renderLayout(<div>Test</div>)
//     expect(screen.getByTestId('mock-nav-menu')).toBeInTheDocument()
//   })

//   it('renders Toaster component', () => {
//     renderLayout(<div>Test</div>)
//     expect(screen.getByTestId('mock-toaster')).toBeInTheDocument()
//   })

//   it('renders with correct HTML structure', () => {
//     renderLayout(<div>Test</div>)
    
//     // Check for html and body tags
//     const htmlElement = document.documentElement
//     expect(htmlElement).toHaveAttribute('lang', 'en')
//     expect(htmlElement).toHaveAttribute('data-theme', 'winter')
    
//     // Check for viewport meta tag
//     const viewportMeta = document.querySelector('meta[name="viewport"]')
//     expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1')
//   })

//   it('renders main content area', () => {
//     renderLayout(<div>Test</div>)
//     const mainElement = screen.getByRole('main')
//     expect(mainElement).toHaveClass('flex-grow')
//   })
// }) 