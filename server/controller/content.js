const axios = require("axios");
const md5 = require("blueimp-md5");
const privateKey = process.env.privateKey;
const publicKey = process.env.publicKey;

class Controller {
  static async getCharacters(req, res, next) {
    try {
      let { search, limit, page } = req.query;

      let name = search ? search : null;
      let limitCharacters = limit ? limit : null;
      let offset = page ? page * 20 : null;

      const timeStamp = Date.now();
      let { data } = await axios({
        method: "get",
        url: "https://gateway.marvel.com/v1/public/characters",
        params: {
          apikey: publicKey,
          ts: timeStamp,
          hash: md5(timeStamp + privateKey + publicKey),
          nameStartsWith: name,
          limit: limitCharacters,
          offset: offset,
        },
      });

      let characters = data.data.results.map((el) => {
        return {
          id: el.id,
          name: el.name,
          thumbnail: el.thumbnail,
          urls: el.urls,
        };
      });

      data = {
        copyright: data.copyright,
        attributionText: data.attributionText,
        attributionHTML: data.attributionHTML,
        data: {
          offset: data.data.offset,
          limit: data.data.limit,
          total: data.data.total,
          count: data.data.count,
          characters,
        },
      };
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async getComics(req, res, next) {
    try {
      let { search, limit, page } = req.query;

      let title = search ? search : null;
      let limitComics = limit ? limit : null;
      let offset = page ? page * 20 : null;

      const timeStamp = Date.now();
      let { data } = await axios({
        method: "get",
        url: "https://gateway.marvel.com/v1/public/comics",
        params: {
          apikey: publicKey,
          ts: timeStamp,
          hash: md5(timeStamp + privateKey + publicKey),
          titleStartsWith: title,
          limit: limitComics,
          offset: offset,
        },
      });

      let comics = data.data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          thumbnail: el.thumbnail,
          urls: el.urls,
        };
      });

      data = {
        copyright: data.copyright,
        attributionText: data.attributionText,
        attributionHTML: data.attributionHTML,
        data: {
          offset: data.data.offset,
          limit: data.data.limit,
          total: data.data.total,
          count: data.data.count,
          comics,
        },
      };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getSeries(req, res, next) {
    try {
      let { search, limit, page } = req.query;

      let title = search ? search : null;
      let limitSeries = limit ? limit : null;
      let offset = page ? page * 20 : null;

      const timeStamp = Date.now();
      let { data } = await axios({
        method: "get",
        url: "https://gateway.marvel.com/v1/public/series",
        params: {
          apikey: publicKey,
          ts: timeStamp,
          hash: md5(timeStamp + privateKey + publicKey),
          titleStartsWith: title,
          limit: limitSeries,
          offset: offset,
          orderBy: "startYear",
        },
      });

      let series = data.data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          thumbnail: el.thumbnail,
          urls: el.urls,
        };
      });

      data = {
        copyright: data.copyright,
        attributionText: data.attributionText,
        attributionHTML: data.attributionHTML,
        data: {
          offset: data.data.offset,
          limit: data.data.limit,
          total: data.data.total,
          count: data.data.count,
          series,
        },
      };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
