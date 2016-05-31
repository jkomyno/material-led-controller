/**
 * The only purpose of this file is to inject
 * the plugin needed for onTouchTap
 */

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
render(<Main />, document.getElementById('app'));
