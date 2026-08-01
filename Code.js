function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('都道府県＆県庁所在地 神経衰弱')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * プレイ記録をスプレッドシートに保存する関数
 * @param {Object} data - プレイ結果データ
 */
function savePlayRecord(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return { success: false, message: 'スプレッドシートが見つかりません。' };
    }

    var sheetName = 'プレイ記録';
    var sheet = ss.getSheetByName(sheetName);

    // シートが存在しない場合は新規作成してヘッダーを設定
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = ['日時', 'おなまえ', 'モード', 'クリアタイム', 'めくった回数', '最大連鎖', 'ランク'];
      sheet.appendRow(headers);
      
      // ヘッダーのスタイリング
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e293b')
                 .setFontColor('#f59e0b')
                 .setFontWeight('bold')
                 .setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // 日時
      sheet.setColumnWidth(2, 140); // おなまえ
      sheet.setColumnWidth(3, 130); // モード
      sheet.setColumnWidth(4, 110); // クリアタイム
    }

    var timestamp = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    var row = [
      timestamp,
      data.nickname || 'ななしさん',
      data.modeLabel || '',
      data.clearTime || '',
      data.moves ? data.moves + '回' : '0回',
      data.maxCombo ? data.maxCombo + '連鎖' : '0連鎖',
      data.rank || ''
    ];

    sheet.appendRow(row);
    
    // 直前に追加した行の配置を中央揃え
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, headers.length).setHorizontalAlignment('center');

    return { success: true };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}
