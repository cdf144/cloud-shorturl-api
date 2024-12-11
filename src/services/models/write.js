class WriteModel {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async createShortenedUrl(code, url) {
    return this.#prisma.url.create({
      data: {
        shortCode: code,
        original: url,
      },
    });
  }
}

module.exports = WriteModel;
