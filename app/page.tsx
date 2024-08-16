
import { Pagination } from './components/Pagination'


export default function Home() {
  const totalIssues = 10; // Replace with your actual total pages
  const pageSize = 5
  const currentPage = 1
  return (
    <Pagination 
    currentPage={currentPage}
    totalIssues={totalIssues}
    pageSize={pageSize}
    />
  )
}
