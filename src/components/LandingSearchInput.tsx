'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import ImageBox from '@/components/common/ImageBox';
import searchIcon from '@/icons/search.svg?url';

export default function LandingSearchInput() {
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searchInput = form.search as HTMLInputElement;

    if (!searchInput.value) {
      return;
    }

    router.push(`/search?keyword=${searchInput.value}`);
  };

  return (
    <div className="flex-col-center mx-5 gap-5 py-16 md:gap-10 md:py-28">
      <p className="md:font-title-1 text-2xl font-bold leading-[125%]">여행을 계획하고 계신가요?</p>
      <form
        onSubmit={handleSubmit}
        // eslint-disable-next-line max-len
        className="flex-row-center h-12 w-full max-w-[746px] rounded-[5px] px-4 pb-[10px] pt-[9px] shadow-[0_0_8px_0_rgba(0,0,0,0.1)] md:h-14 md:px-5 md:py-[14px] lg:shadow-[0_0_8px_0_rgba(0,0,0,0.15)]"
      >
        <input
          type="text"
          id="search"
          className="font-body-2 w-full outline-none md:text-xl md:leading-[140%]"
          placeholder="여행 계획을 검색해보세요!"
        />
        <button type="submit">
          <ImageBox src={searchIcon} alt="검색하기" className="size-[18px] md:size-6" width={24} height={24} />
        </button>
      </form>
    </div>
  );
}
