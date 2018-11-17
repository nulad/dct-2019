'use strict';

const Promise = require('bluebird');
const json2csv = require('json2csv').parse;
const xhr = require('./xhr');

exports.list = async (id) => {
    const dctList = await xhr.getDCTList(id);
    return Promise.map(
        dctList,
        dct => xhr.getDetail(dct),
        {
            concurrency: 2
        }
    );
};

exports.toCsv = async (id) => {
    const result = await this.list(id);
    return json2csv(result, {
        fields: [
            {
                label: 'Partai',
                value: 'partai'
            },
            {
                label: 'Urutan',
                value: 'nomor_urut'
            },
            {
                label: 'Nama',
                value: 'nama'
            },
            {
                label: 'Usia',
                value: 'usia'
            },
            {
                label: 'Pendidikan',
                value: 'pendidikan'
            },
            {
                label: 'Motivasi',
                value: 'motivasi'
            },
            {
                label: 'Target',
                value: 'target'
            }
        ]
    });
};

module.exports = exports;
