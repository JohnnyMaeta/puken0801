function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('都道府県＆県庁所在地 神経衰弱')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}
