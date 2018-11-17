'use strict';

exports.DETAIL_URL = 'https://infopemilu.kpu.go.id/pileg2019/pencalonan/calon/';
exports.getDctUrl = function getUrl(id) {
    const timestamp = (new Date).getTime();
    return `https://infopemilu.kpu.go.id/pileg2019/pencalonan/pengajuan-calon/${id}/calonDct.json?_=${timestamp}`;
};

module.exports = exports;
