import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassWord() {
  const { t } = useTranslation(['profile'])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(result.data.message, {
        autoClose: 1000
      })
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('change password')}</h1>
        <div className='mt-1 border-b border-b-gray-200 pb-6 text-sm text-gray-700'>
          {t('manage and protect your account')}
        </div>
        <form className='mr-auto mt-8 ' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('current password')}</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='password'
                  type='password'
                  placeholder={`${t('current password')}`}
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('new password')}</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='new_password'
                  type='password'
                  placeholder={`${t('new password')}`}
                  errorMessage={errors.new_password?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t('confirm password')}</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='confirm_password'
                  type='password'
                  placeholder={`${t('confirm password')}`}
                  errorMessage={errors.confirm_password?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  {t('save')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
