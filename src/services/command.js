const ReadModel = require('./models/read');
const WriteModel = require('./models/write');

class CommandService {
  #writeModel;
  #readModel;

  constructor(prisma) {
    this.#writeModel = new WriteModel(prisma);
    this.#readModel = new ReadModel(prisma);
  }

  async shortUrl(url) {
    const record = await this.#readModel.findUrlByUrl(url);
    if (record) {
      return record.shortCode;
    }

    const newCode = await this.#makeCode(5);
    await this.#writeModel.createShortenedUrl(newCode, url);
    return newCode;
  }

  async #makeCode(length) {
    while (true) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;

      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }

      if ((await this.#readModel.findUrlByCode(result)) == null) {
        return result;
      }
    }
  }
}

module.exports = CommandService;
