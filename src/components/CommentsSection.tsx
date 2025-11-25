import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Loader2, Send, Trash2, User as UserIcon, MessageCircle, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: number;
  content: string;
  user_name: string;
  user_avatar_url: string;
  created_at: string;
  clerk_user_id: string;
  parent_id: number | null;
}

interface CommentProps {
    comment: Comment;
    currentUserId?: string;
    onDelete: (id: number) => void;
    onReply: (parentId: number, content: string) => Promise<void>;
    replies: Comment[];
}

const CommentItem = ({ comment, currentUserId, onDelete, onReply, replies }: CommentProps) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim()) return;
        
        setIsSubmitting(true);
        await onReply(comment.id, replyContent);
        setIsSubmitting(false);
        setReplyContent('');
        setIsReplying(false);
    };

    return (
        <div className="flex gap-4">
             {comment.user_avatar_url ? (
                <img
                    src={comment.user_avatar_url}
                    alt={comment.user_name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                />
            ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-gray-400" />
                </div>
            )}
            
            <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{comment.user_name}</span>
                            <span className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                        </div>
                        {currentUserId === comment.clerk_user_id && (
                            <button
                                onClick={() => onDelete(comment.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete comment"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words">
                        {comment.content}
                    </div>
                </div>

                <div className="mt-2 flex items-center gap-4">
                     <button 
                        onClick={() => setIsReplying(!isReplying)}
                        className="text-sm text-gray-500 hover:text-blue-600 font-medium flex items-center gap-1.5"
                    >
                        <Reply className="w-4 h-4" />
                        Reply
                     </button>
                </div>

                {isReplying && (
                    <form onSubmit={handleSubmitReply} className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2">
                         <div className="flex-1">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder={`Reply to ${comment.user_name}...`}
                                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-h-[80px]"
                                autoFocus
                            />
                            <div className="mt-2 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsReplying(false)}
                                    className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !replyContent.trim()}
                                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Posting...' : 'Reply'}
                                </button>
                            </div>
                         </div>
                    </form>
                )}

                {/* Nested Replies */}
                {replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100">
                         {replies.map(reply => (
                             <CommentItem 
                                key={reply.id}
                                comment={reply}
                                currentUserId={currentUserId}
                                onDelete={onDelete}
                                onReply={onReply}
                                replies={[]} // Max 1 level deep for simplicity in UI, though DB supports infinite
                             />
                         ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function CommentsSection() {
  const { user, isSignedIn, isLoaded } = useUser();
  const clerk = useClerk();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [path, setPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      setPath(currentPath);
      fetchComments(currentPath);
    }
  }, []);

  const fetchComments = async (currentPath: string) => {
    try {
      const res = await fetch(`/api/comments?path=${encodeURIComponent(currentPath)}`);
      if (res.ok) {
        const { data } = await res.json();
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          content: newComment.trim(),
          articleTitle: document.title, // Send title for notification context
        }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setComments((prev) => [...prev, data]);
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    if (!isSignedIn) {
        clerk.openSignIn();
        return;
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          content: content.trim(),
          parent_id: parentId,
          articleTitle: document.title,
        }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setComments((prev) => [...prev, data]);
      }
    } catch (error) {
        console.error('Error replying:', error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== commentId && c.parent_id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!isLoaded) return null;

  // Organize comments into threads
  const rootComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: number) => comments.filter(c => c.parent_id === parentId);

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              {comments.length}
          </span>
      </div>

      {/* Comment Form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex gap-4">
            <img
              src={user.imageUrl}
              alt={user.firstName || 'User'}
              className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y text-sm sm:text-base shadow-sm"
                    required
                />
                <div className="absolute bottom-3 right-3">
                     <button
                        type="submit"
                        disabled={isSubmitting || !newComment.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                        >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                        Post
                    </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-10 p-6 bg-gray-50 rounded-lg text-center border border-gray-100">
          <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">Join the discussion to leave a comment</p>
          <button
            onClick={() => clerk.openSignIn()}
            className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm transition-all hover:shadow-md"
          >
            Sign In with Clerk
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : rootComments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          rootComments.map((comment) => (
            <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user?.id}
                onDelete={handleDelete}
                onReply={handleReply}
                replies={getReplies(comment.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
