import stationData from './station-data';

let closestStations =  {
    search(lat, long) {
        let lowest = Number.POSITIVE_INFINITY,
            tmp,
            targetStation;
        let getDistance = this.getDistanceCurry(lat, long);
        stationData.stations.forEach((item) => {
           tmp = getDistance(item.lat, item.long);
           if (tmp < lowest) {
                lowest = tmp;
                item.dist = tmp;
                targetStation = item;
           }
        });
        return {targetStation};
        //var minX = Math.min.apply(Math, stations.map(function(val) { return val.dist; }));
    },
    rad(d) {
        return d * Math.PI / 180.0;
    },
    getDistanceCurry(lat, lng) {
        let radLat1 = this.rad(lat),
            radLan1 = this.rad(lng),
            cos1    = Math.cos(radLat1);
        return (nextLat, nextLng) => {
            let radLat2 = this.rad(nextLat),
                radLan2 = this.rad(nextLng);
            let a = radLat1 - radLat2,
                b = radLan1 - radLan2;
            let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + cos1 * Math.cos(radLat2) * Math.pow(Math.sin( b / 2), 2)));
            s = s * 6378.137;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000;
            return s;
        };
    }
};

export default closestStations;
