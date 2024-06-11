'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

// Dynamically import TextEditor with ssr: false
const TextEditor = dynamic(() => import('../../components/common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

function TestPage() {
  const [review, setReview] = useState<string>('');
  const [values, setValues] = useState<string>('');

  const handlePrint = () => {
    console.log('Review:', review);
    console.log('Editor Content:', values);
    alert(`Review: ${review}\nEditor Content: ${values}`); // You can replace this alert with a modal or custom notification if needed
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">1일차 리뷰</h1>
      <input
        type="text"
        className="mb-4 w-full rounded border border-gray-300 p-2"
        placeholder="Enter your review here"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="h-[400px] w-full">
        <TextEditor value={values} onChange={setValues} />
      </div>

      <button
        type="button" // Add the explicit type attribute
        onClick={handlePrint}
        className="text-white·mt-4·rounded·bg-blue-500·px-4·py-2 hover:bg-blue-600"
      >
        Print Review and Values
      </button>
    </div>
  );
}

export default TestPage;
