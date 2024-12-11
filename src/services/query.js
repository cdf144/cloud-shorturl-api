const ReadModel = require('./models/read');

class QueryService {
  #readModel;

  constructor(prisma) {
    this.#readModel = new ReadModel(prisma);
  }

  async findOneByCode(code) {
    try {
      const record = await this.#readModel.findUrlByCode(code);
      if (record) {
        return record.original;
      }
      return null;
    } catch (err) {
      console.error('Error finding original URL:', err);
      return null;
    }
  }

  async findAll() {
    try {
      const records = await this.#readModel.findAllUrls();
      return records;
    } catch (err) {
      console.error('Error getting all URLs:', err);
      throw err;
    }
  }
}

module.exports = QueryService;
