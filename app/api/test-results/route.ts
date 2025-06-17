import { NextResponse } from 'next/server'
import { type SampleTestResultSchema } from '@/types/test-result-item'

const mockData: SampleTestResultSchema = {
  bloodPanel: [
    {
      testName: "Blood Glucose (Fasting)",
      // testValue: 90,
      testValueUnit: "mg/dL",
      testDescription: "Blood glucose measures sugar in the blood after fasting and helps diagnose diabetes.",
      testCriteria: {
        criticallyLow: [51, 60],
        moderatelyLow: [61, 70],
        optimal: [71, 100],
        moderatelyHigh: [101, 125],
        criticallyHigh: [126, 150]
      }
    },
    {
      testName: "Blood Urea Nitrogen (BUN)",
      // testValue: 15,
      testValueUnit: "mg/dL",
      testDescription: "BUN measures kidney function by determining how well they remove urea from the blood.",
      testCriteria: {
      criticallyLow: [1, 5],
      moderatelyLow: [6, 10],
      optimal: [11, 20],
      moderatelyHigh: [21, 30],
      criticallyHigh: [31, 40]
      }
    },
    {
      testName: "Cholesterol",
      testValue: 190,
      testValueUnit: "mg/dL",
      testDescription: "Cholesterol is necessary for cell building, but high levels can increase the risk of heart disease.",
      testCriteria: {
      criticallyLow: [91, 100],
      moderatelyLow: [101, 130],
      optimal: [131, 200],
      moderatelyHigh: [201, 240],
      criticallyHigh: [241, 270]
      }
    },
    {
      testName: "Creatinine",
      // testValue: 1,
      testValueUnit: "mg/dL",
      testDescription: "Creatinine is a waste product filtered by the kidneys. High levels may indicate kidney dysfunction.",
      testCriteria: {
      criticallyLow: [0.4, 0.5],
      moderatelyLow: [0.6, 0.8],
      optimal: [0.9, 1.3],
      moderatelyHigh: [1.4, 1.8],
      criticallyHigh: [1.9, 2.3]
      }
    },
    {
      testName: "LDL Cholesterol",
      testValue: 140,
      testValueUnit: "mg/dL",
      testDescription: "LDL cholesterol is known as 'bad cholesterol,' and high levels can lead to heart disease.",
      testCriteria: {
      criticallyLow: [41, 50],
      moderatelyLow: [51, 80],
      optimal: [81, 130],
      moderatelyHigh: [131, 160],
      criticallyHigh: [161, 190]
      }
    },
    {
      testName: "HDL Cholesterol",
      testValue: 60,
      testValueUnit: "mg/dL",
      testDescription: "HDL cholesterol is 'good cholesterol' that helps remove LDL cholesterol from the bloodstream.",
      testCriteria: {
      criticallyLow: [21, 30],
      moderatelyLow: [31, 40],
      optimal: [41, 60],
      moderatelyHigh: [61, 80],
      criticallyHigh: [81, 100]
      }
    },
    {
      testName: "Hemoglobin",
      // testValue: 13.5,
      testValueUnit: "g/dL",
      testDescription: "Hemoglobin is a protein in red blood cells that carries oxygen throughout the body.",
      testCriteria: {
      criticallyLow: [6.2, 8],
      moderatelyLow: [8.1, 10.5],
      optimal: [10.6, 15],
      moderatelyHigh: [15.1, 17],
      criticallyHigh: [17.1, 18.9]
      }
    },
    {
      testName: "Platelet Count",
      // testValue: 250,
      testValueUnit: "cells/µL",
      testDescription: "Platelets help with blood clotting to prevent excessive bleeding.",
      testCriteria: {
      criticallyLow: [51, 100],
      moderatelyLow: [101, 150],
      optimal: [151, 400],
      moderatelyHigh: [401, 450],
      criticallyHigh: [451, 500]
      }
    },
    {
      testName: "Total Protein",
      // testValue: 4.5,
      testValueUnit: "g/dL",
      testDescription: "Total protein measures the overall protein levels in the blood, which reflect liver and kidney function.",
      testCriteria: {
      criticallyLow: [4.1, 5],
      moderatelyLow: [5.1, 6],
      optimal: [6.1, 8],
      moderatelyHigh: [8.1, 9],
      criticallyHigh: [9.1, 10]
      }
    },
    {
      testName: "Triglycerides",
      testValue: 150,
      testValueUnit: "mg/dL",
      testDescription: "Triglycerides are a type of fat in the blood. High levels can increase the risk of heart disease.",
      testCriteria: {
      criticallyLow: [41, 50],
      moderatelyLow: [51, 100],
      optimal: [101, 150],
      moderatelyHigh: [151, 200],
      criticallyHigh: [201, 250]
      }
    },
    {
      testName: "White Blood Cell Count (WBC)",
      // testValue: 7.2,
      testValueUnit: "cells/µL",
      testDescription: "WBC count measures the number of white blood cells, which help fight infections.",
      testCriteria: {
      criticallyLow: [1.2, 2.5],
      moderatelyLow: [2.6, 4],
      optimal: [4.1, 10],
      moderatelyHigh: [10.1, 12],
      criticallyHigh: [12.1, 13.5]
      }
    }
  ],
  patient: {
    id: 784390782,
    name: 'Skip Reilley'
  },
  dates: {
    orderedAt: '2024-10-25T09:00:00Z',    // Stored as ISO string in DB
    collectedAt: '2024-10-28T14:30:00Z',
    analyzedAt: '2024-10-28T16:45:00Z',
    reportedAt: '2024-10-28T17:30:00Z',
    reviewedAt: '2024-10-28T19:15:00Z'
  },
  doctor: {
    id: 12345,
    name: 'Dr. Sidney Ryan',
    credentials: 'MD, PhD'
  },
  doctorNotes: {
    content: `
      <h3>Summary</h3>
      <p>Overall blood panel results show mostly normal values with a few areas of concern:</p>
      <ul>
        <li>Total Protein is critically low at 4.5 g/dL, suggesting possible malnutrition or liver dysfunction</li>
        <li>LDL Cholesterol is moderately high at 140 mg/dL</li>
      </ul>
      
      <h3>Recommendations</h3>
      <ul>
        <li>Schedule follow-up in 2 weeks to recheck Total Protein</li>
        <li>Dietary modifications to address LDL levels</li>
        <li>Consider nutritional consultation</li>
      </ul>
      
      <h3>Additional Notes</h3>
      <p>Patient reports consistent exercise routine and recent dietary changes. Will monitor protein levels closely during follow-up.</p>
    `,
    createdAt: '2024-10-28T19:15:00Z',
    updatedAt: '2024-10-28T19:30:00Z',
    author: {
      id: 12345,
      name: 'Dr. Sidney Ryan',
      credentials: 'MD, PhD'
    }
  }
}

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  return NextResponse.json(mockData)
}