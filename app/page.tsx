import { useSearchParams } from 'next/navigation';
import { Pagination } from './components/Pagination'

export default function Home({searchParams}: {searchParams: {page: string}}) {
  const totalIssues = 50; // Replace with your actual total pages
  const pageSize = 5
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1
  return (
    <Pagination 
    currentPage={currentPage}
    totalIssues={totalIssues}
    pageSize={pageSize}
    />
  )
}
