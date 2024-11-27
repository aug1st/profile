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
  todayVisits: number
  lastWeekVisits: number
}

export default function StatsPage() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisits: 0,
    browsers: {},
    operatingSystems: {},
    recentVisits: [],
    todayVisits: 0,
    lastWeekVisits: 0
  })
  const [loading, setLoading] = useState(true)

  const calculateStats = (logs: VisitorLog[]) => {
    const browsers: { [key: string]: number } = {}
    const operatingSystems: { [key: string]: number } = {}
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    let todayCount = 0
    let weekCount = 0

    logs.forEach(log => {
      browsers[log.browser] = (browsers[log.browser] || 0) + 1
      operatingSystems[log.os] = (operatingSystems[log.os] || 0) + 1
      
      const visitDate = new Date(log.timestamp)
      if (visitDate >= today) {
        todayCount++
      }
      if (visitDate >= lastWeek) {
        weekCount++
      }
    })

    return {
      totalVisits: logs.length,
      browsers,
      operatingSystems,
      recentVisits: logs.slice(0, 50),
      todayVisits: todayCount,
      lastWeekVisits: weekCount
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

  const getPercentChange = (current: number, total: number) => {
    if (total === 0) return 0
    return ((current / total) * 100).toFixed(1)
  }

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visitor Statistics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Visits</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalVisits}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Today's Visits</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.todayVisits}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {getPercentChange(stats.todayVisits, stats.totalVisits)}% of total
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Last 7 Days</h2>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.lastWeekVisits}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {getPercentChange(stats.lastWeekVisits, stats.totalVisits)}% of total
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Avg. Daily Visits</h2>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {(stats.lastWeekVisits / 7).toFixed(1)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last 7 days</p>
          </div>
        </div>

        {/* Browser and OS Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Browser Distribution</h2>
            <div className="space-y-4">
              {Object.entries(stats.browsers)
                .sort(([,a], [,b]) => b - a)
                .map(([browser, count]) => {
                  const percentage = getPercentChange(count, stats.totalVisits)
                  return (
                    <div key={browser} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{browser}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Operating Systems</h2>
            <div className="space-y-4">
              {Object.entries(stats.operatingSystems)
                .sort(([,a], [,b]) => b - a)
                .map(([os, count]) => {
                  const percentage = getPercentChange(count, stats.totalVisits)
                  return (
                    <div key={os} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{os}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
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
