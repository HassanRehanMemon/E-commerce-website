'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const db_1 = __importDefault(require('./config/db'))
const products_1 = __importDefault(require('./data/products'))
const users_1 = __importDefault(require('./data/users'))
const productModel_1 = __importDefault(require('./models/productModel'))
const userModel_1 = __importDefault(require('./models/userModel'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config();
(0, db_1.default)()
const importData = () => __awaiter(void 0, void 0, void 0, function * () {
  try {
    yield productModel_1.default.deleteMany()
    yield userModel_1.default.deleteMany()
    const insertedUsers = yield userModel_1.default.insertMany(users_1.default)
    const admin = insertedUsers[0]._id
    const sampleProducts = products_1.default.map((product) => {
      return Object.assign(Object.assign({}, product), { user: admin })
    })
    const uploaded = yield productModel_1.default.insertMany(sampleProducts)
    console.log('Data inserted succefully')
    process.exit()
  } catch (error) {
    console.log(`data couldn't be inserted ${error}`)
    process.exit(1)
  }
})
const deleteData = () => __awaiter(void 0, void 0, void 0, function * () {
  try {
    yield userModel_1.default.deleteMany()
    yield productModel_1.default.deleteMany()
    console.log('Data delete SUCCESSFULLY ')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})
if (process.argv[2] == '-d') {
  deleteData()
} else {
  importData()
}
