import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANG = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='mx-2 rounded border bg-white px-3 py-2 shadow-sm' key={index}>
            ...
          </button>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span className='mx-2  px-3 py-2 text-gray-500' key={index}>
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANG * 2 + 1 && pageNumber > page + RANG && pageNumber < pageSize - RANG + 1) {
          return renderDotAfter(index)
        } else if (page > RANG * 2 + 1 && page < pageSize - RANG * 2) {
          if (pageNumber < page - RANG && pageNumber > RANG) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANG && pageNumber < pageSize - RANG + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANG * 2 && pageNumber > RANG && pageNumber < page - RANG) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames('mx-2 px-3 py-1 text-base  text-gray-500', {
              'rounded border bg-orange text-white shadow-sm': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed px-3 py-2 '>
          <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-4 w-4 fill-gray-500'>
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
          className='mx-2 px-3 py-2'
        >
          <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-4 w-4 fill-gray-500'>
            <g>
              <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
            </g>
          </svg>
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 cursor-not-allowed px-3 py-2'>
          <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-4 w-4 fill-gray-500'>
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
          className='mx-2 px-3 py-2'
        >
          <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x={0} y={0} className='h-4 w-4 fill-gray-500'>
            <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
          </svg>
        </Link>
      )}
    </div>
  )
}
