interface pageInfo{
    resultsPerPage: number,
    totalResults: number
}

interface channelIdContentDetails{
    relatedPlaylists: {
        uploads: string,
        likes: string
    }
}

interface channelIdItems{
    etag: string,
    id: string,
    kind: string,
    contentDetails: channelIdContentDetails
}

export interface IChannelId{
    kind: string,
    etag: string,
    pageInfo: pageInfo,
    items: channelIdItems[]
}

interface channelThumbnails{
    url: string,
    width: number,
    height: number
}

interface thumbnails{
    default: channelThumbnails,
    high: channelThumbnails,
    maxres: channelThumbnails,
    medium: channelThumbnails,
    standard: channelThumbnails,
}

interface youtubeDataSnippet{
    categoryId: string,
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    localized: {
        title: string,
        description: string
    },
    publishedAt: Date,
    thumbnails: thumbnails,
    title: string,
    tags?: string[]
}

interface statistics{
    commentCount: string,
    dislikeCount: string,
    favoriteCount: string,
    likeCount: string,
    viewCount: string
}

interface youtubeDataItems{
    contentDetails: {
        caption: string,
        contentRating: {},
        definition: string,
        dimension: string,
        duration: string,
        hasCustomThumbnail: boolean,
        licensedContent: boolean,
        projection: string
    }
    kind: string,
    etag: string,
    id: string,
    snippet: youtubeDataSnippet,
    statistics: statistics
}

export interface YoutubeData{
    etag: string,
    items: youtubeDataItems[],
    kind: string,
    pageInfo: pageInfo
}

type UploadThingData = {
    appUrl: string,
    customId?: null | undefined | "",
    key: string,
    lastModified: Date,
    name: string,
    serverData: {
        uploadedBy: string
    },
    size: number,
    type: string,
    url: string
}

export type TUploadThingData = UploadThingData[]