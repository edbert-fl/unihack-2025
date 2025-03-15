const { getJson } = require("serpapi");

const getNews = async (charity: string) => {
    const response = await getJson({
        engine: "google",
        api_key: process.env.SERP_API_KEY, // Get your API_KEY from https://serpapi.com/manage-api-key
        q: charity,
      });

    return response;
}

export default getNews;