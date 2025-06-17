import React from 'react'

interface TestCriteria {
  criticallyLow: [number, number]
  moderatelyLow: [number, number]
  optimal: [number, number]
  moderatelyHigh: [number, number]
  criticallyHigh: [number, number]
}

interface TestResultChartProps {
  testCriteria: TestCriteria
  testValue: number
  testValueUnit: string
}

const defaultTestCriteria: TestCriteria = {
  criticallyLow: [0, 20],
  moderatelyLow: [20, 40],
  optimal: [40, 60],
  moderatelyHigh: [60, 80],
  criticallyHigh: [80, 100]
}

const TestResultChart: React.FC<TestResultChartProps> = ({
  testCriteria = defaultTestCriteria,
  testValue = 50,
  testValueUnit = ''
}) => {
  // Constants for SVG dimensions and styling
  const svgHeight = 40  // Reduced overall height to better match 8px bar
  const barHeight = 8   // Fixed bar height as specified
  const triangleSize = 4  // Reduced triangle size to match new scale

  // Calculate the full range of values
  const minValue = testCriteria.criticallyLow[0]
  const maxValue = testCriteria.criticallyHigh[1]
  const fullRange = maxValue - minValue

  // Function to convert a value to percentage
  const valueToPercent = (value: number): number => {
    return ((value - minValue) / fullRange) * 100
  }

  // Calculate section widths
  const sections = [
    { 
      range: testCriteria.criticallyLow,
      color: '#EC2B2B',
      label: 'Critically Low'
    },
    {
      range: testCriteria.moderatelyLow,
      color: '#EAA001',
      label: 'Moderately Low'
    },
    {
      range: testCriteria.optimal,
      color: '#37B33C',
      label: 'Optimal'
    },
    {
      range: testCriteria.moderatelyHigh,
      color: '#EAA001',
      label: 'Moderately High'
    },
    {
      range: testCriteria.criticallyHigh,
      color: '#EC2B2B',
      label: 'Critically High'
    }
  ]

  // Pre-calculate all section positions using percentages
  const sectionPositions = sections.map((section) => {
    const startPercent = valueToPercent(section.range[0])
    const endPercent = valueToPercent(section.range[1])
    return {
      ...section,
      startX: `${startPercent}%`,
      width: `${endPercent - startPercent}%`
    }
  })

  // Calculate marker position as percentage
  const markerPercent = valueToPercent(testValue)

  return (
    <svg 
      width="100%" 
      height={svgHeight}
      viewBox={`0 0 100 ${svgHeight}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Test result chart showing ${testValue} ${testValueUnit}`}
    >
      {/* Draw the stacked bar sections */}
      {sectionPositions.map((section, index) => (
        <rect
          key={index}
          x={section.startX}
          y={16}  // Centered in the SVG
          width={section.width}
          height={barHeight}
          fill={section.color}
          aria-label={`${section.label} range: ${section.range[0]} to ${section.range[1]} ${testValueUnit}`}
        />
      ))}

      {/* Draw the marker triangle */}
      <g transform={`translate(${markerPercent}%, 0)`}>
        <path
          d={`M -${triangleSize} ${barHeight + 20} 
              L ${triangleSize} ${barHeight + 20} 
              L 0 ${barHeight + 16} Z`}
          fill="black"
          aria-label={`Current value marker: ${testValue} ${testValueUnit}`}
        />
      </g>

      {/* Add range labels */}
      <text
        x="0"
        y={svgHeight - 4}
        className="text-xs"
        fill="currentColor"
      >
        {minValue} {testValueUnit}
      </text>
      <text
        x="100%"
        y={svgHeight - 4}
        className="text-xs text-right"
        fill="currentColor"
        textAnchor="end"
      >
        {maxValue} {testValueUnit}
      </text>
    </svg>
  )
}

export { TestResultChart }
