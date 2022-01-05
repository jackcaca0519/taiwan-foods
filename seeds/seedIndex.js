const mongoose = require('mongoose');
const restaurant = require('../model/restaurant');

mongoose.connect('mongodb://localhost:27017/recommended-restaurant', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db connected');
})


const seedDB = async () => {
    await restaurant.deleteMany({});
    for (let i = 0; i < 3; i++) {
        await restaurant.insertMany([
            {
                title: '食歐姆',
                avgPrice: 200,
                description: '超好吃的歐姆蛋炒飯，可以自己劃開歐姆蛋，很療癒！',
                location: '702台南市南區大同路二段136巷6號',
                images: [{
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1640097780/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/nlusn42d4jcehxwwmxgv.webp",
                    "filename": "台灣美食地圖/lugeekhhs3msrakzb4tm"
                },
                {
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665271/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/llsvjfzp9xww1whybvdb.jpg",
                    "filename": "台灣美食地圖/llsvjfzp9xww1whybvdb"
                }],
                author: '61af8142950130467aefe0bf',
                geometry: {
                    "type": "Point",
                    "coordinates": []
                }
            }, {
                title: '這一鍋',
                avgPrice: 300,
                description: '好吃的火鍋，神仙肉片讚！！',
                location: '700台南市中西區西門路一段658之1號B1',
                images: [{
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665246/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/lugeekhhs3msrakzb4tm.jpg",
                    "filename": "台灣美食地圖/lugeekhhs3msrakzb4tm"
                },
                {
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665271/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/llsvjfzp9xww1whybvdb.jpg",
                    "filename": "台灣美食地圖/llsvjfzp9xww1whybvdb"
                }],
                author: '61af8142950130467aefe0bf',
                geometry: {
                    "type": "Point",
                    "coordinates": [-random100, random50]
                }
            }, {
                title: '秘密義大利麵',
                avgPrice: 250,
                description: '義大利肉醬麵的肉醬很香～',
                location: '701台南市東區裕學路25號',
                images: [{
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665246/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/lugeekhhs3msrakzb4tm.jpg",
                    "filename": "台灣美食地圖/lugeekhhs3msrakzb4tm"
                },
                {
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665271/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/llsvjfzp9xww1whybvdb.jpg",
                    "filename": "台灣美食地圖/llsvjfzp9xww1whybvdb"
                }],
                author: '61af8142950130467aefe0bf',
                geometry: {
                    "type": "Point",
                    "coordinates": [-random100, random50]
                }
            }, {
                title: '在島之後After Island. 餐酒館',
                avgPrice: 400,
                description: '調酒是無菜單調酒，很有特色',
                location: '701台南市東區東寧路201巷121號',
                images: [{
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665246/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/lugeekhhs3msrakzb4tm.jpg",
                    "filename": "台灣美食地圖/lugeekhhs3msrakzb4tm"
                },
                {
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665271/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/llsvjfzp9xww1whybvdb.jpg",
                    "filename": "台灣美食地圖/llsvjfzp9xww1whybvdb"
                }],
                author: '61af8142950130467aefe0bf',
                geometry: {
                    "type": "Point",
                    "coordinates": [-random100, random50]
                }
            }, {
                title: '魔法咪嚕',
                avgPrice: 150,
                description: '有很多可愛的寵物，適合待一整個下午xd',
                location: '710台南市永康區二王路73號',
                images: [{
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665246/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/lugeekhhs3msrakzb4tm.jpg",
                    "filename": "台灣美食地圖/lugeekhhs3msrakzb4tm"
                },
                {
                    "url": "https://res.cloudinary.com/dhcn70fsm/image/upload/v1639665271/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E5%9C%B0%E5%9C%96/llsvjfzp9xww1whybvdb.jpg",
                    "filename": "台灣美食地圖/llsvjfzp9xww1whybvdb"
                }],
                author: '61af8142950130467aefe0bf',
                geometry: {
                    "type": "Point",
                    "coordinates": [-random100, random50]
                }
            },
        ]);
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});