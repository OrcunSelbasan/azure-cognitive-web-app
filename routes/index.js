var express = require("express");
var axios = require("axios").default;
const { v4: uuidv4 } = require("uuid");
var router = express.Router();
var Translations = require("../db/index");

let translatorKey =
  process.env.TRANSLATOR_API_KEY ||
  process.env.CUSTOMCONNSTR_TRANSLATOR_API_KEY;
let translatorEndpoint = "https://api.cognitive.microsofttranslator.com";
let location = "eastus";

/* GET home page. */
router.get("/", async function (req, res, next) {
  const translations = await Translations.find({})
    .toArray()
    .then((res) => res);
  res.render("index", {
    title: "Translator",
    translations,
    translationBody: "",
  }); // { title: 'Express', addresses }
});

router.post("/", async function (req, res, next) {
  try {
    // Translate
    let formData = await axios({
      baseURL: translatorEndpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": translatorKey,
        "Ocp-Apim-Subscription-Region": location,
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: "tr",
        to: [req.body.to],
      },
      data: [
        {
          text: req.body.text,
        },
      ],
      responseType: "json",
    });

    // Insert To Database
    await Translations.insertOne({
      uid: uuidv4().toString(),
      text: req.body.text,
      to: req.body.to,
    });

    // Retrieve Updated Database
    const translations = await Translations.find({})
      .toArray()
      .then((res) => res);
    
    res.status(200).render("index", {
      title: "Translator",
      translations,
      translationBody: "[Translated]" + formData.data[0].translations[0].text,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
