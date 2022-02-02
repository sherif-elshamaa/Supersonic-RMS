const Subscriber = require('../schema/Subscriber')

async function findById(id) {
    // this function take _id as an argument
    // this function find one persons matching the name on people collection
    // then update
    try {
        const subscriber = await Subscriber.findById(id);
        console.log(subscriber);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = findById;