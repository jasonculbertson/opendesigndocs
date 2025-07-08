import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MousePointer, FileText, Clock, TrendingUp } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface AnalyticsData {
  totalEvents: number;
  buttonClicks: {
    [key: string]: number;
  };
  flowStarts: {
    [key: string]: number;
  };
  flowCompletions: {
    [key: string]: number;
  };
  fileUploads: {
    [key: string]: number;
  };
  steps: {
    [key: string]: number;
  };
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalEvents: 0,
    buttonClicks: {},
    flowStarts: {},
    flowCompletions: {},
    fileUploads: {},
    steps: {}
  });

  useEffect(() => {
    // Get events from analytics tracker
    const events = analytics.getEvents();
    
    // Process events into analytics data
    const data: AnalyticsData = {
      totalEvents: events.length,
      buttonClicks: {},
      flowStarts: {},
      flowCompletions: {},
      fileUploads: {},
      steps: {}
    };

    events.forEach(event => {
      if (event.event === 'reviews_ai_button_click') {
        const buttonType = event.properties?.button_type || 'unknown';
        data.buttonClicks[buttonType] = (data.buttonClicks[buttonType] || 0) + 1;
      } else if (event.event === 'reviews_ai_flow_start') {
        const flowType = event.properties?.flow_type || 'unknown';
        data.flowStarts[flowType] = (data.flowStarts[flowType] || 0) + 1;
      } else if (event.event === 'reviews_ai_flow_complete') {
        const flowType = event.properties?.flow_type || 'unknown';
        data.flowCompletions[flowType] = (data.flowCompletions[flowType] || 0) + 1;
      } else if (event.event === 'reviews_ai_file_upload') {
        const fileType = event.properties?.file_type || 'unknown';
        data.fileUploads[fileType] = (data.fileUploads[fileType] || 0) + 1;
      } else if (event.event === 'reviews_ai_step') {
        const step = event.properties?.step || 'unknown';
        data.steps[step] = (data.steps[step] || 0) + 1;
      }
    });

    setAnalyticsData(data);
  }, []);

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const MetricCard: React.FC<{ title: string; data: { [key: string]: number } }> = ({ title, data }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 capitalize">{key.replace(/-/g, ' ')}</span>
            <span className="text-sm font-medium text-gray-900">{value}</span>
          </div>
        ))}
        {Object.keys(data).length === 0 && (
          <p className="text-sm text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews AI Analytics</h1>
        <p className="text-gray-600">Track user interactions and engagement with the Reviews AI feature</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value={analyticsData.totalEvents}
          icon={<BarChart3 className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Button Clicks"
          value={Object.values(analyticsData.buttonClicks).reduce((a, b) => a + b, 0)}
          icon={<MousePointer className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="Flow Starts"
          value={Object.values(analyticsData.flowStarts).reduce((a, b) => a + b, 0)}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
        <StatCard
          title="File Uploads"
          value={Object.values(analyticsData.fileUploads).reduce((a, b) => a + b, 0)}
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricCard title="Button Click Types" data={analyticsData.buttonClicks} />
        <MetricCard title="Flow Types Started" data={analyticsData.flowStarts} />
        <MetricCard title="Flow Completions" data={analyticsData.flowCompletions} />
        <MetricCard title="File Upload Types" data={analyticsData.fileUploads} />
      </div>

      {/* Steps Tracking */}
      <div className="mt-8">
        <MetricCard title="Step Progression" data={analyticsData.steps} />
      </div>

      {/* Export Data */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
        <button
          onClick={() => {
            const events = analytics.getEvents();
            const dataStr = JSON.stringify(events, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `reviews-ai-analytics-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Export Raw Data
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 