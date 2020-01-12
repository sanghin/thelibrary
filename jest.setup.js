import { setConfig } from 'next/config';
import config from './next.config';

// Make sure you can config values within tests.
setConfig(config.publicRuntimeConfig);
setConfig(config.assetPrefix);

jest.mock('Components/Header/Header');

// polyfill the Object.fromEntries for node environments
require('object.fromentries').shim();
