/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */

'use client';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import useGetProfile from '@/apis/useProfileService/useGetProfile';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/Dropdown';
import { comment as addComment, deleteComment, editComment, getComments } from '@/components/textEditor/api/commentApi';
import { deleteReview as deleteReviewApi, getReview } from '@/components/textEditor/api/reviewApi';
import KebabSvg from '@/icons/kebab.svg';
import ProfileDefault from '@/icons/profile-default.svg?url';
import useDropdownEdit from '@/libs/hooks/useDropdownEdit';
import useResizeSize from '@/libs/hooks/useResizeSize';

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
  isEditing?: boolean; // Indicates if the comment is in edit mode
  editedText?: string;
}

interface Schedule {
  schedule: string;
  description: string;
}

interface AddCommentData {
  review_id: number;
  reply_comment: string;
}

interface EditCommentData {
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
  isEditing?: boolean;
  editedText?: string;
}

type DropdownList = '비공개' | '삭제하기';
const DROPDOWN_LIST: DropdownList[] = ['비공개', '삭제하기'];

export default function Page() {
  const params = useParams();
  const reviewId = Number(params.id);
  const [data, setData] = useState<ReviewData | null>(null);
  const [parsedDescription, setParsedDescription] = useState<{ [key: string]: Schedule } | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const { ref, isDropdownOpened, handleDropdownToggle, handleDropdownClose } = useDropdownEdit('articleDetailDropdown');
  const { divRef, divHeight } = useResizeSize();
  const [myUserId, setMyUserId] = useState('');
  const [myProfileImg, setMyProfileImg] = useState<string | null>(null);

  const { data: myProfileData } = useGetProfile(myUserId);

  useEffect(() => {
    const token = Cookies.get('authorization-token');
    if (!token) return;
    const decode: { userId: string } = jwtDecode(token);
    const { userId } = decode;
    setMyUserId(userId);
  }, []);

  useEffect(() => {
    setMyProfileImg(myProfileData?.profile_img_url || null);
  }, [myProfileData]);

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
      console.log('response', response);
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
  const startEdit = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.comment_id === commentId) {
          return { ...comment, isEditing: true, editedText: comment.reply_comment };
        }
        return comment;
      })
    );
  };

  const handleEditChange = (text: string, commentId: number): void => {
    setComments(
      comments.map((comment) => {
        if (comment.comment_id === commentId) {
          return { ...comment, editedText: text };
        }
        return comment;
      })
    );
  };

  const cancelEdit = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.comment_id === commentId) {
          return { ...comment, isEditing: false };
        }
        return comment;
      })
    );
  };

  const submitEdit = async (commentId: number): Promise<void> => {
    const comment1 = comments.find((comment) => comment.comment_id === commentId);
    if (comment1 && comment1.editedText) {
      try {
        // Assuming editComment API is similar to addComment
        const editData: EditCommentData = { reply_comment: comment1.editedText };
        await editComment(editData, commentId);
        setComments(
          comments.map((comment) => {
            if (comment.comment_id === commentId) {
              return { ...comment, reply_comment: comment.editedText || '', isEditing: false, editedText: undefined };
            }
            return comment;
          })
        );
      } catch (error) {
        console.error('Failed to edit comment:', error);
      }
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
        {Object.keys(parsedDescription).map((key) => (
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
    } finally {
      // Redirect to the previous page
      window.history.back();
    }
  };

  const handleDropdownSelect = (selectedMenu: DropdownList) => {
    console.log(`Dropdown option selected: ${selectedMenu}`);
    if (selectedMenu === '비공개') {
      console.log('Toggle privacy');
    } else if (selectedMenu === '삭제하기') {
      handleDeleteReview();
      console.log('Initiate delete');
    }
    handleDropdownClose();
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      // Implement the delete comment API
      await deleteComment(commentId);
      console.log('Comment deleted successfully:', commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      handleGetComments();
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
          <div className="relative w-full p-5 md:p-7 xl:p-10 xl:pb-5">
            <div className=" flex-row-center absolute right-5 top-5 w-full justify-end gap-5 md:right-7 md:top-7 xl:right-10 xl:top-10">
              {data?.is_editable && (
                <div ref={divRef}>
                  <Button onClick={(e: any) => handleDropdownToggle(e)}>
                    <KebabSvg width={24} height={24} />
                  </Button>
                </div>
              )}
              {isDropdownOpened && data?.is_editable && (
                <Dropdown className="absolute right-0 z-10" style={{ top: `${divHeight + 30}px` }} ref={ref}>
                  <div className="flex flex-col">
                    {DROPDOWN_LIST.map((item, index) => (
                      <button
                        type="button"
                        className={`cursor-pointer p-2 hover:bg-gray-100 ${index === 1 && 'text-red-400'} `}
                        onClick={() => handleDropdownSelect(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="mx-10 hidden border-b border-gray-02 xl:block" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex w-full flex-row gap-[20px] border-b-2 pb-[20px]">
            <Image
              src={data?.profile_img_url || ProfileDefault}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
            />
            <div className="flex flex-col">
              <div className="text-[20px] font-bold">{data?.nickname}</div>
              <div className="text-gray-400">{data?.created_at}</div>
            </div>
          </div>
        </div>
        <div className="mb-[60px] flex flex-col gap-10 border-b-2 pb-[60px] pt-[40px]">{renderDescription()}</div>
        <div className="flex flex-col gap-10 pb-[100px]">
          <div className="text-[32px] font-bold">
            댓글 <span className="text-blue-500">{totalComments}</span>
          </div>
          <div className="relative flex w-full flex-row items-center gap-2">
            <Image
              src={myProfileImg || ProfileDefault}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
            />
            <div className="relative flex-grow">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글 남기기"
                className="w-full rounded border p-3 pr-10" // Right padding to avoid text underneath the button
              />
              <button
                type="button"
                onClick={handleAddComment}
                className="text-white absolute inset-y-0 right-0 rounded-r px-3 text-blue-500"
              >
                입력
              </button>
            </div>
          </div>

          {comments.map((comment: CommentData) => (
            <div key={comment.comment_id} className="flex flex-row gap-4">
              <div>
                <Image
                  src={comment.profile_img_url || ProfileDefault}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="aspect-square rounded-full object-cover"
                />
              </div>

              <div className="flex flex-row gap-[10px]">
                <div>{comment.nickname}</div>
                {comment.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={comment.editedText || ''}
                      onChange={(e) => handleEditChange(e.target.value, comment.comment_id)}
                      className="rounded border p-2"
                    />
                    <div className="flex flex-row gap-[20px]">
                      <button className="text-blue-500" type="button" onClick={() => submitEdit(comment.comment_id)}>
                        저장
                      </button>
                      <button className="text-red-500" type="button" onClick={() => cancelEdit(comment.comment_id)}>
                        취소
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    <div>{comment.reply_comment}</div>
                    <div className="flex flex-row gap-[12px]">
                      <div className="text-gray-400">{comment.created_at}</div>
                      <div className="text-gray-200">|</div>
                      {comment.is_editable && (
                        <div className="flex gap-[12px] ">
                          <button type="button" className="text-gray-400" onClick={() => startEdit(comment.comment_id)}>
                            수정
                          </button>
                          <div className="text-gray-200">|</div>
                          <button
                            type="button"
                            className="text-gray-400"
                            onClick={() => handleDeleteComment(comment.comment_id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
