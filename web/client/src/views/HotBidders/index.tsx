// import { get } from 'lodash';
import { Fragment, useMemo } from 'react';
// @ts-ignore
import NearSymbol from 'assets/symbol_near.svg';
import { usePriceFormat, useRandomAvatar } from 'hooks';
// import { useQuery } from 'react-query';
// import { fetchUserAvatar } from 'helpers/api';

export default function HotBidders({ bidders }: { bidders: Auction.Actor[] }): JSX.Element {
  // const bidsCountByAmount = useMemo(
  //   () =>
  //     bidders.reduce((bidders: any, { deposit, signer_account_id }) => {
  //       if (
  //         (!get(bidders, signer_account_id) ||
  //           Number(deposit) > Number(get(bidders, signer_account_id).deposit))
  //       ) {
  //         return {
  //           ...bidders,
  //           [signer_account_id]: {
  //             signer_account_id,
  //             deposit,
  //           },
  //         };
  //       }
  //       return bidders;
  //     }, {}),
  //   [bidders]
  // );

  // const { data: topAmountBidderAvatarData } = useQuery(
  //   'topAmountBidderAvatarData',
  //   async () => await fetchUserAvatar(signer_account_id)
  // );

  const bidsCountByAmount: { [key: string]: Auction.Bid } = useMemo(
    () =>
      bidders.reduce(
        (biddersWithBids: { [key: string]: Auction.Bid }, { listings }: Auction.Actor) => {
          listings.forEach(({ bids = [] }: { bids: Auction.Bid[] }) =>
            bids.forEach(({ id, ownerId, price }: Auction.Bid) => {
              if (
                !biddersWithBids.hasOwnProperty(ownerId) ||
                Number(price) > Number(biddersWithBids[ownerId].price)
              ) {
                biddersWithBids = {
                  ...biddersWithBids,
                  [ownerId]: {
                    id,
                    ownerId,
                    price,
                  },
                };
              }
            })
          );
          return biddersWithBids;
        },
        {}
      ),
    [bidders]
  );

  const hotBiddersIds = useMemo(
    () =>
      Object.keys(bidsCountByAmount)
        .sort(
          (x: string, y: string) =>
            Number(bidsCountByAmount[y].price) - Number(bidsCountByAmount[x].price)
        )
        .slice(0, 10),
    [bidsCountByAmount]
  );

  const defaultAvatar = useRandomAvatar(hotBiddersIds[0]);

  const { ownerId, price } = bidsCountByAmount[hotBiddersIds[0]] ?? {};

  const hopBidderAvatar =
    bidders.find(({ walletId }: Auction.Actor) => walletId === hotBiddersIds[0])?.avatarUrl ??
    defaultAvatar;

  return (
    <Fragment>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🥇 Amount Bidder
      </h1>
      <div tw="flex flex-col items-center">
        <div tw="w-12 h-12 rounded-full overflow-hidden mr-2">
          <img src={hopBidderAvatar} />
        </div>
        <h1 tw="text-xl flex flex-row">
          {ownerId} with {usePriceFormat(price)}{' '}
          <NearSymbol tw="w-3.5 ml-0.5 relative top-px dark:invert" />
        </h1>
      </div>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 my-2">
        Hot Amount Bidders
      </h1>
      {hotBiddersIds.slice(1).map((signer, index) => (
        <div tw="w-full flex flex-row" key={signer}>
          <div tw="flex-grow-0 min-w-[12%]">{index + 2}</div>
          <div tw="flex-grow truncate">{signer}</div>
          <div tw="flex-grow-0 relative">
            <span tw="pr-3.5">{usePriceFormat(bidsCountByAmount[signer].price)}</span>
            <NearSymbol tw="inline-flex w-3 ml-0.5 absolute bottom-1.5 right-0 dark:invert" />
          </div>
        </div>
      ))}
    </Fragment>
  );
}
