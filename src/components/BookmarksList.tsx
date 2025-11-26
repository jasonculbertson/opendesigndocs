import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, FileText } from 'lucide-react';

interface Bookmark {
  id: number;
  path: string;
  title: string;
  created_at: string;
}

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch('/api/bookmarks');
      if (res.status === 401) {
        setNeedsAuth(true);
      } else if (res.ok) {
        const { data } = await res.json();
        setBookmarks(data || []);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeBookmark = async (path: string) => {
    try {
      const res = await fetch(`/api/bookmarks?path=${encodeURIComponent(path)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookmarks(prev => prev.filter(b => b.path !== path));
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (needsAuth) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Please sign in to view your bookmarks.</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <p className="text-lg text-gray-600">You haven't bookmarked any pages yet.</p>
        <p className="text-sm text-gray-500 mt-2">Browse the documentation and click the bookmark icon to save pages here.</p>
        <a href="/docs/levels/levels-titles" className="inline-block mt-4 text-blue-600 hover:underline">Browse Content</a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors bg-white shadow-sm">
          <a href={bookmark.path} className="flex items-center flex-1 group min-w-0">
            <FileText className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 group-hover:text-blue-500" />
            <div className="truncate">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 truncate">{bookmark.title || bookmark.path}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Saved on {new Date(bookmark.created_at).toLocaleDateString()}</p>
            </div>
          </a>
          <button
            onClick={(e) => {
              e.preventDefault();
              removeBookmark(bookmark.path);
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-4 flex-shrink-0"
            title="Remove bookmark"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
