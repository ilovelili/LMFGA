"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var kyber_mainnet_json_1 = __importDefault(require("./kyber-mainnet.json"));
var uniswap_mainnet_json_1 = __importDefault(require("./uniswap-mainnet.json"));
var dydx_mainnet_json_1 = __importDefault(require("./dydx-mainnet.json"));
var tokens_mainnet_json_1 = __importDefault(require("./tokens-mainnet.json"));
var makerdao_mainnet_json_1 = __importDefault(require("./makerdao-mainnet.json"));
var mainnet = {
    kyber: kyber_mainnet_json_1.default,
    uniswap: uniswap_mainnet_json_1.default,
    dydx: dydx_mainnet_json_1.default,
    tokens: tokens_mainnet_json_1.default,
    makerdao: makerdao_mainnet_json_1.default,
};
exports.default = mainnet;
