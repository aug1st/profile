'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface VisitorLog {
  id: number
  ip: string
  timestamp: string
  os: string
  browser: string
}

export default function StatsPage() {
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogs() {
      try {
        const { data, error } = await supabase
          .from('visitor_logs')
          .select('*')
          .order('timestamp', { ascending: false })

        if (error) {
          console.error('Error fetching logs:', error)
          return
        }

        setVisitorLogs(data || [])
      } catch (error) {
        console.error('Failed to fetch logs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()

    // Set up real-time subscription
    const subscription = supabase
      .channel('visitor_logs_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'visitor_logs' 
        }, 
        () => {
          fetchLogs()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading visitor logs...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Visitor Statistics</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <p className="text-gray-500">Total Visits: {visitorLogs.length}</p>
          </div>
          <div className="overflow-x-auto">
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
                {visitorLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.os}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.browser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
