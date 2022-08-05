"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./src/router/user-router");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
app.use('', user_router_1.userRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map