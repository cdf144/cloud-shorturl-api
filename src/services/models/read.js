class ReadModel {
  #prisma;

  constructor(prisma) {
    this.#prisma = prisma;
  }

  async findUrlByCode(code) {
    return this.#prisma.url.findUnique({ where: { shortCode: code } });
  }

  async findUrlByUrl(url) {
    return this.#prisma.url.findFirst({ where: { original: url } });
  }

  async findAllUrls() {
    return this.#prisma.url.findMany();
  }
}

module.exports = ReadModel;
