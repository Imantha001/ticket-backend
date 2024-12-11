const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", function (error) {
  console.error(error);
});

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("end", function () {
  console.log("Redis client disconnected");
});

const waitForConnection = () => {
  return new Promise((resolve, reject) => {
    if (client.connected) {
      return resolve();
    }
    client.once("connect", resolve);
    client.once("error", reject);
  });
};

const ensureConnected = async () => {
  if (!client.connected) {
    await waitForConnection();
  }
};

const setJWT = async (key, value) => {
  await ensureConnected();
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};


const getJWT = async (key) => {
  await waitForConnection();
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};


const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};



module.exports = { setJWT, getJWT,  deleteJWT,
};