import { useMemo } from 'react';
import { get } from 'lodash';
import { useQuery } from 'react-query';
import { fetchUserAvatar } from 'helpers/api';

export default function TopBidders({ bidders }: { bidders: [] }): JSX.Element {
  const bidsCountBySigner = useMemo(
    () =>
      bidders.reduce(
        (bidders: {}, { signer_account_id }) => ({
          ...bidders,
          [signer_account_id]: get(bidders, signer_account_id, 0) + 1,
        }),
        {}
      ),
    [bidders]
  );

  const topBidders = useMemo(
    () =>
      Object.keys(bidsCountBySigner)
        .sort((x, y) => get(bidsCountBySigner, y, 0) - get(bidsCountBySigner, x, 0))
        .slice(0, 10),
    [bidsCountBySigner]
  );

  const { data: topBidderData } = useQuery(
    'topBidderData',
    async () => await fetchUserAvatar(topBidders[0])
  );
  
  return (
    <>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🥇 Bidder
      </h1>
      <div tw="flex flex-col items-center">
        <div tw="w-12 h-12 rounded-full overflow-hidden mb-1">
          <img src={topBidderData?.avatarUrl} />
        </div>
        <h1 tw="text-xl flex items-center">
          {topBidders[0]} with {get(bidsCountBySigner, topBidders[0], '')} bids placed
        </h1>
      </div>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 my-2">
        Top Bidders
      </h1>
      {topBidders.slice(1).map((bidder, index) => (
        <div tw="w-full flex flex-row" key={bidder}>
          <div tw="flex-grow-0 min-w-[12%]">{index + 2}</div>
          <div tw="flex-grow truncate">{bidder}</div>
          <div tw="flex-grow-0">{get(bidsCountBySigner, bidder, '')}</div>
        </div>
      ))}
    </>
  );
}
