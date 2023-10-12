function maxProfit(prices: number[]): number {
  let sellPrice: number | undefined = undefined
  let buyPrice: number | undefined = undefined
  let maxProfit = 0

  for(let i=prices.length-1;i>=0;i--){
      if(sellPrice === undefined || sellPrice < prices[i]){
          sellPrice=prices[i]
          buyPrice=prices[i]
      }
      if(buyPrice === undefined || buyPrice > prices[i]){
          buyPrice=prices[i]
          maxProfit=Math.max(maxProfit, sellPrice-buyPrice)
      }
  }

  return maxProfit
};