import { AUCTION_API_URL, NEAR_TO_FIAT_URL, DEFAULT_PAGE_LIMIT } from 'helpers/constants';

function prepareSearchParams(defaultParams: {}, arrayParams: Map<string, string[]>): string {
  const searchParams = new URLSearchParams(defaultParams);
  for (const [key, paramList] of arrayParams) {
    if (paramList?.length) {
      paramList.forEach((value, index) => searchParams.append(`${key}[${index}]`, value));
    }
  }
  return searchParams.toString();
};

// async function fetchAuctionListings(searchParams: string) {
//   return await fetch(`${AUCTION_API_URL}/listings?${searchParams}`).then((res) => res.json());
// };

// export const fetchNFTListings = (searchParams: string) =>
//   fetch(`${AUCTION_API_URL}/listings?${searchParams}`).then((res) => res.json());

export const doFetchAndJSON = (path: string) => {
  if (path) {
    return fetch(`${AUCTION_API_URL}${path}`).then((res) => res.json());
  }
  return new Error('Cannot download the data, there is no `path` provided.');
}

export const fetchMostBiddableNFTList = async () => {
  const searchParams = prepareSearchParams(
    { limit: '10', fields: ['title', 'cardId', 'lastBidId', 'startPrice'] },
    new Map([
      [
        'join',
        [
          'card||burned,media,cachedMedia,previewMedia,previewCachedMedia',
          'lastBid||ownerId,price',
        ],
      ],
      ['filter', ['status||$eq||InProgress', 'lastBidEntityId||$notnull']],
      ['sort', ['lastBidId,DESC']],
    ])
  );
  return await doFetchAndJSON(`/listings?${searchParams}`);
};

export const fetchActorsWithSoldNFT = async ({ pageParam = 0 }) => {
  const searchParams = prepareSearchParams(
    { limit: DEFAULT_PAGE_LIMIT, offset: pageParam, fields: ['walletId', 'avatarUrl'] },
    new Map([
      ['join', ['listings||bids,nftContractId,tokenId,lastBidId', 'listings.bids||price,ownerId']],
      ['filter', ['listings.lastBidEntityId||$notnull']],
    ])
  );
  return await doFetchAndJSON(`/account?${searchParams}`);
};

export const fetchUserAvatar = (account: string) =>
  fetch(`${AUCTION_API_URL}/account/details/${account}`).then((res) => res.json());

export const fetchNearFiat = () => fetch(NEAR_TO_FIAT_URL).then((res) => res.json());

// export const fetchTxByContract = () => fetch(`/api/v1/transactions`).then((res) => res.json());

// export const fetchBiddersByContract = () => fetch(`/api/v1/bidders`).then((res) => res.json());