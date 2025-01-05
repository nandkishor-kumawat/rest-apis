"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const config_1 = require("../config");
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: config_1.FIREBASE_PROJECT_ID,
            clientEmail: config_1.FIREBASE_CLIENT_EMAIL,
            privateKey: config_1.FIREBASE_PRIVATE_KEY === null || config_1.FIREBASE_PRIVATE_KEY === void 0 ? void 0 : config_1.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        storageBucket: config_1.FIREBASE_STORAGE_BUCKET,
    });
}
const storage = firebase_admin_1.default.storage();
const bucket = storage.bucket();
exports.bucket = bucket;
//# sourceMappingURL=firebase.js.map