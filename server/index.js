require('node-jsx').install();
import pkg from '../package.json';
import express from 'express';
import util from 'util';
import closestTrainStations from './closest-train-stations';
import crawlTrains from './crawl-trains';

import React from 'react';
import DefaultPage from './default-page';


let app        = express(),
    jsPath     = process.env.NODE_ENV === 'production' ? util.format('assets/js/index.%s.js', pkg.version) : '//localhost:8080/build/index.js',
    stylePath  = process.env.NODE_ENV === 'production' ? util.format('assets/styles/style.bundle.%s.css', pkg.version) : '',
    //commonPath = process.env.NODE_ENV === 'production' ? util.format('assets/js/common.%s.js', pkg.version) : '//localhost:8080/build/common.js';
    commonPath = '';

let renderPage = (common, entry, style) => {
    return React.renderToString(
                React.createElement(
                    DefaultPage,
                    {
                        jsPath    : entry,
                        stylePath : style,
                        commonPath: common
                    }
                )
            );
};

app.get('/', (req, res) => {
    res.end(renderPage(commonPath, jsPath, stylePath));
});

app.route('/api/trains').get((req, res) => {
    let closestTrains = closestTrainStations.search(req.query.latitude, req.query.longitude);
    crawlTrains.getTrainsData(closestTrains, (trainsData) => {
        if (trainsData.code === 0) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestTrains      : closestTrains
                },
                code   : 0,
                message: 'search trains ok!'
            });
        } else {
            res.writeHead(401, {'Content-Type': 'text/plain'});
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestTrains      : closestTrains
                },
                code   : 1,
                message: 'search trains error!'
            });
        }
    });
});

app.listen(3000, () => {
} );
