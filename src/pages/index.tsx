import Image from 'next/image'
import { Inter } from 'next/font/google'
import TableSample from './TableSample'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen w-2/3 mx-auto flex-col items-center justify-between p-4">
      <h1 className={`${inter.className} mb-3 text-2xl font-semibold`}>
        Table Component
      </h1>
      <TableSample />
      <div>
        <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
          Requirements: 
        </h2> 
        <p className=' text-gray-500 mb-4'>
          Design and implement a table component using React + TypeScript to meet the following requirements
        </p>
        <ul className=' list-decimal'>
          <li>Fixed the table header and can specify to sort by the value of a column in positive or reverse order (front-end sorting is enough).</li>
          <li>Support specifying left n columns or right n columns to be fixed when scrolling horizontally.</li>
          <li>Support pagination and specify the page size.</li>
          <li>Add git pre-commit hook to make sure code format & lint passed before commiting to code repo.</li>
          <li>Build a CI/CD pipeline with GitHub Actions to deploy the page as GH Pages</li>
        </ul>
      </div>

    </main>
  )
}
