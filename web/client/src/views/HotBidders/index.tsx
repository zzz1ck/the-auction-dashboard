import { get } from 'lodash';
import { Fragment, useMemo } from 'react';
// @ts-ignore
import NearSymbol from 'assets/symbol_near.svg';
import usePriceFormat from 'hooks/usePriceFormat';
import { useQuery } from 'react-query';
import { fetchUserAvatar } from 'helpers/api';

export default function HotBidders({ bidders }: { bidders: [] }): JSX.Element {
  const bidsByAmount = useMemo(
    () =>
      bidders.reduce((bidders: any, { deposit, signer_account_id }) => {
        if (
          (!get(bidders, signer_account_id) ||
            Number(deposit) > Number(get(bidders, signer_account_id).deposit))
        ) {
          return {
            ...bidders,
            [signer_account_id]: {
              signer_account_id,
              deposit,
            },
          };
        }
        return bidders;
      }, {}),
    [bidders]
  );

  const topBids = useMemo(
    () =>
      Object.keys(bidsByAmount)
        .sort((x: string, y: string) => bidsByAmount[y].deposit - bidsByAmount[x].deposit)
        .slice(0, 10),
    [bidsByAmount]
  );

  const { signer_account_id, deposit } = bidsByAmount[topBids[0]];

  const { data: topAmountBidderData } = useQuery(
    'topAmountBidderData',
    async () => await fetchUserAvatar(signer_account_id)
  );

  return (
    <>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🥇 Amount Bidder
      </h1>
      <div tw="flex flex-col items-center">
        <div tw="w-12 h-12 rounded-full overflow-hidden mr-2">
          <img src={topAmountBidderData?.avatarUrl} />
        </div>
        <h1 tw="text-xl flex flex-row">
          {signer_account_id} with {usePriceFormat(deposit)}{' '}
          <NearSymbol tw="w-3.5 ml-0.5 relative top-px dark:invert" />
        </h1>
      </div>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 my-2">
        Hot Amount Bidders
      </h1>
      {topBids.slice(1).map((signer, index) => (
        <div tw="w-full flex flex-row" key={signer}>
          <div tw="flex-grow-0 min-w-[12%]">{index + 2}</div>
          <div tw="flex-grow truncate">{signer}</div>
          <div tw="flex-grow-0 relative">
            <span tw="pr-3.5">{usePriceFormat(bidsByAmount[signer].deposit)}</span>
            <NearSymbol tw="inline-flex w-3 ml-0.5 absolute bottom-1.5 right-0 dark:invert" />
          </div>
        </div>
      ))}
    </>
  );
}
