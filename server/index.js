require('node-jsx').install();
var path = require('path');
import pkg from '../package.json';
import express from 'express';
import util from 'util';
import closestTrainStations from './closest-train-stations';
import crawlTrains from './crawl-trains';

import React from 'react';
import DefaultPage from './default-page';


let app        = express(),
    jsPath     = process.env.NODE_ENV === 'production' ? util.format('js/index.%s.js', pkg.version) : '//localhost:8080/build/index.js',
    stylePath  = process.env.NODE_ENV === 'production' ? util.format('styles/style.bundle.%s.css', pkg.version) : '',
    commonPath = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080/build/common.js',
    port       = process.env.NODE_ENV === 'production' ?  process.env.PORT : 3000;

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
app.use(express.static(path.join(__dirname, 'assets')));

app.route('/api/trains').get((req, res) => {
    let closestTrains = closestTrainStations.search(req.query.latitude, req.query.longitude);
    crawlTrains.getTrainsData(closestTrains, (trainsData) => {
        if (trainsData.code === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestTrains      : closestTrains
                },
                code   : 0,
                message: 'search trains ok!'
            });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'text/plain');
            res.json({
                data   : {
                    trainsTimetableData: trainsData,
                    closestTrains      : closestTrains
                },
                code   : -1,
                message: 'search trains error!'
            });
        }
    });
});
 // app.listen(port, () => {
 //    console.log('Listening on ' + port);
 // } );

/* Start the server */
var server = app.listen(port, '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
  console.log('Press Ctrl+C to quit.');
});
