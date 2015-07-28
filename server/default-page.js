import React from 'react';

class DefaultPage extends React.Component {

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>特搜時刻表</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                    <link href='http://fonts.googleapis.com/css?family=Roboto+Mono:400,300italic' rel='stylesheet' type='text/css' />
                </head>
                <body>
                    <div className="site-top">
                        <h1 className="site-top__title">特搜時刻表</h1>
                    </div>
                    <main id="content" className="content-wrapper" role="main"></main>
                    <script src="//localhost:8080/build/common.js"></script>
                    <script src={this.props.jsPath}></script>
                </body>
            </html>
        );
    }
}

DefaultPage.propTypes = {
    jsPath     : React.PropTypes.string.isRequired
};

export default DefaultPage;
