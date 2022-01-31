var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// services/hello/SpacesTable/Create.ts
var Create_exports = {};
__export(Create_exports, {
  handler: () => handler
});
var import_aws_sdk = __toESM(require("aws-sdk"));

// services/Shared/Utils.ts
function generateRandomId() {
  return Math.random().toString(36).slice(2);
}
function getEventBody(event) {
  return typeof event.body == "object" ? event.body : JSON.parse(event.body);
}
function addCorsHeader(result) {
  result.headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  };
}

// services/Shared/InputValidator.ts
var MissingFieldError = class extends Error {
};
function validateAsSpaceEntry(arg) {
  if (!arg.name) {
    throw new MissingFieldError("Name value required");
  }
  if (!arg.location) {
    throw new MissingFieldError("Location value required");
  }
  if (!arg.spaceId) {
    throw new MissingFieldError("ID value required");
  }
}

// services/hello/SpacesTable/Create.ts
var TABLE_NAME = process.env.TABLE_NAME;
var dbClient = new import_aws_sdk.DynamoDB.DocumentClient();
async function handler(event, context) {
  const result = {
    statusCode: 200,
    body: "Hello from DyanamoDB"
  };
  addCorsHeader(result);
  try {
    const item = getEventBody(event);
    item.spaceId = generateRandomId();
    validateAsSpaceEntry(item);
    await dbClient.put({
      TableName: TABLE_NAME,
      Item: item
    }).promise();
    result.body = JSON.stringify({
      id: item.spaceId
    });
  } catch (error) {
    if (error instanceof MissingFieldError) {
      result.statusCode = 403;
    } else {
      result.statusCode = 500;
    }
    result.body = error.message;
  }
  return result;
}
module.exports = __toCommonJS(Create_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
