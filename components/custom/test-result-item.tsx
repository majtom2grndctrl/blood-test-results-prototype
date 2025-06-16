'use client'

import { useState } from 'react'
import { TestResultChart } from '@/components/custom/test-result-chart'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type TestResultSchema } from '@/types/test-result-item'
import { testResultColors } from '@/lib/utils'

interface TestResultProps extends TestResultSchema {
  className?: string
  testValue: number
}

const TestResult: React.FC<TestResultProps> = ({
  className = '',
  testCriteria,
  testName,
  testValue,
  testValueUnit,
  testDescription,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  const getTestValueStatus = () => {
    const { criticallyLow, moderatelyLow, optimal, moderatelyHigh, criticallyHigh } = testCriteria
    if (testValue <= criticallyLow[1]) return 'critical'
    if (testValue >= criticallyHigh[0]) return 'critical'
    if (testValue <= moderatelyLow[1]) return 'moderate'
    if (testValue >= moderatelyHigh[0]) return 'moderate'
    if (testValue >= optimal[0] && testValue <= optimal[1]) return 'optimal'
    return 'critical'
  }

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible)
  }

  const testValueStatus = getTestValueStatus();
  const statusColor = testResultColors[testValueStatus as keyof typeof testResultColors]

  return (
    <div className={`w-full ${className}`}>
      <div className="md:flex md:flex-row md:space-x-6 md:py-0 pb-10 items-center">
        <div className='basis-1/3 flex'>
          <div className="flex flex-col">
            <span className="text-base text-gray-600 font-medium pl-4">{testName}</span>
            <div className="flex items-baseline">
              <div className="pb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusColor.medium }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 pl-2 pr-1">{testValue}</span>
              <span className="text-lg text-gray-500 font-medium">{testValueUnit}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDescription}
                aria-expanded={isDescriptionVisible}
                aria-controls="test-description"
                className="h-6 w-6 p-0 relative top-[0.125rem]"
              >
                <Info size='1rem' className="text-gray-500" />
                <span className="sr-only">
                  {isDescriptionVisible ? 'Hide test description' : 'Show test description'}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className='basis-2/3 pt-3'>
          <TestResultChart
            testCriteria={testCriteria}
            testValue={testValue}
            testValueUnit={testValueUnit}
            height='0.75rem'
          />
        </div>
      </div>
      {isDescriptionVisible && (
        <div
          id="test-description"
          className="text-sm mt-2 text-gray-600 pl-3"
        >
          {testDescription}
        </div>
      )}
    </div>
  )
}

export { 
  TestResult,
  type TestResultProps,
}
