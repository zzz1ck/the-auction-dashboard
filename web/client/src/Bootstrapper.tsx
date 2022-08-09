import { get } from 'lodash';
import TopBidders from 'views/TopBidders';
import HotAuctions from 'views/HotAuctions';
import HotBidders from 'views/HotBidders';
import ThemeToggler from 'components/ThemeToggler';
import { useQueries } from 'react-query';
import { fetchBiddersByContract, fetchHotAuctions } from 'helpers/api';
// @ts-ignore
import AuctionSymbol from 'assets/symbol_light.svg';

export default function Bootstrapper(): JSX.Element {
  const results = useQueries([
    { queryKey: 'contractBidders', queryFn: fetchBiddersByContract },
    { queryKey: 'hotAuctions', queryFn: fetchHotAuctions },
  ]);

  if (results.some(({ status }) => status === 'loading')) {
    return (
      <div tw="flex absolute top-0 bottom-0 text-center w-full justify-center items-center scale-[0.1]">
        <AuctionSymbol tw="animate-ping light:invert" />
      </div>
    );
  }

  if (results.some(({ error }) => !!error)) {
    return (
      <div tw="absolute top-1/2 text-center w-full">
        <p tw="text-red-600">An error has occurred!</p>
        <p tw="text-xs text-gray-600 dark:text-gray-200">
          It's happening time to time cuz app works with public postgres from{' '}
          <a
            href="https://github.com/near/near-indexer-for-explorer"
            target="_blank"
            rel="noreferrer noopener"
            tw="underline hover:no-underline"
          >
            near-indexer
          </a>
          ...
        </p>
      </div>
    );
  }

  return (
    <>
      <div tw="max-w-screen-2xl m-auto md:grid md:grid-cols-5">
        <div tw="flex flex-col items-center mb-10 md:mb-0">
          <TopBidders bidders={get(results[0], 'data', [])} />
        </div>
        <div tw="relative col-span-3 mb-10 md:mb-0">
          <HotAuctions auctions={get(results[1], 'data.data', [])} />
        </div>
        <div tw="flex flex-col items-center mb-10 md:mb-0">
          <HotBidders bidders={get(results[0], 'data', [])} />
        </div>
      </div>
      <div tw="w-full text-center text-xs md:fixed bottom-0 left-0 p-4">
        Powered by{' '}
        <a href="mailto:zz1ck@pm.me" tw="border-b hover:border-b-0">
          @zz1ck
        </a>
        <ThemeToggler />
      </div>
    </>
  );
}
