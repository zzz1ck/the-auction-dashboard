declare namespace Auction {
  interface Actor {
    createdAt: string;
    walletId: string;
    avatarUrl: string | null;
    listings: {
      id: string;
      nftContractId: string;
      tokenId: string;
      nftContractId: string;
      bids: {
        id: string;
        ownerId: string;
        price: string;
      }[];
    }[];
  }

  type ActorsResponse = {
    data: ActorEntity[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
  };

  interface ListingCard {
    id: string;
    cardId: string;
    startPrice: string;
    lastBid: { ownerId: string; price: string };
    card: {
      burned: boolean;
      id: string;
      media: string;
      cachedMedia: string;
      previewMedia: string;
      previewCachedMedia: string;
    };
  }

  interface Bid {
    id: string;
    ownerId: string;
    price: string;
  }
}