import lodash from 'lodash'


const DEBUG_TAG = 'APIService'
const prefixUrl = 'https://learninghp.azurewebsites.net/'

export default class APIService {
  /** @type {APIService} */
  static instance = new APIService()


  static getInstance() {
    if (APIService.instance === null) {
      APIService.instance = new APIService()
    }
    return APIService.instance
  }

  getSomePostAPI(params){
    const method = 'POST'
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then((response) => {
      console.log(DEBUG_TAG, 'response', response)
    }).catch((err) => {
      console.log(DEBUG_TAG, err)
    })
  }

  getSomeAPI(){
    const url = `URL`
    const method = 'GET'
    const rs = await fetch(url, {
      method,
    }).then((response) => {
      console.log(DEBUG_TAG, 'response', response)
    }).catch((err) => {
      console.log(DEBUG_TAG, err)
    })
  }
}