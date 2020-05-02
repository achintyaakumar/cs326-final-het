'use strict';

import { Database } from './mongodb'
import { MyServer } from './server';

const theDatabase = new Database('manan');
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT || 8080);