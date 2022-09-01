import Mongo from 'mongodb';
import config from '../helpers/config.js';

export default {

    findOne: async (collection, query) => {
        let client = await Mongo.MongoClient.connect(config.MDB_URL);
        let db = client.db('mydb');
        try {
            return await db.collection(collection).findOne(query);
        } finally {
            client.close();
        }
    },

    insertOne : async (collection, item) => {
        let client = await Mongo.MongoClient.connect(config.MDB_URL);
        let db = client.db('mydb');
        try {
            return await db.collection(collection).insertOne(item);
        } finally {
            client.close();
        }
    },

    deleteOne : async (collection, query) => {
        let client = await Mongo.MongoClient.connect(config.MDB_URL);
        let db = client.db('mydb');
        try {
            return await db.collection(collection).deleteOne(query);
        } finally {
            client.close();
        }
    },
    
    updateOne : async (collection, filter, item) => {
        let client = await Mongo.MongoClient.connect(config.MDB_URL);
        let db = client.db('mydb');
        try {
            return await db.collection(collection).updateOne(filter,item);
        } finally {
            client.close();
        }
    },

    find: async (collection, query) => {
        let client = await Mongo.MongoClient.connect(config.MDB_URL);
        let db = client.db('mydb');
        try {
            return await db.collection(collection).find(query).toArray();
        } finally {
            client.close();
        }
    },
}