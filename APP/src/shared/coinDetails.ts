export interface CoinDetails {
    id: string
    name: string
    symbol: string
    links: {
        twitter_screen_name: string
        subreddit_url: string
        homepage: string
    }
    description: {
        en: string
    }
    image: {
        large: string
        small: string
    }
    market_data: {
        current_price: {
            usd: string
        }
        market_cap: {
            usd: string
        }
        high_24h: {
            usd: string
        }
        price_change_24h: number
        circulating_supply: string
        max_supply: string
    }
}