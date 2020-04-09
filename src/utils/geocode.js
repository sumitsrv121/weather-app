const request = require('request')

const getGeocode = (address,callback) => {
    const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VtaXRzcnYiLCJhIjoiY2s4bzYxaTgyMHZmYjNtbzJxYjkwYjloeiJ9.1N5Pcdhmov-rp3VPsLBXRQ&limit=1'
    request({uri, json: true},(error,{body} = {}) => {
        if(error){
            callback('Error occured while connecting to the network. Please try again!!!')
        }else if(body.features.length === 0){
            callback('Unable to find the geo-coordinates for the specified location')
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                placeName : body.features[0].place_name
            })
        }
    })
}

module.exports = getGeocode