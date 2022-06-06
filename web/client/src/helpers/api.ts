import { AUCTION_API_URL, NEAR_TO_FIAT_URL } from 'helpers/constants';

function prepareSearchParams(defaultParams: {}, params: Map<string, string[]>): string {
  const searchParams = new URLSearchParams(defaultParams);
  for (const [key, paramList] of params) {
    if (paramList?.length) {
      paramList.forEach((value, index) => searchParams.append(`${key}[${index}]`, value));
    }
  }
  return searchParams.toString();
};

export const fetchHotAuctions = async () => {
  const searchParams = prepareSearchParams(
    { limit: '10' },
    new Map([
      ['join', ['card', 'title', 'card.contract', 'lastBid']],
      ['filter', ['status||$eq||InProgress']],
      ['sort', ['lastBidId,DESC']],
    ])
  );
  const res = await fetch(`${AUCTION_API_URL}/listings?${searchParams}`);
  return await res.json();
};

export const fetchUserAvatar = (account: string) =>
  fetch(`${AUCTION_API_URL}/account/details/${account}`).then((res) => res.json());

export const fetchNearFiat = () => fetch(NEAR_TO_FIAT_URL).then((res) => res.json());

export const fetchTxByContract = () => fetch(`/api/v1/transactions`).then((res) => res.json());

export const fetchBiddersByContract = () => fetch(`/api/v1/bidders`).then((res) => res.json());