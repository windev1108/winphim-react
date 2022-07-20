const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '7972e9a71a1dc065165d7db9acbf0e99',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;