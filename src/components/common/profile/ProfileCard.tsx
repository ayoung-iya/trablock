import React from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

interface ProfileCardProps {
  name: string;
  bio?: string;
  imageUrl?: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onImageChange: (newImageUrl: string) => void;
  onNameChange: (newName: string) => void;
  onBioChange: (newBio: string) => void;
  canEdit: boolean;
}

export default function ProfileCard({
  name,
  bio,
  imageUrl,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onImageChange,
  onNameChange,
  onBioChange,
  canEdit
}: ProfileCardProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const displayBio = bio || '한 줄 소개가 없습니다.';
  const displayImageUrl = imageUrl || '';

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md ${isDesktop ? 'w-96' : 'w-full'}`}>
      {isDesktop ? (
        <div className="flex flex-col items-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
            {displayImageUrl ? (
              <img src={displayImageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-500">👤</span>
            )}
            {canEdit && isEditing && (
              // eslint-disable-next-line max-len
              <div className="bg-white absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
                <span className="text-sm text-gray-500">📷</span>
                <input
                  type="file"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => e.target.files && onImageChange(URL.createObjectURL(e.target.files[0]))}
                />
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            {!isEditing ? (
              <>
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className={`text-gray-600 ${!bio ? 'italic' : ''}`}>{displayBio}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="mb-2 w-full rounded border px-2 py-1"
                  placeholder="닉네임을 입력하세요"
                />
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => onBioChange(e.target.value)}
                  className="w-full rounded border px-2 py-1"
                  placeholder="한 줄 소개를 입력하세요"
                />
              </>
            )}
          </div>
          {canEdit && (
            <div className="mt-4">
              {!isEditing ? (
                <button
                  type="button"
                  className="rounded border border-primary-01 px-4 py-1 text-primary-01"
                  onClick={onEdit}
                >
                  수정하기
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="rounded border border-gray-500 px-4 py-1 text-gray-500"
                    onClick={onCancel}
                  >
                    취소하기
                  </button>
                  <button type="button" className="text-white rounded bg-primary-01 px-4 py-1" onClick={onSave}>
                    완료하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-200"
            onClick={!isDesktop && canEdit ? onEdit : undefined}
          >
            {displayImageUrl ? (
              <img src={displayImageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-500">👤</span>
            )}
            {canEdit && isEditing && (
              // eslint-disable-next-line max-len
              <input
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={(e) => e.target.files && onImageChange(URL.createObjectURL(e.target.files[0]))}
              />
            )}
          </div>
          <div className="flex-1">
            {!isEditing ? (
              <>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className={`text-gray-600 ${!bio ? 'italic' : ''}`}>{displayBio}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="mb-2 w-full rounded border px-2 py-1"
                  placeholder="닉네임을 입력하세요"
                />
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => onBioChange(e.target.value)}
                  className="w-full rounded border px-2 py-1"
                  placeholder="한 줄 소개를 입력하세요"
                />
              </>
            )}
          </div>
          {canEdit && (
            <div className="ml-auto">
              {!isEditing ? (
                <button type="button" className="text-primary-01" onClick={onEdit}>
                  수정
                </button>
              ) : (
                <>
                  <button type="button" className="mr-2 text-primary-01" onClick={onSave}>
                    완료
                  </button>
                  <button type="button" className="text-gray-500" onClick={onCancel}>
                    취소
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
