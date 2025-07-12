import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  summary: {
    totalEvents: number;
    uniqueUsers: number;
    uniqueSessions: number;
    dateRange: {
      startDate: string;
      endDate: string;
    };
  };
  topEvents: [string, number][];
  topPages: [string, number][];
  dailyActivity: [string, number][];
}

interface AnalyticsDashboardProps {
  userId: string;
}

export default function AnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  console.log('🔍 AnalyticsDashboard: Received userId:', userId);

  // Ensure component is mounted before making API calls
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !userId) {
      console.log('🔍 AnalyticsDashboard: Not ready for API call', { isMounted, userId });
      return;
    }

    // Additional safety checks for userId
    if (typeof userId !== 'string' || userId === 'undefined' || userId.trim() === '') {
      console.error('🔍 AnalyticsDashboard: Invalid userId provided:', userId);
      setError('Invalid user ID provided. Please refresh the page.');
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        console.log('🔍 AnalyticsDashboard: Making API call with userId:', userId);
        const response = await fetch(`/api/analytics?user_id=${encodeURIComponent(userId)}`);
        
        console.log('🔍 AnalyticsDashboard: API response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('🔍 AnalyticsDashboard: API response:', result);
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch analytics data');
        }
      } catch (err) {
        console.error('🔍 AnalyticsDashboard: API error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId, isMounted]);

  if (!isMounted || !userId) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-600">
          <h3 className="text-lg font-semibold mb-2">Error Loading Analytics</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-500">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600">{data.summary.totalEvents.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Unique Users</h3>
          <p className="text-3xl font-bold text-green-600">{data.summary.uniqueUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Sessions</h3>
          <p className="text-3xl font-bold text-purple-600">{data.summary.uniqueSessions.toLocaleString()}</p>
        </div>
      </div>

      {/* Top Events */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Events</h3>
        <div className="space-y-2">
          {data.topEvents.map(([event, count], index) => (
            <div key={event} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">
                {index + 1}. {event}
              </span>
              <span className="text-blue-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Pages</h3>
        <div className="space-y-2">
          {data.topPages.map(([page, count], index) => (
            <div key={page} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700 truncate">
                {index + 1}. {page}
              </span>
              <span className="text-green-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Activity (Last 7 Days)</h3>
        <div className="space-y-2">
          {data.dailyActivity.map(([date, count]) => (
            <div key={date} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">
                {new Date(date).toLocaleDateString()}
              </span>
              <span className="text-purple-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Info */}
      <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
        <p>
          Data from {new Date(data.summary.dateRange.startDate).toLocaleDateString()} to{' '}
          {new Date(data.summary.dateRange.endDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 