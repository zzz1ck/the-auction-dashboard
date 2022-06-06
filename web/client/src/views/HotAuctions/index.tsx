// @ts-ignore
import NearSymbol from 'assets/symbol_near.svg';
import usePriceFormat from 'hooks/usePriceFormat';

// @todo: collect data from explorer instead of the-auction.io api
export default function HotAuctions({ auctions }: { auctions: [] }): JSX.Element {
  return (
    <>
      <h1 tw="w-full text-center text-2xl leading-10 tracking-widest border-b border-b-2 mb-2">
        🔥 Hot Auctions 🔥
      </h1>
      <div tw="grid grid-cols-2 md:grid-cols-5 select-none">
        {auctions
          .sort((x: CardEntity, y: CardEntity) => Number(y.lastBidId ?? 0) - Number(x.lastBidId ?? 0))
          .map((entity: CardEntity) => (
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
                href={`https://the-auction.io/nft/${entity.cardId}?from=zz1ck.near`}
              />
              <div tw="flex flex-col w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 justify-center items-center text-sm rounded-b-xl p-1">
                <p tw="truncate max-w-[90%]">{entity.lastBid.ownerId}</p>
                <p tw="flex flex-row">
                  {usePriceFormat(entity.lastBid.price)} <NearSymbol tw="w-3 ml-0.5 light:invert" />
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}