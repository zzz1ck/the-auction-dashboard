// @ts-ignore
import NearSymbol from 'assets/symbol_near.svg';
import ErrorTemplate from 'components/ErrorTemplate';
import { AUCTION_HOSTNAME } from 'helpers/constants';
import { usePriceFormat } from 'hooks';

export default function HotAuctions({ auctions }: { auctions: Auction.ListingCard[] }): JSX.Element {
  return (
    <>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🔥 Hot Auctions 🔥
      </h1>
      {auctions.length ? (
        <div tw="grid grid-cols-2 md:grid-cols-5 select-none">
          {auctions.map((entity: Auction.ListingCard) => (
            <div key={entity.id} tw="flex flex-col w-full relative justify-center p-[5%] mb-[10%]">
              <a
                tw="block w-full h-0 pb-[100%] bg-center bg-no-repeat bg-cover rounded-t-xl"
                style={{
                  backgroundImage: `url(${
                    entity.card.previewCachedMedia ||
                    entity.card.previewMedia ||
                    entity.card.cachedMedia ||
                    entity.card.media
                  })`,
                }}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://${AUCTION_HOSTNAME}/nft/${entity.cardId}?from=zz1ck.near`}
              />
              <div tw="flex flex-col w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 justify-center items-center text-sm rounded-b-xl p-1">
                <p tw="truncate max-w-[90%]">{entity.lastBid?.ownerId || 'no bids yet'}</p>
                <p tw="flex flex-row">
                  {usePriceFormat(entity.lastBid?.price || entity.startPrice)}{' '}
                  <NearSymbol tw="w-3 ml-0.5 light:invert" />
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ErrorTemplate
          message="There are no traded NFT with a bid"
          description="No worries, please try again later and luck will be on your side 🍀"
        />
      )}
    </>
  );
}