import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ pageSize, queryConfig }: Props) {
  const { t } = useTranslation()
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>{t('sort product.sort by')}</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize  ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => {
              handleSort(sortBy.view)
            }}
          >
            {t('sort product.popular')}
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize  ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => {
              handleSort(sortBy.createdAt)
            }}
          >
            {t('sort product.latest')}
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize  ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => {
              handleSort(sortBy.sold)
            }}
          >
            {t('sort product.top sales')}
          </button>
          <select
            className={classNames('h-8 cursor-pointer  px-4 text-left text-sm capitalize outline-none', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              {t('sort product.price')}
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              {t('sort product.low to high')}
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              {t('sort product.high to low')}
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='h-8 cursor-not-allowed rounded border bg-gray-400/20 px-3 py-3 '>
                <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-2 w-2 fill-gray-600'>
                  <g>
                    <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
                  </g>
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='h-8 rounded border bg-white px-3 py-3 '
              >
                <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-2 w-2 fill-gray-600'>
                  <g>
                    <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
                  </g>
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='h-8 cursor-not-allowed rounded border bg-gray-400/20 px-3 py-3 '>
                <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-2 w-2 fill-gray-600'>
                  <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='h-8 rounded border bg-white px-3 py-3 '
              >
                <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-2 w-2 fill-gray-600'>
                  <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
