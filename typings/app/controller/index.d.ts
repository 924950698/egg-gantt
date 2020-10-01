// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGannt = require('../../../app/controller/gannt');
import ExportHome = require('../../../app/controller/home');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    gannt: ExportGannt;
    home: ExportHome;
    user: ExportUser;
  }
}
