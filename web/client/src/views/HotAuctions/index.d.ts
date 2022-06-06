type Nullable<T> = T | null;
interface CardEntity {
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  updateTransactionHash: Nullable<string>;
  createTimestamp: string;
  updateTimestamp: Nullable<string>;
  id: string;
  nftContractId: string;
  ownerId: string;
  tokenId: string;
  approvalId: string;
  title: string;
  description: string;
  hashTags: [];
  startTime: string;
  endTime: string;
  startPrice: string;
  minIncrementPrice: string;
  cardId: string;
  lastBidId: string;
  lastBidEntityId: Nullable<string>;
  status: string;
  entityStatus: string;
  fee: number;
  number: string;
  categories: { id: string; name: string }[];
  card: {
    burned: boolean;
    id: string;
    media: string;
    cachedMedia: string;
    previewMedia: string;
    previewCachedMedia: string;
  };
  lastBid: { ownerId: string; price: string };
}