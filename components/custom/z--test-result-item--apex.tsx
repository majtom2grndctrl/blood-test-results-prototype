'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Chart from 'react-apexcharts'
import { type ApexOptions } from 'apexcharts'
import { Button } from '@/components/ui/button'

interface TestCriteria {
  criticallyLow: [number, number]
  moderatelyLow: [number, number]
  optimal: [number, number]
  moderatelyHigh: [number, number]
  criticallyHigh: [number, number]
}

interface TestResultSchema {
  testCriteria: TestCriteria
  testName: string
  testValue: number
  testValueUnit: string
  testDescription: string
}

interface TestResultProps extends TestResultSchema {
  className?: string
  chartOptions?: ApexOptions
}

function TestResult({
  className = '',
  testCriteria: { criticallyLow, moderatelyLow, optimal, moderatelyHigh, criticallyHigh },
  testName,
  testValue,
  testValueUnit,
  testDescription,
}: TestResultProps) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  const chartOptions: ApexOptions = {
    chart: {
      stacked: true,
      stackType: 'normal',
      toolbar: {
        show: false,
      }
    },
    colors: ['#EC2B2B', '#EAA001', '#37B33C', '#EAA001', '#EC2B2B'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 8,
        dataLabels: {
          total: {
            enabled: false,
          }
        }
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      axisBorder: {
        show: true,
      },
      categories: [''],
      labels: {
        show: true,
        formatter: (value) => `${value}${testValueUnit}`
      },
      min: criticallyLow[0],
      max: criticallyHigh[1],
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  }
  

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible)
  }

  // Convert test criteria to values that can be used by ApexCharts
  const chartSeries: ApexAxisChartSeries = [
    {
      name: 'Critically Low',
      data: [criticallyLow[1]],
    },
    {
      name: 'Moderately Low',
      data: [moderatelyLow[1] - criticallyLow[1]],
    },
    {
      name: 'Optimal',
      data: [optimal[1] - moderatelyLow[1]],
    },
    {
      name: 'Moderately High',
      data: [moderatelyHigh[1] - optimal[1]],
    },
    {
      name: 'Critically High',
      data: [criticallyHigh[1] - moderatelyHigh[1]],
    },
  ]

  const combinedChartOptions: ApexOptions = {
    ...chartOptions,
    annotations: {
      xaxis: [{
        x: testValue,
        label: {
          text: `${testValue}${testValueUnit}`
        },
      }]
    },
  }
  
  console.log({ combinedChartOptions })

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-row space-x-6">
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDescription}
            aria-expanded={isDescriptionVisible}
            aria-controls="test-description"
          >
            {isDescriptionVisible ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            <span className="sr-only">
              {isDescriptionVisible ? 'Hide test description' : 'Show test description'}
            </span>
          </Button>
        </div>

        <div className='basis-1/4'>
          <header>
            {testName}
          </header>
          <div className="flex justify-between items-center">
            <div className="flex flex-row space-x-1 items-baseline">
              <span className="font-bold">{testValue}</span>
              <span className="text-muted-foreground">{testValueUnit}</span>
            </div>
          </div>
          {isDescriptionVisible && (
            <div
              id="test-description"
              className="text-sm mt-1"
            >
              {testDescription}
            </div>
          )}
        </div>
        <div className='basis-3/4'>
          <Chart
            height={90}
            options={combinedChartOptions}
            series={chartSeries}
            type='bar'
          />
        </div>
      </div>
    </div>
  )
}

export { 
  TestResult,
  type TestResultProps,
  type TestResultSchema
}
