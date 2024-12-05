import TestResult from '@/components/shared/TestResult'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Result"
}

const TestResultPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <section>
      <TestResult params={id}/>
    </section>
  )
}

export default TestResultPage