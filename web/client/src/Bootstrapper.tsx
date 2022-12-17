import TopBidders from 'views/TopBidders';
import HotAuctions from 'views/HotAuctions';
import HotBidders from 'views/HotBidders';
import ThemeToggler from 'components/ThemeToggler';
import ErrorTemplate from 'components/ErrorTemplate';
import { useQuery } from 'react-query';
import { fetchMostBiddableNFTList } from 'helpers/api';
// @ts-ignore
import AuctionSymbol from 'assets/symbol_light.svg';
import { useFetchActors } from 'hooks';

export default function Bootstrapper(): JSX.Element {
  const actors = useFetchActors();

  const hotAuctions = useQuery(['auctions', 'hot'], fetchMostBiddableNFTList, {
    refetchOnWindowFocus: false,
    select: (response) => response.data,
  });

  if (actors.isFetching || actors.hasNextPage || hotAuctions.isFetching) {
    return (
      <div tw="flex absolute top-0 bottom-0 text-center w-full justify-center items-center scale-[0.1]">
        <AuctionSymbol tw="animate-ping light:invert" />
      </div>
    );
  }

  if (actors.error || hotAuctions.error || !actors.data || !actors.data.pages) {
    return <ErrorTemplate />;
  }

  const mergedActorsData = actors.data.pages.reduce(
    (acc: Auction.Actor[], group: Auction.ActorsResponse) => [...acc, ...group.data],
    []
  );

  return (
    <>
      <div tw="max-w-screen-2xl m-auto md:grid md:grid-cols-5">
        <div tw="flex flex-col items-center mb-10 md:mb-0">
          <TopBidders bidders={mergedActorsData} />
        </div>
        <div tw="relative col-span-3 mb-10 md:mb-0">
          <HotAuctions auctions={hotAuctions.data} />
        </div>
        <div tw="flex flex-col items-center mb-10 md:mb-0">
          <HotBidders bidders={mergedActorsData} />
        </div>
      </div>
      <div tw="w-full text-center text-xs md:fixed bottom-0 left-0 p-4">
        Powered by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          tw="border-b hover:border-b-0"
          href="https://web3.bio/zz1ck.near"
        >
          @zz1ck
        </a>
        <ThemeToggler />
      </div>
    </>
  );
}
