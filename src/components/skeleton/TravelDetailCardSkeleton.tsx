/* eslint-disable max-len */
export default function TravelDetailCardSkeleton() {
  return (
    <li className="w-[320px] min-w-[285px] flex-grow animate-pulse overflow-hidden rounded-lg shadow-card md:w-full lg:w-[590px]">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="relative min-h-[180px] min-w-[285px] bg-gray-02" />

        <div className="w-full xl:flex xl:flex-col xl:justify-between">
          <div className="flex flex-col gap-2 p-3 md:p-4">
            <div className="h-5 w-3/4 bg-gray-02" />
            <div className="flex flex-col gap-1">
              <div className="h-[18px] w-2/4 bg-gray-02" />
              <div className="h-[18px] w-2/4 bg-gray-02" />
            </div>
            <div className="h-6 w-full bg-gray-02" />
          </div>

          <div className="flex-row-center border-t border-gray-03 py-[10px] pl-3 pr-4 md:py-[14px] md:pl-4 md:pr-[18px]">
            <div className="flex-row-center gap-2">
              <div className="size-8 rounded-full bg-gray-02" />
              <span className="h-5 w-28 bg-gray-02" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
