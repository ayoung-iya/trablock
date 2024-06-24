/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { comment as addComment, getComments } from '@/components/textEditor/api/commentApi';
import { getReview, deleteReview as deleteReviewApi } from '@/components/textEditor/api/reviewApi';
import defaultProfile from '@/components/textEditor/icons/defaultProfile.png';

interface ReviewData {
  user_id: number;
  profile_img_url: string | null;
  nickname: string;
  is_editable: boolean;
  article_id: number;
  review_id: number;
  title: string;
  representative_img_url: string | undefined;
  description: string;
  created_at: string;
  is_like: boolean;
  like_count: number;
}

interface Schedule {
  schedule: string;
  description: string;
}

interface AddCommentData {
  review_id: number;
  reply_comment: string;
}

interface CommentData {
  user_id: number;
  profile_img_url: string | null;
  nickname: string;
  is_editable: boolean;
  comment_id: number;
  reply_comment: string;
  created_at: string;
  is_like: boolean;
  like_count: number;
}

export default function Page() {
  const params = useParams();
  const reviewId = Number(params.id);
  const [data, setData] = useState<ReviewData | null>(null);
  const [parsedDescription, setParsedDescription] = useState<{ [key: string]: Schedule } | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);

  const handleGetReviewData = async () => {
    try {
      const response = await getReview(reviewId);
      setData(response);
      if (response.description) {
        setParsedDescription(JSON.parse(response.description));
      }
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to get review:', error);
    }
  };

  const handleGetComments = async () => {
    try {
      const response = await getComments(reviewId);
      setComments(response.comments);
      setTotalComments(response.total_comments);
      console.log('Comments:', response);
    } catch (error) {
      console.error('Failed to get comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return; // Do not submit empty comments
    try {
      const addCommentData: AddCommentData = {
        review_id: reviewId,
        reply_comment: commentText
      };
      await addComment(addCommentData);
      setCommentText(''); // Clear the input after submission
      handleGetComments(); // Fetch comments again to update the comments list
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  useEffect(() => {
    handleGetReviewData();
    handleGetComments();
  }, []);

  const renderDescription = () => {
    if (!parsedDescription) return null;

    return (
      <>
        {Object.keys(parsedDescription).map((key, index) => (
          <div>
            <div className="flex w-full flex-col gap-[12px] rounded-xl bg-gray-100 px-[32px] py-[24px] text-[16px]">
              <h3 className="text-[20px] font-bold">{key}</h3>
              <p className="text-gray-400">{parsedDescription[key].schedule}</p>
            </div>
            <div className="pt-10" dangerouslySetInnerHTML={{ __html: parsedDescription[key].description }} />
          </div>
        ))}
      </>
    );
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReviewApi(reviewId);
      console.log('Review deleted successfully');
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div>
      {data?.representative_img_url && (
        <img src={data.representative_img_url} alt="profile" className="h-[370px] w-full object-cover pb-[20px]" />
      )}
      <div className="flex flex-col px-[20px] pt-[20px] md:px-[30px] xl:px-[280px]">
        <div className="flex flex-row justify-between">
          <div className="w-full pb-[20px] text-[32px] font-bold">{data?.title}</div>
          <button type="button" onClick={handleDeleteReview} className="text-red-500">
            Delete
          </button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex w-full flex-row gap-[20px] border-b-2 pb-[20px]">
            <img
              src={data?.profile_img_url || defaultProfile.src}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div>{data?.nickname}</div>
              <div>{data?.created_at}</div>
            </div>
          </div>
        </div>
        <div className="mb-[60px] flex flex-col gap-10 border-b-2 pb-[60px] pt-[40px]">{renderDescription()}</div>
        <div className="flex flex-col gap-10 pb-[100px]">
          <div className="text-[32px] font-bold">
            댓글 <span className="text-blue-500">{totalComments}</span>
          </div>
          <div className="flex w-full flex-row gap-2">
            <img
              src={data?.profile_img_url || defaultProfile.src}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />

            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
              className="w-full rounded border p-2"
            />
            <button type="button" onClick={handleAddComment} className="text-white rounded bg-blue-500 p-2 text-[16px]">
              입력
            </button>
          </div>

          {comments.map((comment) => (
            <div key={comment.comment_id} className="flex flex-row gap-4">
              <img
                src={comment.profile_img_url || defaultProfile.src}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <div>{comment.nickname}</div>
                <div>{comment.reply_comment}</div>
                <div className="text-sm text-gray-500">{comment.created_at}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
