import { type TestCriteria } from '@/types/test-result-item'
import { testResultColors } from '@/lib/utils'

interface TestResultChartProps {
  testCriteria: TestCriteria
  testValue: number
  testValueUnit: string
  height?: string
  colors?: {
    critical: string
    moderate: string
    optimal: string
  }
  markerColor?: string
}

const TestResultChart = ({
  testCriteria,
  testValue,
  testValueUnit,
  height = "0.5rem",
}: TestResultChartProps) => {
  const { optimal, moderate, critical } = testResultColors
  const ranges = [
    { key: 'criticallyLow', range: testCriteria.criticallyLow, color: critical.medium },
    { key: 'moderatelyLow', range: testCriteria.moderatelyLow, color: moderate.medium },
    { key: 'optimal', range: testCriteria.optimal, color: optimal.medium },
    { key: 'moderatelyHigh', range: testCriteria.moderatelyHigh, color: moderate.medium },
    { key: 'criticallyHigh', range: testCriteria.criticallyHigh, color: critical.medium }
  ]

  const totalRange = ranges[ranges.length - 1].range[1] - ranges[0].range[0]

  const rangesWithWidths = ranges.map(({ key, range, color }) => ({
    key,
    flexBasis: `${((range[1] - range[0]) / totalRange) * 100}%`,
    color
  }))

  const minValue = ranges[0].range[0]
  const markerPosition = ((testValue - minValue) / totalRange) * 100

  const formatMeasurementValue = (value: number) => {
    // Use totalRange to determine if we should show decimals
    const shouldShowDecimals = totalRange < 25
    return shouldShowDecimals 
      ? Number(value.toFixed(1))
      : Math.round(value)
  }

  // Calculate measurement values before the return
  const measurementValues = [...Array(11)].map((_, index) => ({
    value: formatMeasurementValue(minValue + (totalRange * (index / 10))),
    showLabel: index % 2 === 0
  }))

  return (
    <div className="relative w-full pb-4">
      <div
        className="flex w-full rounded-md border overflow-hidden"
        style={{ height }}
      >
        {rangesWithWidths.map((range) => (
          <div
            key={range.key}
            className='flex-grow flex-shrink-0'
            style={{
              flexBasis: range.flexBasis,
              backgroundColor: range.color,
            }}
          />
        ))}
      </div>

      {/* Measurement Lines */}
      <div className="flex w-full mt-1 mb-1">
        {measurementValues.map((measurement, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="h-1 w-[1px] bg-gray-300"></div>
            {measurement.showLabel && (
              <div className="text-xs text-gray-500 mt-1">
                {measurement.value}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Test Value Marker */}
      <div
        className="absolute bottom-4 transform -translate-x-1/2 z-10 bg-white px-5 py-1 shadow-[0_0_8px_4px_white]"
        style={{ left: `${markerPosition}%` }}
      >
        <svg
          viewBox="0 0 16 16" 
          xmlns="http://www.w3.org/2000/svg"
          className='text-gray-500'
          style={{ height: '0.8rem', width: '0.8rem' }}
        >
          <path
            d="M8 3L11.5 11H4.5L8 3Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Test Value Label */}
      <div 
        className="absolute bottom-0 text-sm transform -translate-x-1/2 text-gray-600 z-20 font-semibold"
        style={{ left: `${markerPosition}%` }}
      >
        {testValue} {testValueUnit}
      </div>
    </div>
  )
}

export {
  TestResultChart
}