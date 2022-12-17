import { useInfiniteQuery } from 'react-query';
import { fetchActorsWithSoldNFT } from 'helpers/api';
import { DEFAULT_PAGE_LIMIT } from 'helpers/constants';

export default function useFetchActors() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['actors'], fetchActorsWithSoldNFT, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: Auction.ActorsResponse) => {
      if (lastPage.page < lastPage.pageCount) {
        return DEFAULT_PAGE_LIMIT * lastPage.page;
      }
      return undefined;
    },
  });

  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
}
