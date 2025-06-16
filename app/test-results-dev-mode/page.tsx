'use client'

import { useState, useEffect } from 'react';
import type { SampleTestResultSchema } from '@/types/test-result-item'

export default function BloodTestResults() {
  const [data, setData] = useState<SampleTestResultSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test-results');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: SampleTestResultSchema = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-normal mb-4">Blood Test Results</h1>
      <div className="mb-4">
        <p>Patient ID: {data.patient.id}</p>
        <p>Test Date: {data.patient.name}</p>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Test</th>
            <th className="border p-2 text-left">Result</th>
            <th className="border p-2 text-left">Reference Range</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.bloodPanel.map(({ testName, testValue, testValueUnit, testCriteria }, index) => (
            <tr key={index}>
              <td className="border p-2">{testName}</td>
              <td className="border p-2">{testValue}{testValueUnit}</td>
              <td className="border p-2">{testCriteria.criticallyLow[0]} – {testCriteria.criticallyHigh[1]}</td>
              <td className="border p-2">Optimal</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}