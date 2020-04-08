import * as Constant from './constants';
export default class Location {

   static getAddressFromGoogle(callback) {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
             
                callback(position.coords.latitude, position.coords.longitude, true);
                this.getAddressToLatLong(place.placeID)
             
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    // static getCurrentLocation(callback) {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             callback(position.coords.latitude, position.coords.longitude, true);
    //         },
    //         (error) => callback(null, null, false),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    // }

    static getAddressToLatLong(id, callback) {
        fetch(`${Constant.GOOGLEMAPURL}?key=${Constant.GOOGLEKEY}&placeid=${encodeURI(id)}`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                
                if (!json.result || json.status !== 'OK') {
                    callback(null, false);
                } else {
                    const res = json.result;
                    const addres =  format(res)
                    //if (res[0].position.lat && res[0].position.lng) {
                        callback(addres, true);
                    // } else {
                    //     callback(null, false);
                    // }
                }
            }
            )
            .catch(e => {
                //console.log("Error", JSON.stringify(e))
                callback(null, false);
            }
            );
    }
}

function format(raw) {
    const address = {
        position: {},
        formattedAddress: raw.formatted_address || '',
        feature: null,
        streetNumber: null,
        streetName: null,
        postalCode: null,
        locality: null,
        country: null,
        countryCode: null,
        adminArea: null,
        subAdminArea: null,
        subLocality: null,
    };

    if (raw.geometry && raw.geometry.location) {
        address.position = {
            lat: raw.geometry.location.lat,
            lng: raw.geometry.location.lng,
        }
    }

    raw.address_components.forEach(component => {
        if (component.types.indexOf('route') !== -1) {
            address.streetName = component.long_name;
        }
        else if (component.types.indexOf('street_number') !== -1) {
            address.streetNumber = component.long_name;
        }
        else if (component.types.indexOf('country') !== -1) {
            address.country = component.long_name;
            address.countryCode = component.short_name;
        }
        else if (component.types.indexOf('locality') !== -1) {
            address.locality = component.long_name;
        }
        else if (component.types.indexOf('postal_code') !== -1) {
            address.postalCode = component.long_name;
        }
        else if (component.types.indexOf('administrative_area_level_1') !== -1) {
            address.adminArea = component.long_name;
        }
        else if (component.types.indexOf('administrative_area_level_2') !== -1) {
            address.subAdminArea = component.long_name;
        }
        else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1) {
            address.subLocality = component.long_name;
        }
        else if (component.types.indexOf('point_of_interest') !== -1 || component.types.indexOf('colloquial_area') !== -1) {
            address.feature = component.long_name;
        }
    });

    return address;
}
