export default {
  video : {
    limit: 10
  },
  google: {
    apiKey: 'AIzaSyAeD194OlWhlVT6ksW-lRw7HdQpH-LID8A',
    entry: 'https://www.googleapis.com/youtube/v3/',
  },
  vimeo: {
    apiKey: '817fdf671f86de107f8f718d0a165184',
    entry: 'https://api.vimeo.com/'
  },
  dailymotion: {
    apiKey: 'c875afbe22070bb8abe4',
    entry: 'https://api.dailymotion.com/',
    searchFields: [
      'id',
      'title',
      'url',
      'description',
      'taken_time',
      'duration',
      'owner.screenname',
      'owner.cover_100_url',
      'thumbnail_120_url',
      'thumbnail_480_url',
      'thumbnail_url'
    ]
    
  }
}
