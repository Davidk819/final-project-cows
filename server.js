/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@trpc/server/adapters/standalone");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sequelizeConnection = exports.sequelize = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(4);
// import dotenv from "dotenv";
// dotenv.config();
// const sequelize = new Sequelize('postgres://meathouse_user:wfPbQm738hIoFIdFDuGhv0T9VOVbv2pY@dpg-cm41leen7f5s73bsb3d0-a.oregon-postgres.render.com/meathouse') 
exports.sequelize = new sequelize_1.Sequelize('meathouse', 'meathouse_user', process.env.DB_PASSWORD, {
    host: 'dpg-cm41leen7f5s73bsb3d0-a.oregon-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
const sequelizeConnection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.sequelizeConnection = sequelizeConnection;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appRouter = void 0;
const tslib_1 = __webpack_require__(1);
const dall_1 = __webpack_require__(6);
const trpc_1 = __webpack_require__(10);
const zod_1 = __webpack_require__(12);
exports.appRouter = (0, trpc_1.router)({
    addCow: trpc_1.publicProcedure
        .input(zod_1.z.object({ status: zod_1.z.string(), cow_num: zod_1.z.number() }))
        .mutation(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { status, cow_num } = input;
        const res = yield (0, dall_1.insertNewCow)(status, cow_num);
        if (res) {
            return res;
        }
        else {
            return { res_status: 401, massege: 'Error' };
        }
    })),
    getAll: trpc_1.publicProcedure.query(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, dall_1.getAll)();
        return data.map((cow) => (Object.assign({}, cow.dataValues)));
    })),
    getKosherNumbers: trpc_1.publicProcedure.query(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, dall_1.getKosherNumbersFromDB)();
        return data.map((cow) => cow.dataValues.cow_num);
    })),
    getAllByStage: trpc_1.publicProcedure.input(zod_1.z.number()).query(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const stage = input;
        const data = yield (0, dall_1.getNumbersByStageFromDB)(stage);
        return data;
    })),
    setTaref: trpc_1.publicProcedure
        .input(zod_1.z.object({ stage: zod_1.z.number(), cow_num: zod_1.z.number() }))
        .mutation(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { stage, cow_num } = input;
        const data = yield (0, dall_1.setTarefInDB)(stage, cow_num);
        return data;
    })),
    setFinalStatus: trpc_1.publicProcedure
        .input(zod_1.z.object({ status: zod_1.z.string(), cow_num: zod_1.z.number() }))
        .mutation(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { status, cow_num } = input;
        const data = yield (0, dall_1.setFinalStatusInDB)(status, cow_num);
        return data;
    })),
    moveStage: trpc_1.publicProcedure
        .input(zod_1.z.object({ stage: zod_1.z.number(), cow_num: zod_1.z.number(), image: zod_1.z.string() }))
        .mutation(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const { cow_num, stage, image } = input;
        console.log(input);
        const data = yield (0, dall_1.moveStageDB)(stage, cow_num, image);
        return data;
    })),
    getCowData: trpc_1.publicProcedure.input(zod_1.z.number()).mutation(({ input }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log(input);
        const data = yield (0, dall_1.getCowDataFromDB)(input);
        return data;
    })),
});


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCowDataFromDB = exports.setFinalStatusInDB = exports.setTarefInDB = exports.moveStageDB = exports.getNumbersByStageFromDB = exports.getKosherNumbersFromDB = exports.getAll = exports.insertNewCow = void 0;
const tslib_1 = __webpack_require__(1);
// import { handleImageUpload, uploadImage } from '../configuretion/imgbb';
const metods_1 = __webpack_require__(7);
const sequelizeSchima_1 = __webpack_require__(8);
const uuid_1 = __webpack_require__(9);
const insertNewCow = (status, cawNum) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingCow = yield sequelizeSchima_1.Cow.findOne({
            where: {
                cow_num: cawNum,
                enter_date: new Date(),
            },
        });
        if (existingCow) {
            return {
                res_status: 400,
                massege: `cow ${cawNum} already exist`,
            };
        }
        else {
            yield sequelizeSchima_1.Cow.sync();
            let stage = 0;
            const corent_time = new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            if (status === 't') {
                yield incrementValue(`t1`);
            }
            status === 'k' || status === 'kPlus' ? (stage = 2) : (stage = -1);
            const newCow = yield sequelizeSchima_1.Cow.create({
                cow_id: (0, uuid_1.v4)(),
                enter_date: new Date(),
                enter_time: corent_time,
                cow_num: cawNum,
                status: status,
                stage: stage,
            }, {
                fields: [
                    'cow_id',
                    'enter_date',
                    'enter_time',
                    'cow_num',
                    'status',
                    'stage',
                ],
            });
            if (newCow) {
                return {
                    res_status: 200,
                    massege: `cow ${cawNum} updated in the system`,
                };
            }
        }
    }
    catch (error) {
        console.error('Error creating cow:', error);
    }
});
exports.insertNewCow = insertNewCow;
const getAll = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield sequelizeSchima_1.Cow.findAll();
        return data;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAll = getAll;
const getKosherNumbersFromDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield sequelizeSchima_1.Cow.findAll({
            where: {
                status: 'k',
            },
        });
        return data;
    }
    catch (err) {
        console.log(err);
    }
});
exports.getKosherNumbersFromDB = getKosherNumbersFromDB;
const getNumbersByStageFromDB = (stage) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield sequelizeSchima_1.Cow.findAll({
            where: {
                stage: stage,
                enter_date: (0, metods_1.date)(),
            },
        });
        return data.map((cow) => cow.dataValues.cow_num);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getNumbersByStageFromDB = getNumbersByStageFromDB;
const moveStageDB = (stage, cow_num, image) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const b = image;
        console.log(b);
        yield sequelizeSchima_1.Cow.update({ stage: stage, rea_img: image }, {
            where: {
                cow_num: cow_num,
                enter_date: (0, metods_1.date)(),
            },
        });
    }
    catch (error) {
        console.error('Error updating stage:', error);
    }
});
exports.moveStageDB = moveStageDB;
const setTarefInDB = (stage, cow_num_for_update) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createNewDay();
        const updatedStage = yield incrementValue(`t${stage}`);
        yield sequelizeSchima_1.Cow.update({ status: 't', stage: -stage }, {
            where: {
                cow_num: cow_num_for_update,
            },
        });
        return updatedStage;
    }
    catch (error) {
        console.error('Error updating stage:', error);
    }
});
exports.setTarefInDB = setTarefInDB;
const setFinalStatusInDB = (status, cow_num) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStage = yield incrementValue(`${status}_sum`);
        yield sequelizeSchima_1.Cow.update({ status: status, stage: 4 }, {
            where: {
                cow_num: cow_num,
                enter_date: (0, metods_1.date)(),
            },
        });
        return updatedStage;
    }
    catch (error) {
        console.error('Error updating stage:', error);
    }
});
exports.setFinalStatusInDB = setFinalStatusInDB;
const incrementValue = (columnName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRows = yield sequelizeSchima_1.DaySum.increment({ [columnName]: 1 }, { where: { date: (0, metods_1.date)() } });
        return updatedRows;
    }
    catch (error) {
        console.error('Error updating value:', error);
    }
});
const createNewDay = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const currentDate = (0, metods_1.date)();
    const day = yield sequelizeSchima_1.DaySum.findOne({
        where: { date: currentDate },
    });
    if (day)
        return;
    else {
        const newDay = yield sequelizeSchima_1.DaySum.create({
            date: currentDate,
            k_sum: 0,
            kPlus_sum: 0,
            t1: 0,
            t2: 0,
            t3: 0,
        });
        return newDay.dataValues;
    }
});
const getCowDataFromDB = (cow_num) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield sequelizeSchima_1.Cow.findOne({
            where: { cow_num: cow_num, enter_date: (0, metods_1.date)() },
        });
        return { img: data.dataValues.rea_img, status: data.dataValues.status };
    }
    catch (err) {
        console.log(err);
    }
});
exports.getCowDataFromDB = getCowDataFromDB;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDay = exports.date = void 0;
const tslib_1 = __webpack_require__(1);
const sequelizeSchima_1 = __webpack_require__(8);
const date = () => {
    const thisDate = new Date();
    const year = thisDate.getFullYear();
    const month = String(thisDate.getMonth() + 1).padStart(2, '0'); // הוספת 0 במקרה של חודש בודד
    const day = String(thisDate.getDate()).padStart(2, '0'); // הוספת 0 במקרה של יום בודד
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
};
exports.date = date;
const createDay = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield sequelizeSchima_1.DaySum.sync();
    yield sequelizeSchima_1.DaySum.create({
        date: (0, exports.date)(),
        k_sum: 0,
        kPlus_sum: 0,
        t1: 0,
        t2: 0,
        t3: 0
    }, {
        fields: ['date', 'k_sum', 'kPlus_sum', 't1', 't2', 't3']
    });
});
exports.createDay = createDay;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Name = exports.createTable = exports.Cow = exports.DaySum = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(4);
const postgresql_1 = __webpack_require__(3);
// import { CowAttributes } from '../typs';
// interface CowInstance extends Model<CowAttributes>, CowAttributes {}
exports.DaySum = postgresql_1.sequelize.define('day_sum', {
    date: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    k_sum: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    kPlus_sum: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    t1: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    t2: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    t3: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
});
exports.Cow = postgresql_1.sequelize.define('cow', {
    cow_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    enter_date: {
        type: sequelize_1.DataTypes.DATEONLY,
    },
    enter_time: {
        type: sequelize_1.DataTypes.STRING,
    },
    cow_num: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    stage: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    rea_img: {
        type: sequelize_1.DataTypes.TEXT,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
});
const createTable = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.DaySum.sync();
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTable = createTable;
exports.Name = postgresql_1.sequelize.define('Name', {
    name_name: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    age: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
});


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publicProcedure = exports.router = exports.t = void 0;
const server_1 = __webpack_require__(11);
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
exports.t = server_1.initTRPC.create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
exports.router = exports.t.router;
exports.publicProcedure = exports.t.procedure;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@trpc/server");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("zod");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const standalone_1 = __webpack_require__(2);
const postgresql_1 = __webpack_require__(3);
const router_1 = __webpack_require__(5);
const cors_1 = tslib_1.__importDefault(__webpack_require__(13));
const dotenv_1 = tslib_1.__importDefault(__webpack_require__(14));
// import { createTable } from './configuretion/sequelizeSchima';
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const server = (0, standalone_1.createHTTPServer)({
    router: router_1.appRouter,
    middleware: (0, cors_1.default)()
});
const start = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, postgresql_1.sequelizeConnection)();
    server.listen(PORT);
    console.log(PORT);
});
start();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
