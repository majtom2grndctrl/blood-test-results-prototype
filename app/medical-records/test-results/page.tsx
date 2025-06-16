import { TestResult } from '@/components/custom/test-result-item';
import { getBloodTestResults } from '@/lib/get-blood-test-results';
import { format } from 'date-fns';

export default async function BloodTestResults() {
  const { data, error } = await getBloodTestResults()

  if (!data) return <div>No data available</div>;
  if (error) return (
    <main>
      <h1>Error</h1>
      <div>{error}</div>
    </main>
  )

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy h:mm a');
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="md:flex md:gap-x-12">
        <div className="md:basis-8/12">
          <h1 className="text-2xl mt-2 mb-4 font-semibold">Test results</h1>
          <ul className="border-t border-slate-200 mb-6">
            {data.bloodPanel.map((result) =>
              result.testValue ? (
                <li className="border-b border-slate-200" key={`result__${result.testName}`}>
                  <TestResult
                    testCriteria={result.testCriteria}
                    testName={result.testName}
                    testValue={result.testValue}
                    testValueUnit={result.testValueUnit}
                    testDescription={result.testDescription}
                    className="my-4"
                  />
                </li>
              ) : null
            )}
          </ul>
          <ul>
            {data.bloodPanel.map((result) =>
              !result.testValue ? (
                <li className="py-2 flex flex-row gap-4" key={`result__${result.testName}`}>
                  <h2 className="font-medium text-lg">{result.testName}</h2>
                  <div className="flex">
                    <span className="bg-gray-100 text-gray-700 font-medium text-sm rounded-md px-2 py-1">
                      Pending
                    </span>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="md:basis-4/12 relative md:border-l md:pl-6">
          <div className="sticky top-4 space-y-6">
            {/* Doctor Information */}
            <div className="bg-white p-4">
              <h2 className="font-semibold mb-2">Test Information</h2>
              <p className="text-sm">Ordered by {data.doctor.name}, {data.doctor.credentials}</p>
              <div className="text-sm text-gray-600 space-y-1 mt-2">
                <p>Ordered: {formatDate(data.dates.orderedAt)}</p>
                <p>Collected: {formatDate(data.dates.collectedAt)}</p>
                <p>Reported: {formatDate(data.dates.reportedAt)}</p>
              </div>
            </div>

            {/* Doctor Notes */}
            <div className="bg-white p-4 pt-8 border-t">
              <h2 className="font-semibold mb-2">Doctor&apos;s Notes</h2>
              <div 
                className="prose prose-sm max-w-none
                  prose-headings:text-gray-900 prose-headings:font-semibold prose-headings:text-sm prose-headings:mt-4 prose-headings:mb-2
                  prose-p:text-gray-600 prose-p:leading-normal prose-p:my-2
                  prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4
                  prose-li:text-gray-600 prose-li:my-0.5
                  first:prose-headings:mt-0"
                dangerouslySetInnerHTML={{ __html: data.doctorNotes.content }}
              />
              <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
                Last updated: {formatDate(data.doctorNotes.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
