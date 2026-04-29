module.exports = new Proxy({}, { get: (_, prop) => String(prop) })
