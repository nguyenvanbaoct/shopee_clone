import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import config from 'src/constants/config'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'avatar', 'date_of_birth'])
// URL.createObjectURL(file)
export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const avatar = watch('avatar')
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const result = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(result.data.data)
      setProfileToLS(result.data.data)
      refetch()
      toast.success(result.data.message, {
        autoClose: 1000
      })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    fileInputRef.current?.setAttribute('value', '')
    if ((fileFromLocal && fileFromLocal.size >= config.maxSizeUploadAvatar) || !fileFromLocal?.type.includes('image')) {
      toast.error('Dung lượng file tối đa 1 MB, Định dạng: JPEG, PNG!', {
        position: 'top-center',
        autoClose: 1000
      })
    } else {
      setFile(fileFromLocal)
    }
  }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 border-b border-b-gray-200 pb-6 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='name'
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      placeholder='Số điện thoại'
                      errorMessage={errors.phone?.message}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <input
                className='hidden'
                type='file'
                accept='.jpg,.png,.jpeg'
                onChange={onFileChange}
                ref={fileInputRef}
                onClick={(event) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ;(event.target as any).value = null
                }}
              />
              <button
                className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                type='button'
                onClick={handleUpload}
              >
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>Dung lượng file tối đa 1 MB</div>
              <div className='mt-3 text-gray-400'>Định dạng: JPEG, PNG</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
