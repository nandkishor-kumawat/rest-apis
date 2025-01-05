"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
const toJSON = (text) => {
    const json = JSON.parse(text.replace('```json\n', '').replace('\n```', ''));
    return json;
};
exports.toJSON = toJSON;
//# sourceMappingURL=utils.js.map