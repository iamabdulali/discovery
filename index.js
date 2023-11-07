// // const express = require("express");
// // const AWS = require("aws-sdk");
// // const app = express();
// // const cors = require("cors");

// // app.use(
// //   cors({
// //     origin: "*",
// //   })
// // );

// // AWS.config.update({
// //   region: "us-east-1",
// //   accessKeyId: "AKIAU4I5WVEMMTC4RH5C",
// //   secretAccessKey: "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",
// // });

// // const docClient = new AWS.DynamoDB.DocumentClient();

// // function createExpression(
// //   filter,
// //   attributeName,
// //   filterExpressions,
// //   expressionAttributeValues
// // ) {
// //   if (filter.length > 1) {
// //     const filterExpression = filter
// //       .map((filterValue, index) => {
// //         const placeholder = `:${attributeName}${index}`;
// //         expressionAttributeValues[placeholder] = filterValue;
// //         return `contains(#DYNOBASE_${attributeName}, ${placeholder})`;
// //       })
// //       .join(" OR ");
// //     console.log(filterExpression);
// //     filterExpressions.push(`(${filterExpression})`);
// //   } else if (JSON.stringify(filter) !== JSON.stringify([undefined])) {
// //     filterExpressions.push(
// //       `contains(#DYNOBASE_${attributeName}, :${attributeName}0)`
// //     );
// //     expressionAttributeValues[`:${attributeName}0`] = filter[0];
// //   }
// // }

// // // Define an API endpoint to get filtered images
// // app.get("/getImages", (req, res) => {
// //   const storeFilters = Array.isArray(req.query.store)
// //     ? req.query.store
// //     : [req.query.store];
// //   const categoryFilters = Array.isArray(req.query.category)
// //     ? req.query.category
// //     : [req.query.category];
// //   const locationFilters = Array.isArray(req.query.location)
// //     ? req.query.location
// //     : [req.query.location];
// //   const companyFilters = Array.isArray(req.query.company)
// //     ? req.query.company
// //     : [req.query.company];

// //   const startDateFilter = req.query.startDate;
// //   const endDateFilter = req.query.endDate;

// //   // Create ExpressionAttributeValues
// //   const expressionAttributeValues = {
// //     ":startDate": startDateFilter,
// //     ":endDate": endDateFilter,
// //   };

// //   const expressionAttributeNames = {}; // Create an empty object

// //   // Build the filter expressions for store, category, location, and company
// //   const filterExpressions = [];

// //   // Conditionally add attribute mappings
// //   if (JSON.stringify(storeFilters) !== JSON.stringify([undefined])) {
// //     createExpression(
// //       storeFilters,
// //       "store",
// //       filterExpressions,
// //       expressionAttributeValues
// //     );
// //     expressionAttributeNames["#DYNOBASE_store"] = "store";
// //   }
// //   if (JSON.stringify(categoryFilters) !== JSON.stringify([undefined])) {
// //     createExpression(
// //       categoryFilters,
// //       "category",
// //       filterExpressions,
// //       expressionAttributeValues
// //     );
// //     expressionAttributeNames["#DYNOBASE_category"] = "category";
// //   }
// //   if (JSON.stringify(companyFilters) !== JSON.stringify([undefined])) {
// //     createExpression(
// //       companyFilters,
// //       "company",
// //       filterExpressions,
// //       expressionAttributeValues
// //     );
// //     expressionAttributeNames["#DYNOBASE_company"] = "company";
// //   }
// //   if (JSON.stringify(locationFilters) !== JSON.stringify([undefined])) {
// //     createExpression(
// //       locationFilters,
// //       "location",
// //       filterExpressions,
// //       expressionAttributeValues
// //     );
// //     expressionAttributeNames["#DYNOBASE_location"] = "location";
// //   }

// //   if (startDateFilter) {
// //     expressionAttributeNames["#DYNOBASE_startDate"] = "startDate";
// //   }
// //   if (endDateFilter) {
// //     expressionAttributeNames["#DYNOBASE_endDate"] = "endDate";
// //   }

// //   const params2 = {
// //     TableName: "MyTable",
// //   };

// //   // If No filters are selected, Show All Items

// //   if (
// //     JSON.stringify(storeFilters) === JSON.stringify([undefined]) &&
// //     JSON.stringify(categoryFilters) === JSON.stringify([undefined]) &&
// //     JSON.stringify(locationFilters) === JSON.stringify([undefined]) &&
// //     JSON.stringify(companyFilters) === JSON.stringify([undefined])
// //   ) {
// //     // Use the DynamoDB scan operation to filter images
// //     docClient.scan(params2, (err, data) => {
// //       if (err) {
// //         console.error("Error:", err);
// //         res.status(500).send("Internal Server Error");
// //       } else {
// //         console.log(data.Items);
// //         res.json(data.Items);
// //       }
// //     });
// //   }

// //   // Combine filter expressions with AND
// //   const filterExpression = filterExpressions.join(" AND ");

// //   // Define the DynamoDB query parameters
// //   const params = {
// //     TableName: "MyTable",
// //     FilterExpression: `${filterExpression} AND #DYNOBASE_startDate >= :startDate AND #DYNOBASE_endDate <= :endDate`,
// //     ExpressionAttributeValues: expressionAttributeValues,
// //   };

// //   params.ExpressionAttributeNames = expressionAttributeNames;

// //   console.log(params.ExpressionAttributeNames);
// //   console.log(params.FilterExpression);

// //   if (
// //     JSON.stringify(storeFilters) !== JSON.stringify([undefined]) ||
// //     JSON.stringify(categoryFilters) !== JSON.stringify([undefined]) ||
// //     JSON.stringify(companyFilters) !== JSON.stringify([undefined]) ||
// //     JSON.stringify(locationFilters) !== JSON.stringify([undefined])
// //   ) {
// //     docClient.scan(params, (err, data) => {
// //       if (err) {
// //         console.error("Error:", err);
// //         res.status(500).send("Internal Server Error");
// //       } else {
// //         console.log(data.Items);
// //         res.json(data.Items);
// //       }
// //     });
// //   }
// // });

// // // Start the Express app
// // app.listen(3000, () => {
// //   console.log("Server is running on port 3000");
// // });







const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAU4I5WVEMMTC4RH5C",
  secretAccessKey: "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",
});

const docClient = new AWS.DynamoDB.DocumentClient();



function createExpression(
  filter,
  attributeName,
  filterExpressions,
  expressionAttributeValues
) {
  if (attributeName === 'datetime' && filter.length === 2) {
    // Handle date range filtering
    const startDatetime = filter[0];
    const endDatetime = filter[1];
    const startPlaceholder = `:${attributeName}Start`;
    const endPlaceholder = `:${attributeName}End`;

    expressionAttributeValues[startPlaceholder] = startDatetime;
    expressionAttributeValues[endPlaceholder] = endDatetime;

    filterExpressions.push(
      `#DYNOBASE_${attributeName} BETWEEN ${startPlaceholder} AND ${endPlaceholder}`
    );
  } else if (filter.length > 1) {
    // Handle other array-based filters
    const filterExpression = filter
      .map((filterValue, index) => {
        const placeholder = `:${attributeName}${index}`;
        expressionAttributeValues[placeholder] = filterValue;
        return `contains(#DYNOBASE_${attributeName}, ${placeholder})`;
      })
      .join(" OR ");
    filterExpressions.push(`(${filterExpression})`);
  } else if (JSON.stringify(filter) !== JSON.stringify([undefined])) {
    filterExpressions.push(
      `contains(#DYNOBASE_${attributeName}, :${attributeName}0)`
    );
    expressionAttributeValues[`:${attributeName}0`] = filter[0];
  }
}

app.get("/getImages", (req, res) => {
  const storeFilters = Array.isArray(req.query.store)
    ? req.query.store
    : [req.query.store];
  const categoryFilters = Array.isArray(req.query.category)
    ? req.query.category
    : [req.query.category];
  const locationFilters = Array.isArray(req.query.location)
    ? req.query.location
    : [req.query.location];
  const companyFilters = Array.isArray(req.query.company)
    ? req.query.company
    : [req.query.company];

  const startDatetime = req.query.startDatetime;
  const endDatetime = req.query.endDatetime;

  // Create ExpressionAttributeValues
  const expressionAttributeValues = {};

  const expressionAttributeNames = {};

  const filterExpressions = [];

  if (JSON.stringify(storeFilters) !== JSON.stringify([undefined])) {
    createExpression(
      storeFilters,
      "store",
      filterExpressions,
      expressionAttributeValues
    );
    expressionAttributeNames["#DYNOBASE_store"] = "store";
  }
  if (JSON.stringify(categoryFilters) !== JSON.stringify([undefined])) {
    createExpression(
      categoryFilters,
      "category",
      filterExpressions,
      expressionAttributeValues
    );
    expressionAttributeNames["#DYNOBASE_category"] = "category";
  }
  if (JSON.stringify(companyFilters) !== JSON.stringify([undefined])) {
    createExpression(
      companyFilters,
      "company",
      filterExpressions,
      expressionAttributeValues
    );
    expressionAttributeNames["#DYNOBASE_company"] = "company";
  }
  if (JSON.stringify(locationFilters) !== JSON.stringify([undefined])) {
    createExpression(
      locationFilters,
      "location",
      filterExpressions,
      expressionAttributeValues
    );
    expressionAttributeNames["#DYNOBASE_location"] = "location";
  }

  if (startDatetime && endDatetime) {
    const dateFilter = [startDatetime, endDatetime];
    createExpression(
      dateFilter,
      "datetime",
      filterExpressions,
      expressionAttributeValues
    );
    expressionAttributeNames["#DYNOBASE_datetime"] = "datetime";
  }

  const params2 = {
    TableName: "ImageStorage",
  };

  if (
    JSON.stringify(storeFilters) === JSON.stringify([undefined]) &&
    JSON.stringify(categoryFilters) === JSON.stringify([undefined]) &&
    JSON.stringify(locationFilters) === JSON.stringify([undefined]) &&
    JSON.stringify(companyFilters) === JSON.stringify([undefined]) &&
    !(startDatetime && endDatetime)
  ) {
    docClient.scan(params2, (err, data) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(data.Items);
        res.json(data.Items);
      }
    });
  }

  const filterExpression = filterExpressions.join(" AND ");

  const params = {
    TableName: "ImageStorage",
    FilterExpression: filterExpression,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  params.ExpressionAttributeNames = expressionAttributeNames;

  if (
    JSON.stringify(storeFilters) !== JSON.stringify([undefined]) ||
    JSON.stringify(categoryFilters) !== JSON.stringify([undefined]) ||
    JSON.stringify(companyFilters) !== JSON.stringify([undefined]) ||
    JSON.stringify(locationFilters) !== JSON.stringify([undefined]) ||
    (startDatetime && endDatetime)
  ) {
    docClient.scan(params, (err, data) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(data.Items);
        res.json(data.Items);
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();

// // Enable CORS for all routes
// app.use(cors({
//   origin: "*"
// }));

// app.use(express.json())

// // Define the URL of the login form
// const loginFormUrl = 'http://localhost:3000/login';

// // Define the user credentials
// const username = 'your_username';
// const password = 'your_password';

// // Create a data object with the login credentials
// const loginData = {
//   username: username,
//   password: password,
// };

// app.get('/', (req, res) =>{
//   res.send("HELO")
// })

// // Create a route for handling the login request
// app.post('/login', (req, res) => {
//   // Make a POST request to the login form
//   const {email, password} = req.body
//   console.log(email, password)
//   res.json({
//     success: true,
//     email,
//     password
//   })
 
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
