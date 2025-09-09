import React, { useState, useEffect } from 'react';

// Authorized user IDs for both development and production environments
const AUTHORIZED_USER_IDS = [
  'user_2ycNsYsOHZUfRlxgP2ysOCztGkt', // Production UUID
  'user_2yhwbXQyVgKDpgEisp93K3ObWSQ'  // Development/Testing UUID
];

interface ClerkUser {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName?: string;
  lastName?: string;
}

const EnhancedAnalytics: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [clerkState, setClerkState] = useState<{
    isLoaded: boolean;
    isSignedIn: boolean;
    user: ClerkUser | null;
  }>({
    isLoaded: false,
    isSignedIn: false,
    user: null
  });
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Monitor Clerk state changes
  useEffect(() => {
    if (!isClient) return;

    const checkClerkState = () => {
      if (typeof window !== 'undefined' && (window as any).Clerk) {
        const clerk = (window as any).Clerk;
        const isLoaded = clerk.loaded || !!clerk.user;
        const user = clerk.user;
        const isSignedIn = !!user;

        console.log('🔍 Enhanced Analytics: Clerk state check:', {
          isLoaded,
          isSignedIn,
          userId: user?.id,
          userIdType: typeof user?.id,
          clerkLoaded: clerk.loaded,
          hasUser: !!user
        });

        // Only update state if we have a valid user object with a proper ID
        if (user && user.id && typeof user.id === 'string' && user.id !== 'undefined') {
          setClerkState({
            isLoaded,
            isSignedIn,
            user: {
              id: user.id,
              emailAddresses: user.emailAddresses || [],
              firstName: user.firstName,
              lastName: user.lastName
            }
          });
        } else if (isLoaded && !user) {
          // User is not signed in but Clerk is loaded
          setClerkState({
            isLoaded: true,
            isSignedIn: false,
            user: null
          });
        }
        // If user exists but has invalid ID, keep the loading state
      }
    };

    // Initial check
    checkClerkState();

    // Set up polling to check for Clerk state changes
    const interval = setInterval(checkClerkState, 500);

    // Listen for Clerk events if available
    if (typeof window !== 'undefined' && (window as any).Clerk) {
      try {
        if ((window as any).Clerk.session) {
          // Clerk is ready, check immediately
          checkClerkState();
        }
      } catch (e) {
        console.log('🔍 Enhanced Analytics: Clerk event listener not available');
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isClient]);
  
  // Show loading state on server side and initial client render
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 Enhanced Analytics Debug:', {
    isLoaded: clerkState.isLoaded,
    isSignedIn: clerkState.isSignedIn,
    userId: clerkState.user?.id,
    authorizedUserIds: AUTHORIZED_USER_IDS,
    isAuthorized: clerkState.user?.id && AUTHORIZED_USER_IDS.includes(clerkState.user.id)
  });
  
  // Show loading state while Clerk is loading
  if (!clerkState.isLoaded) {
    console.log('🔍 Enhanced Analytics: Still loading...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show access denied if user is not signed in
  if (!clerkState.isSignedIn || !clerkState.user) {
    console.log('🔍 Enhanced Analytics: User not signed in');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You must be signed in to view analytics.</p>
        </div>
      </div>
    );
  }
  
  // Check if current user is authorized
  const isAuthorized = clerkState.user && AUTHORIZED_USER_IDS.includes(clerkState.user.id);

  // Show access denied if user is not authorized
  if (!isAuthorized) {
    console.log('🔍 Enhanced Analytics: User not authorized');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to view this page.</p>
          <p className="text-sm text-gray-500 mt-2">User ID: {clerkState.user?.id}</p>
        </div>
      </div>
    );
  }
  
  console.log('🔍 Enhanced Analytics: User is authorized, showing dashboard');
  
  // Ensure we have a valid user ID before rendering the dashboard
  if (!clerkState.user.id) {
    console.error('🔍 Enhanced Analytics: User ID is missing!');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">User ID is missing.</p>
        </div>
      </div>
    );
  }
  
  // Additional safety check to ensure userId is a string and not undefined
  const userId = clerkState.user.id;
  if (typeof userId !== 'string' || userId === 'undefined' || userId.trim() === '') {
    console.error('🔍 Enhanced Analytics: Invalid user ID:', userId);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600">Invalid user ID. Please sign out and sign back in.</p>
          <p className="text-sm text-gray-500 mt-2">Debug: {String(userId)}</p>
        </div>
      </div>
    );
  }
  
  console.log('🔍 Enhanced Analytics: Rendering dashboard with valid userId:', userId);
  
  return <EnhancedAnalyticsDashboard userId={userId} />;
};

// Enhanced Analytics Dashboard Component
const EnhancedAnalyticsDashboard: React.FC<{ userId: string }> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'recruiter'>('general');
  const [generalData, setGeneralData] = useState<any>(null);
  const [recruiterData, setRecruiterData] = useState<any>(null);
  const [generalLoading, setGeneralLoading] = useState(false);
  const [recruiterLoading, setRecruiterLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [recruiterError, setRecruiterError] = useState<string | null>(null);

  // Load general analytics
  const loadGeneralAnalytics = async () => {
    if (generalData) return; // Already loaded
    
    setGeneralLoading(true);
    setGeneralError(null);
    
    try {
      const response = await fetch(`/api/analytics?user_id=${userId}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch analytics');
      }
      
      if (result.success) {
        setGeneralData(result.data);
      } else {
        throw new Error(result.error || 'Failed to load analytics');
      }
    } catch (error: any) {
      console.error('Error loading analytics:', error);
      setGeneralError(error.message);
    } finally {
      setGeneralLoading(false);
    }
  };

  // Load recruiter analytics
  const loadRecruiterAnalytics = async () => {
    if (recruiterData) return; // Already loaded
    
    setRecruiterLoading(true);
    setRecruiterError(null);
    
    try {
      const response = await fetch(`/api/recruiter-analytics?user_id=${userId}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch recruiter analytics');
      }
      
      if (result.success) {
        setRecruiterData(result.data);
      } else {
        throw new Error(result.error || 'Failed to load recruiter analytics');
      }
    } catch (error: any) {
      console.error('Error loading recruiter analytics:', error);
      setRecruiterError(error.message);
    } finally {
      setRecruiterLoading(false);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (activeTab === 'general') {
      loadGeneralAnalytics();
    } else if (activeTab === 'recruiter') {
      loadRecruiterAnalytics();
    }
  }, [activeTab]);

  // Initial load
  useEffect(() => {
    loadGeneralAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track user interactions and engagement across the platform</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-3 px-4 text-sm font-medium rounded-t-md border-b-2 ${
                  activeTab === 'general'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                📊 General Analytics
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`py-3 px-4 text-sm font-medium rounded-t-md border-b-2 cursor-pointer ${
                  activeTab === 'recruiter'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                👥 Recruiter Performance
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <GeneralAnalyticsTab 
            data={generalData} 
            loading={generalLoading} 
            error={generalError}
            onRetry={loadGeneralAnalytics}
          />
        )}
        
        {activeTab === 'recruiter' && (
          <RecruiterAnalyticsTab 
            data={recruiterData} 
            loading={recruiterLoading} 
            error={recruiterError}
            onRetry={loadRecruiterAnalytics}
          />
        )}
      </div>
    </div>
  );
};

// General Analytics Tab Component
const GeneralAnalyticsTab: React.FC<{
  data: any;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}> = ({ data, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">Failed to load analytics data: {error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No data available</p>
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
          {data.topEvents.map(([event, count]: [string, number], index: number) => (
            <div key={event} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">{index + 1}. {event}</span>
              <span className="text-blue-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Pages */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Pages</h3>
        <div className="space-y-2">
          {data.topPages.map(([page, count]: [string, number], index: number) => (
            <div key={page} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700 truncate">{index + 1}. {page}</span>
              <span className="text-green-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Daily Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Activity (Last 7 Days)</h3>
        <div className="space-y-2">
          {data.dailyActivity.map(([date, count]: [string, number]) => (
            <div key={date} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-700">{new Date(date).toLocaleDateString()}</span>
              <span className="text-purple-600 font-semibold">{count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Date Range Info */}
      <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
        <p>Data from {new Date(data.summary.dateRange.startDate).toLocaleDateString()} to {new Date(data.summary.dateRange.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

// Recruiter Analytics Tab Component
const RecruiterAnalyticsTab: React.FC<{
  data: any;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}> = ({ data, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading recruiter analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-600">Failed to load recruiter analytics: {error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No recruiter data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recruiter Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Recruiters</h3>
          <p className="text-3xl font-bold text-blue-600">{data.summary.totalRecruiters}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Views</h3>
          <p className="text-3xl font-bold text-green-600">{data.summary.totalProfileViews.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Clicks</h3>
          <p className="text-3xl font-bold text-purple-600">{data.summary.totalContactClicks.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg. Conversion</h3>
          <p className="text-3xl font-bold text-orange-600">{data.summary.averageConversionRate}%</p>
        </div>
      </div>
      
      {/* Recruiter Performance Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recruiter Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Clicks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Contact Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recruiterPerformance.map((recruiter: any, index: number) => {
                const topContactType = Object.entries(recruiter.contactTypes)
                  .sort(([,a], [,b]) => (b as number) - (a as number))[0];
                const topContactText = topContactType ? `${topContactType[0]} (${topContactType[1]})` : 'None';
                
                return (
                  <tr key={recruiter.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{recruiter.name}</div>
                      {recruiter.slug && <div className="text-sm text-gray-500">/{recruiter.slug}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recruiter.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{recruiter.profileViews.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{recruiter.contactClicks.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        parseFloat(recruiter.conversionRate) > 5 ? 'bg-green-100 text-green-800' :
                        parseFloat(recruiter.conversionRate) > 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recruiter.conversionRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{topContactText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Contact Type Breakdown and Daily Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Contact Types</h3>
          <div className="space-y-3">
            {data.topContactTypes.map(([type, count]: [string, number]) => (
              <div key={type} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-700 capitalize">{type}</span>
                <span className="text-blue-600 font-semibold">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Trends (Last 14 Days)</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.dailyTrends.map((day: any) => (
              <div key={day.date} className="flex justify-between items-center p-2 text-sm">
                <span className="text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                <div className="flex space-x-4">
                  <span className="text-blue-600">{day.totalViews} views</span>
                  <span className="text-purple-600">{day.totalContacts} contacts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Date Range Info */}
      <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
        <p>Recruiter data from {new Date(data.summary.dateRange.startDate).toLocaleDateString()} to {new Date(data.summary.dateRange.endDate).toLocaleDateString()}</p>
        <p className="mt-1">Last updated: {new Date(data.generatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EnhancedAnalytics;
