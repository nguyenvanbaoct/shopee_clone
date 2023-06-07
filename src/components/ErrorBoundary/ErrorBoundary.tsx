import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
          <div className='text-center'>
            <div className='inline-flex rounded-full bg-red-100 p-4'>
              <div className='rounded-full bg-red-200 stroke-red-600 p-4'>
                <svg className='h-16 w-16' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path d='M17 16L22 21M22 16L17 21' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </div>
            </div>
            <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>500 - Server error</h1>
            <p className='mt-5 text-slate-600 lg:text-lg'>
              Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem
              presists.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
