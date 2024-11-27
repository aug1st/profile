'use client'

import React, { useEffect, useState } from 'react'

interface VisitorLog {
  ip: string
  timestamp: string
  os: string
  browser: string
}

export default function StatsPage() {
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([])

  useEffect(() => {
    const logs = localStorage.getItem('visitorLogs')
    if (logs) {
      setVisitorLogs(JSON.parse(logs))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Visitor Statistics</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operating System</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitorLogs.map((log, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.os}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.browser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
