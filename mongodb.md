```
[
  {
    "_id" : new ObjectId("5cd96d3ed5d3e20029627d4a"),
    email: "johndoe@test.com",
    first_name: "John",
    last_name: "Doe",
    roles: ["user"],
    last_connection_date: new Date("2023-10-21T22:40:33.834Z"),
    addresses: [{
      zip: 75000,
      city: "Paris"
    },
    {
      zip: 75001,
      city: "Paris"
    },
    {
      zip: 75002,
      city: "Paris 2"
    }]
  },
  {
    email: "harrydoe@test.com",
    first_name: "Harry",
    last_name: "Doe",
    roles: ["user"],
    last_connection_date: new Date("2023-10-21T22:40:33.834Z"),
    addresses: []
  },
  {
    email: "admin@test.com",
    first_name: "Mr.",
    last_name: "Admin",
    roles: ["user", "admin"],
    last_connection_date: new Date("2023-10-21T22:40:33.834Z"),
    addresses: []
  }
]
```

# 1. MongoDb request

```
db.getCollection("users").find({
    email: "test@test.com",
    $or: [
        { first_name: /^John/ },
        { last_name: /^John/ }
    ],
    last_connection_date: { $gt: new Date("2023-04-21") }
})
```

# 2. MongoDb aggregate

```
db.getCollection("users").aggregate(
    { $unwind: "$roles" },
    {
        $group : {
            _id : "$roles",
            users: { $push: "$$ROOT" }
        }
    }
)
```

# 3. MongoDb update

## 3.1

```
db.getCollection("users").updateOne(
    { _id: ObjectId("5cd96d3ed5d3e20029627d4a") },
    {
        $currentDate: {
            last_connection_date: true
        }
    }
)
```

## 3.2

```3
db.getCollection("users").updateOne(
    { _id: ObjectId("5cd96d3ed5d3e20029627d4a") },
    {
        $addToSet: { roles: "another_role" }
    }
)
```

## 3.3

```
db.getCollection("users").updateOne(
    { _id: ObjectId("5cd96d3ed5d3e20029627d4a") },
    {
        $set: {
            "addresses.$[x].city": "Paris 1"
        }
    },
    {
        arrayFilters: [
            { "x.zip": 75001 }
        ]
    }
)
```