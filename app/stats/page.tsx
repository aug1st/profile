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

interface VisitorStats {
  totalVisits: number
  browsers: { [key: string]: number }
  operatingSystems: { [key: string]: number }
  recentVisits: VisitorLog[]
}

export default function StatsPage() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisits: 0,
    browsers: {},
    operatingSystems: {},
    recentVisits: []
  })
  const [loading, setLoading] = useState(true)

  const calculateStats = (logs: VisitorLog[]) => {
    const browsers: { [key: string]: number } = {}
    const operatingSystems: { [key: string]: number } = {}

    logs.forEach(log => {
      browsers[log.browser] = (browsers[log.browser] || 0) + 1
      operatingSystems[log.os] = (operatingSystems[log.os] || 0) + 1
    })

    return {
      totalVisits: logs.length,
      browsers,
      operatingSystems,
      recentVisits: logs.slice(0, 50) // Get last 50 visits
    }
  }

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

        setStats(calculateStats(data || []))
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
        { event: '*', schema: 'public', table: 'visitor_logs' }, 
        () => fetchLogs()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading visitor statistics...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visitor Statistics</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Visits</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalVisits}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Top Browsers</h2>
            <div className="space-y-2">
              {Object.entries(stats.browsers)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([browser, count]) => (
                  <div key={browser} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{browser}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{count}</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Top Operating Systems</h2>
            <div className="space-y-2">
              {Object.entries(stats.operatingSystems)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([os, count]) => (
                  <div key={os} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{os}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Recent Visits Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Visits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Browser
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    OS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats.recentVisits.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {log.browser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {log.os}
                    </td>
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
