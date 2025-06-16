export interface TestCriteria {
  criticallyLow: [number, number]
  moderatelyLow: [number, number]
  optimal: [number, number]
  moderatelyHigh: [number, number]
  criticallyHigh: [number, number]
}

export interface TestResultSchema {
  testCriteria: TestCriteria
  testName: string
  testValue?: number
  testValueUnit: string
  testDescription: string
}

export interface Doctor {
  id: number;
  name: string;
  credentials: string;
}

export interface TestDates {
  orderedAt: string;      // When the test was ordered
  collectedAt: string;    // When the sample was collected
  analyzedAt: string;     // When the lab analyzed the sample
  reportedAt: string;     // When results were reported
  reviewedAt: string;     // When doctor reviewed results
}

export interface DoctorNotes {
  content: string;        // Rich text content
  createdAt: string;     // When note was created
  updatedAt: string;     // Last edit timestamp
  author: Doctor;        // Doctor who wrote the note
}

export interface SampleTestResultSchema {
  bloodPanel: TestResultSchema[],
  patient: {
    id: number,
    name: string,
  },
  dates: TestDates,
  doctor: Doctor,
  doctorNotes: DoctorNotes
}
