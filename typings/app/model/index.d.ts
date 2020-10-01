// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGannt = require('../../../app/model/gannt');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Gannt: ReturnType<typeof ExportGannt>;
    User: ReturnType<typeof ExportUser>;
  }
}
