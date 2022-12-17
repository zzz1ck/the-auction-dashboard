import { useMemo } from 'react';
import { get } from 'lodash';
import { useRandomAvatar } from 'hooks';
// import { useQuery } from 'react-query';
// import { fetchUserAvatar } from 'helpers/api';

export default function TopBidders({ bidders }: { bidders: Auction.Actor[] }): JSX.Element {
  const bidsCountBySigner: { [key: string]: Auction.Bid } = useMemo(
    () =>
      bidders.reduce((biddersWithBids: {}, { listings }: Auction.Actor) => {
        listings.forEach(({ bids = [] }: { bids: Auction.Bid[] }) =>
          bids.forEach(
            ({ ownerId }: Auction.Bid) =>
              (biddersWithBids = {
                ...biddersWithBids,
                [ownerId]: get(biddersWithBids, ownerId, 0) + 1,
              })
          )
        );
        return biddersWithBids;
      }, {}),
    [bidders]
  );

  const topBiddersIds = useMemo(
    () =>
      Object.keys(bidsCountBySigner)
        .sort((x, y) => Number(bidsCountBySigner[y]) - Number(bidsCountBySigner[x]))
        .slice(0, 10),
    [bidsCountBySigner]
  );

  const defaultAvatar = useRandomAvatar(topBiddersIds[0]);

  const topBidderAvatar = useMemo(
    () =>
      bidders.find(({ walletId }: Auction.Actor) => walletId === topBiddersIds[0])?.avatarUrl ??
      defaultAvatar,
    [topBiddersIds[0]]
  );

  // console.log('[🍀]', topBidderAvatar);

  // const bidsCountBySigner = useMemo(
  //   () =>
  //     bidders.reduce(
  //       (bidders: {}, { signer_account_id }) => ({
  //         ...bidders,
  //         [signer_account_id]: get(bidders, signer_account_id, 0) + 1,
  //       }),
  //       {}
  //     ),
  //   [bidders]
  // );

  // const { data: topBidderAvatarData } = useQuery(
  //   'topBidderAvatarData',
  //   async () => await fetchUserAvatar(topBidders[0])
  // );

  return (
    <>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🥇 Bidder
      </h1>
      <div tw="flex flex-col items-center">
        <div tw="w-12 h-12 rounded-full overflow-hidden mb-1">
          {/* <img src={topBidderAvatarData?.avatarUrl} /> */}
          <img src={topBidderAvatar} />
        </div>
        <h1 tw="text-xl flex items-center text-center">
          <>
            {topBiddersIds[0]} with {bidsCountBySigner[topBiddersIds[0]] ?? ''} bids placed
          </>
        </h1>
      </div>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 my-2">
        Top Bidders
      </h1>
      {topBiddersIds.slice(1).map((bidder, index) => (
        <div tw="w-full flex flex-row" key={bidder}>
          <div tw="flex-grow-0 min-w-[12%]">{index + 2}</div>
          <div tw="flex-grow truncate">{bidder}</div>
          <div tw="flex-grow-0">
            <>{bidsCountBySigner[bidder]}</>
          </div>
        </div>
      ))}
    </>
  );
}
