'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');
const constants = require('./constants');

function parseDetail($, dct) {
    const content = $('#profil').find('.col-sm-9');

    let result = {
        partai: dct.namaPartai,
        nomor_urut: dct.noUrut,
        nama: dct.nama
    };
    if (content.length === 0) {
        result = Object.assign(result, {
            usia: null,
            pendidikan: null,
            motivasi: null,
            target: null
        });
    } else {
        result = Object.assign(result, {
            usia: moment().diff(moment(content[6].children[0].data, 'DD-MM-YYYY'), 'years'),
            pendidikan: content[13].children[0].data,
            motivasi: content[16].children[0].data,
            target: content[17].children[0].data
        });
    }
    return result;
}

exports.getDetail = async (dct) => {
    const options = {
        uri: constants.DETAIL_URL + dct.id,
        rejectUnauthorized: false,
        transform: body => cheerio.load(body)
    };
    const $ = await request(options);
    return parseDetail($, dct);
};

exports.getDCTList = async (id) => {
    const options = {
        uri: constants.getDctUrl(id),
        rejectUnauthorized: false,
        json: true
    };
    return request(options);
};

module.exports = exports;
