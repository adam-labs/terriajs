'use strict';

/*global require,expect*/
// import knockout from 'terriajs-cesium/Source/ThirdParty/knockout';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Entity from 'terriajs-cesium/Source/DataSources/Entity';

import FeatureInfoPanel from 'terriajs/lib/ReactViews/FeatureInfo/FeatureInfoPanel';
import Loader from 'terriajs/lib/ReactViews/Loader';
import PickedFeatures from 'terriajs/lib/Map/PickedFeatures';
import runLater from 'terriajs/lib/Core/runLater';
import Terria from 'terriajs/lib/Models/Terria';
import ViewState from 'terriajs/lib/ReactViewModels/ViewState';

var separator = ',';
if (typeof Intl === 'object' && typeof Intl.NumberFormat === 'function') {
    separator = (Intl.NumberFormat().format(1000)[1]);
}

function getShallowRenderedOutput(jsx) {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(jsx);
    return renderer.getRenderOutput();
}

describe('FeatureInfoPanel-jsx', function() {

    let terria;
    // let feature;
    let viewState;

    beforeEach(function() {
        terria = new Terria({
            baseUrl: './'
        });
        viewState = new ViewState();
        // const properties = {
        //     'Foo': 'bar',
        //     'moo': 'd"e"r,p'
        // };
        // feature = new Entity({
        //     name: 'Bar',
        //     properties: properties
        // });
    });

    it('does not have visible class when isVisible false', function() {
        const panel = <FeatureInfoPanel terria={terria} viewState={viewState} isVisible={false}/>;
        const result = getShallowRenderedOutput(panel);
        expect(result.props.className).not.toContain('visible');
    });

    it('has visible class when isVisible true', function() {
        const panel = <FeatureInfoPanel terria={terria} viewState={viewState} isVisible={true}/>;
        const result = getShallowRenderedOutput(panel);
        expect(result.props.className).toContain('visible');
    });

    it('displays a message while asychronously obtaining feature information', function() {
        var pickedFeatures = new PickedFeatures();
        pickedFeatures.allFeaturesAvailablePromise = runLater(function() {});
        terria.pickedFeatures = pickedFeatures;
        const panel = <FeatureInfoPanel terria={terria} viewState={viewState} isVisible={true}/>;
        const result = getShallowRenderedOutput(panel);
        // Looks for Loader in this location: <div> <div></div> <ul> <li> <Loader> </li> </ul> </div>
        expect(result.props.children[1].props.children.props.children.type === Loader).toBe(true);
    });

});

// function treeContainsText(tree, s) {
//     if (tree.props.children === undefined) {
//         return false;
//     }
//     if (tree.props.children.props !== undefined) {
//         // A single child is sometimes present in children without being in an array.
//         return treeContainsText(tree.props.children, s)
//     }
//     if (!Array.isArray(tree.props.children)) {
//         // Text is presented as a child, with no object around it.
//         console.log(tree.props.children);
//         return tree.props.children.indexOf(s) >= 0;
//     }
//     for (var i = 0; i < tree.props.children.length; ++i) {
//         if (treeContainsText(tree.props.children[i], s)) {
//             return true;
//         }
//     }

//     return false;
// }
