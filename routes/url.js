const express = require('express')
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config')
const shortid = require('shortid');
const Url = require('../models/Url')
const customid = require('custom-id')

router.post('/shorten', async (req, res) => {
    const { address } = req.body;
    const baseUrl = config.get('baseUrl');
    //check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('invalid base url')
    }
    //create url code
    //    const urlCode = shortid.generate();
    const urlCode = customid({
        randomLength: 1
    });

    //check long url
    if (validUrl.isUri(address)) {
        try {
            let url = await Url.findOne({ address })
            if (url) {
                res.json({
                    address: url.address,
                    shortened: url.shortened
                });
            } else {
                const shortened = baseUrl + '/' + urlCode;
                url = new Url({
                    address,
                    shortened,
                    urlCode
                });
                await url.save();
                res.json({
                    address: url.address,
                    shortened: url.shortened
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url')
    }

});

module.exports = router;

