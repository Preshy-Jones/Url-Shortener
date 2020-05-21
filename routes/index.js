const express = require('express')
const router = express.Router();

const Url = require('../models/Url')

router.get('/shorten', (req, res) => {
    res.render('shortener')
})
//handling requests 
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            return res.redirect(url.address);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('server error');
    }
});

module.exports = router;

