import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules()
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='text-center text-white lg:col-start-1 lg:col-end-4'>
            <h2 className='text-5xl lg:text-7xl'>Shopee</h2>
            <div className='mt-6 text-lg lg:mt-16 lg:text-3xl'>Nền tảng thương mại điện tử</div>
            <div className='my-2 text-lg lg:text-3xl'>yêu thích ở Đông Nam Á & Đoài Loan</div>
          </div>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <button className='w-full bg-orange px-2 py-4 text-center text-sm uppercase text-white hover:bg-opacity-90'>
                  ĐĂNG NHẬP
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center text-sm'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='ml-1 text-red-600' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
